import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Pengaduan Kehilangan Barang dan Kerusakan Fasilitas FKIP Unsika",
  description: "Sistem Pengaduan Kehilangan Barang dan Kerusakan Fasilitas FKIP Unsika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
