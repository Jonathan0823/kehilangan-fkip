import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Sistem Pengaduan Barang Hilang & Fasilitas Rusak FKIP Unsika",
  description: "Sistem Pengaduan Kehilangan Barang dan Kerusakan Fasilitas FKIP Unsika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ClientWrapper>{children}</ClientWrapper></body>
    </html>
  );
}
