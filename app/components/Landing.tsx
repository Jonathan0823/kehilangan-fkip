import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex justify-center items-center min-h-dvh md:bg-blue-50 bg-none">
      <div className="w-full  max-w-md p-6 bg-white rounded-lg ">
        <div className="flex justify-end"></div>
        <div className="flex justify-center mb-4">
          <Image
            width={200}
            height={200}
            src="/LandingAsset.png"
            alt="Server Illustration"
            className="h-40"
          />
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">
          Sistem Pengaduan Kehilangan Barang dan Kerusakan Fasilitas FKIP Unsika
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Halo, sobat FKIP! Sampaikan laporan Anda secara Real-time
        </p>

        <div className="space-y-4 m-5">
          <Link href="/post">
            <button className="w-full my-2 bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600">
              Lihat Beranda
            </button>
          </Link>
          <Link href="/Laporan">
            <button className="w-full bg-blue-200 text-blue-700 py-2 rounded-lg shadow hover:bg-blue-300">
              Sampaikan Laporan Anda
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
