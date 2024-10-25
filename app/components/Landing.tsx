import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex justify-center overflow-hidden items-center min-h-dvh relative md:bg-blue-50 bg-none">
      <div className="w-full max-w-md bg-[#d0f0fb] rounded-lg min-h-dvh absolute lg:pt-14 pt-10 ">
        <div>
          <div className="flex justify-end"></div>
          <div className="flex justify-center mb-4">
            <Image
              width={200}
              height={200}
              src="/LandingAsset.png"
              alt="Server Illustration"
              className="h-44 w-48"
            />
          </div>

          <h1 className="text-center mx-3 text-3xl font-bold text-gray-800 mb-1 lg:mx-2 ">
            Sistem Pengaduan Kehilangan Barang dan Kerusakan Fasilitas FKIP
            Unsika
          </h1>

          <div className="text-center text-[#0a0147] text-base mb-1 mt-3 mx-10">
            <p>Halo, sobat FKIP!</p>
            <p>Sampaikan laporan Anda secara Real-time</p>
          </div>

          <div className="relative bg-white min-h-[30vh] lg:mt-9 mt-2 flex flex-col justify-start flex-1">
            <div className="relative z-10 space-y-4 px-4 m-5 font-semibold">
              <Link href="/post">
                <button className="w-full my-2 bg-[#69c3f0] text-white mb-4 py-2 rounded-lg shadow hover:bg-[#5baad1]">
                  Lihat Beranda
                </button>
              </Link>
              <Link href="/Laporan">
                <button className="w-full bg-[#69c3f0] text-white py-2 rounded-lg shadow hover:bg-[#5baad1]">
                  Sampaikan Laporan Anda
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
