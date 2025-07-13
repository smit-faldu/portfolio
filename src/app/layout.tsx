import './globals.css';
import '../styles/background-effects.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Smit Faldu | AI/ML Engineer',
  description: 'AI/ML Engineer with hands-on experience in NLP, LLMs, and RAG pipelines',
  keywords: ['portfolio', 'AI Engineer', 'ML Engineer', 'developer', 'Smit Faldu'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-background text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}