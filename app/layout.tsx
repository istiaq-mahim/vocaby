
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vocaby - English for Bangladesh',
  description: 'AI-powered vocabulary for IELTS & Job Seekers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-slate-900 dark:text-slate-100`}>
        <div className="background-animation">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
