import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import React from 'react';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: '92Ciné | Cinémas des Hauts-de-Seine',
  description: 'Réseau de cinémas du département 92 (Hauts-de-Seine)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0f] text-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}