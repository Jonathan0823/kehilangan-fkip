import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Sistem Pengaduan Barang Hilang & Fasilitas Rusak FKIP Unsika",
  description: "Sistem Pengaduan Kehilangan Barang dan Kerusakan Fasilitas FKIP Unsika",
};

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"className={`${poppins.variable}`}>
      <body><ClientWrapper>{children}</ClientWrapper></body>
    </html>
  );
}
