import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoPencilOutline, IoSaveOutline } from 'react-icons/io5';
import { useState } from "react";


interface ProfileProps {
  nama: string;
  prodi: string;
    image: string;
  angkatan: string;
  email: string;
    laporan: string;
}

const Profile: React.FC<ProfileProps> = ({ nama, prodi,image, angkatan, email ,laporan}) => {
    console.log(nama, prodi, angkatan, email);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-start mb-6">
          <button className="text-blue-500 hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center">
          <Image
            width={96}
            height={96}
            src={image}
            alt="Profile Picture"
            className="rounded-full w-24 h-24 object-cover mb-4"
          />
        </div>

        <div className="text-center text-gray-600 text-sm mb-4">
          <p>{laporan} Laporan Terkirim</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600">
              Nama
            </label>
            <input
              type="text"
              id="name"
              placeholder={nama}
              defaultValue={nama}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="program" className="block text-sm text-gray-600">
              Program Studi
            </label>
            <input
              type="text"
              id="program"
              defaultValue={prodi}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="angkatan" className="block text-sm text-gray-600">
              Angkatan
            </label>
            <input
              type="number"
              id="angkatan"
              defaultValue={angkatan}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={email}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>


        <div className="mt-6 flex justify-between">
          <Link href={'/'}>
            <div className="w-28 h-12 mr-2">
              <button className="w-full flex justify-center items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300">
                <IoPencilOutline className="text-lg" />
                <span>Edit</span>
              </button>
            </div>
          </Link>
          <div className="w-28 h-12 ">
                      <button className=" flex justify-center items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300">
            <IoSaveOutline className="text-lg" />
            <span>Simpan</span>
          </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
