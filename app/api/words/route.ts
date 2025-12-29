
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { query } from '../../../lib/db';
import { generateWordsAction } from '../../../lib/gemini';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;
  const { count } = await request.json();
  const today = new Date().toISOString().split('T')[0];

  try {
    // 1. Check if words already exist for today in DB
    const existing = await query(
      "SELECT words_json FROM daily_progress WHERE user_email = $1 AND date = $2",
      [email, today]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ 
        words: existing.rows[0].words_json,
        isNew: false,
        message: "Continuing today's session."
      });
    }

    // 2. Limit Enforcement: Max 10 words per day to ensure focus
    const actualCount = Math.min(count, 10);

    // 3. Generate via Gemini
    const words = await generateWordsAction(actualCount);

    // 4. Save to DB for persistence and sync
    await query(
      "INSERT INTO daily_progress (user_email, date, words_json, count) VALUES ($1, $2, $3, $4)",
      [email, today, JSON.stringify(words), actualCount]
    );

    // 5. Automatically add these to user's vocabulary table if not exists
    for (const w of words) {
        await query(
            "INSERT INTO vocabulary (user_email, word, word_data) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
            [email, w.word, JSON.stringify(w)]
        );
    }

    return NextResponse.json({ 
      words, 
      isNew: true,
      message: `Generated ${actualCount} new words for today.`
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Focus limit check failed" }, { status: 500 });
  }
}

export async function GET() {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });
    
    const res = await query(
        "SELECT word_data, srs_level, next_review FROM vocabulary WHERE user_email = $1",
        [session.user.email]
    );
    return NextResponse.json(res.rows);
}
