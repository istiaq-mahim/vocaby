
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

/**
 * SQL for initializing tables (run these in your Neon Console):
 * 
 * CREATE TABLE IF NOT EXISTS users (
 *   id SERIAL PRIMARY KEY,
 *   email TEXT UNIQUE NOT NULL,
 *   name TEXT,
 *   image TEXT
 * );
 * 
 * CREATE TABLE IF NOT EXISTS daily_progress (
 *   user_email TEXT NOT NULL,
 *   date DATE DEFAULT CURRENT_DATE,
 *   words_json JSONB,
 *   count INTEGER,
 *   PRIMARY KEY (user_email, date)
 * );
 * 
 * CREATE TABLE IF NOT EXISTS vocabulary (
 *   id SERIAL PRIMARY KEY,
 *   user_email TEXT NOT NULL,
 *   word TEXT NOT NULL,
 *   word_data JSONB NOT NULL,
 *   srs_level INTEGER DEFAULT 0,
 *   next_review DATE DEFAULT CURRENT_DATE,
 *   UNIQUE(user_email, word)
 * );
 */
