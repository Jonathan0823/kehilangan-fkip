import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoPencilOutline,
  IoSaveOutline,
  IoClose,
  IoCamera,
} from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import BackButton from "./profilebuttons/back";
import Modal from "./modal";
import UploadProfileImage from "./UploadProfileImage";

interface ProfileProps {
  id: string;
  nama: string;
  prodi: string;
  image: string;
  angkatan: string;
  email: string;
  laporan: string;
}

const Profile: React.FC<ProfileProps> = ({
  id,
  nama,
  prodi,
  image,
  angkatan,
  email,
  laporan,
}) => {
  const [name, setName] = useState(nama);
  const [program, setProgram] = useState(prodi);
  const [angk, setAngk] = useState(angkatan);
  const [mail, setMail] = useState(email);
  const [imageUrl, setImage] = useState(image);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const updateProfile = async () => {
        setError(null);
        setSuccessMessage(null);
        setLoading(true);
        try {
            const result = await axios.post("/api/editeUser", {
                id,
                name: name,
                prodi: program,
                angkatan: angk,
            });
            console.log(result);
            setSuccessMessage("Profile Updated");
        } catch (err) {
            console.log(err);
            setError("Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-start mb-6">
          <BackButton />
        </div>
        <div className="flex justify-center">
          <Image
            width={96}
            height={96}
            src={imageUrl}
            alt="Profile Picture"
            className="rounded-full w-24 h-24 object-cover mb-4"
          />{" "}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="relative flex flex-col max-h-screen">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose size={30} />
              </button>
              <UploadProfileImage onUpload={()=>{setIsModalOpen(false)}} onClick={(url:string) => setImage(url)} />
            </div>
          </Modal>
        </div>
        <div className="text-center text-gray-600 text-sm ">
          <p>{laporan} Laporan Terkirim</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="mt-4  text-sky-500 hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            <IoCamera size={30} />
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={program}
              onChange={(e) => setProgram(e.target.value)}
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
              value={angk}
              onChange={(e) => setAngk(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              disabled
              type="email"
              id="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Link href={"/"}>
            <div className="w-28 h-12 mr-2">
              <button className="w-full flex justify-center items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300">
                <IoPencilOutline className="text-lg" />
                <span>Edit</span>
              </button>
            </div>
          </Link>
          <div className="w-28 h-12 ">
            <button
              onClick={updateProfile}
              disabled={loading}
              className={`flex justify-center items-center space-x-2 px-3 py-1.5 rounded-md shadow-lg transition duration-300 ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white"
              }`}
            >
              <IoSaveOutline className="text-lg" />
              <span>{loading ? "Menyimpan..." : "Simpan"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
