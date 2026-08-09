import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Raksha | Full Stack Developer Portfolio',
  description: 'Welcome to the professional portfolio of Raksha, a Full Stack Developer specializing in building modern web applications, scalable APIs, and premium user experiences.',
  keywords: 'Raksha, Full Stack Developer, Software Engineer, Portfolio, React, Node.js, Next.js, Web Development',
  authors: [{ name: 'Raksha' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable}`} style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
