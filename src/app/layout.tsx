import type { Metadata } from 'next';
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Akshay Mahajan — Creative Developer & Software Craftsman',
  description:
    'I build digital experiences that feel as good as they work. Developer, builder, and problem solver creating thoughtful products with code, design, and curiosity.',
  keywords: [
    'Akshay Mahajan',
    'Creative Developer',
    'Full Stack Engineer',
    'Frontend Craftsman',
    'Next.js Portfolio',
    'TypeScript Engineer',
    'India Developer',
  ],
  authors: [{ name: 'Akshay Mahajan' }],
  openGraph: {
    title: 'Akshay Mahajan — Creative Developer & Software Craftsman',
    description:
      'I build digital experiences that feel as good as they work. Developer, builder, and problem solver creating thoughtful products with code, design, and curiosity.',
    url: 'https://akshaymahajan.dev',
    siteName: 'Akshay Mahajan Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshay Mahajan — Creative Developer',
    description: 'I build digital experiences that feel as good as they work.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg'],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jakartaSans.variable}`}>
      <body className="bg-paper text-charcoal antialiased selection:bg-charcoal selection:text-paper">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
