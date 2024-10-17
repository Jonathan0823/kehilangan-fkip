import Image from "next/image";
import { IoClose } from "react-icons/io5";
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
  const [disabled, setDisabled] = useState(true);

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
  };

  return (
    <div className="flex justify-center items-center md:h-screen bg-white">
      <div className="bg-[#d0f0fb] md:shadow-md rounded-lg p-6 w-full max-w-md relative">
        <div className="absolute bottom-0 left-0 w-full h-5/6 bg-[#f4f6f8] rounded-t-[30px] z-0"></div>
        <div className="relative z-10">
          <div className="flex w-full mb-6">
            <BackButton type="" />
            <h1 className="flex mx-auto text-center font-bold text-xl">
              Profil Saya
            </h1>
          </div>
          <div className="flex justify-center">
            <Image
              width={96}
              height={96}
              src={imageUrl}
              alt="Profile Picture"
              onClick={() => setIsModalOpen(true)}
              className="rounded-full cursor-pointer mb-2"
            />
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="relative flex z-10 flex-col max-h-screen">
              <button
                className="absolute top-2 right-2 z-10 text-gray-600 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}
                title="Close Modal"
              >
                <IoClose size={30} />
              </button>
              <UploadProfileImage
                onUpload={() => {
                  setIsModalOpen(false);
                }}
                onClick={(url: string) => setImage(url)}
              />
            </div>
          </Modal>
          <div className="text-center text-gray-600 z-10 text-sm ">
            <p className="font-bold text-xl">{laporan}</p>
            <p> Laporan Terkirim</p>
          </div>
          {error && <p className="text-red-500 z-10 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 z-10 text-center">{successMessage}</p>
          )}
          <div className="flex flex-col z-10 justify-center mx-auto md:gap-3 mt-5 gap-1 w-5/6">
            <div>
              <label
                htmlFor="name"
                className="block z-10 text-sm text-gray-600"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
                className={`w-full px-4 py-1 z-10 bg-white border border-[#69c3f0] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${disabled ? 'text-gray-500' : 'text-black'}`}
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
                disabled={disabled}
                onChange={(e) => setProgram(e.target.value)}
                className={`w-full px-4 py-1  border bg-white border-[#69c3f0] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${disabled ? 'text-gray-500' : 'text-black'}`}
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
                disabled={disabled}
                onChange={(e) => setAngk(e.target.value)}
                min={2017}
                max={new Date().getFullYear()}
                className={`w-full px-4 py-1 border bg-white border-[#69c3f0] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${disabled ? 'text-gray-500' : 'text-black'}`}
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
                className={`w-full px-4 py-1 border bg-white border-[#69c3f0] rounded-md focus:outline-none focus:ring-2 text-gray-500 focus:ring-blue-300`}
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-3 items-center">
            <button
              className=" flex justify-center items-center font-bold gap-2 mt-3 w-32 px-2 py-1.5 bg-[#69c3f0] text-white rounded-md shadow-lg hover:bg-[#4da4cf] transition duration-300"
              onClick={() => setDisabled(false)}
            >
              <span>Edit Profil</span>
            </button>

            <button
              onClick={updateProfile}
              disabled={loading}
              className={`flex justify-center items-center font-bold gap-2 px-2 w-32 py-1.5 rounded-md shadow-lg transition duration-300 ${
                loading
                  ? "bg-gray-400"
                  : "bg-[#69c3f0] text-white hover:hover:bg-[#4da4cf] transition duration-300"
              }`}
            >
              <span>{loading ? "Menyimpan..." : "Simpan"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
