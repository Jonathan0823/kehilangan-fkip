"use client";

import { FiPaperclip } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { createPost } from "@/app/lib/action"; 
import { useSession } from "next-auth/react";

export default function ReportForm() {
  const { data: session } = useSession();
  const [reportType, setReportType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null); 

    const formData = {
      title: reportType,
      description,
      image: attachment ? await uploadAttachment(attachment) : null, 
      date,
      userImage: session?.user?.image, 
      userName: session?.user?.name, 
      userId: session?.user?.id, 
      type: reportType,
    };

    try {
      await createPost(formData);
      setSuccessMessage("Laporan berhasil diupload");
      setReportType("");
      setDescription("");
      setDate("");
      setAttachment(null);
      setPreviewImage(null);
    } catch (err) {
      setError("Laporan gagal diupload");
      console.error(err); 
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadAttachment = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve("URL_LAMPIRAN"), 1000);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 mt-20 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sampaikan laporan Anda</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Pilih Jenis Laporan</label>
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => setReportType("Kerusakan Fasilitas")}
              className={`py-2 px-4 rounded ${
                reportType === "Kerusakan Fasilitas"
                  ? "bg-blue-500 border-2 text-white font-bold"
                  : "border-blue-300 border-2 font-bold text-sky-300"
              }`}
            >
              Kerusakan Fasilitas
            </button>
            <button
              type="button"
              onClick={() => setReportType("Kehilangan Barang")}
              className={`py-2 px-4 rounded ${
                reportType === "Kehilangan Barang"
                  ? "bg-blue-500 text-white font-bold border-2"
                  : "border-blue-300 border-2 font-bold text-sky-300"
              }`}
            >
              Kehilangan Barang
            </button>
            <button
              type="button"
              onClick={() => setReportType("Penemuan Barang")}
              className={`py-2 px-4 rounded ${
                reportType === "Penemuan Barang"
                  ? "bg-blue-500 text-white font-bold border-2"
                  : "border-blue-300 border-2 font-bold text-sky-300"
              }`}
            >
              Penemuan Barang
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Deskripsikan Laporan Anda
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Deskripsikan laporan Anda"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Tanggal Kejadian
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="right-0 flex items-center border border-gray-300 p-2">
            <FiPaperclip /> Upload Lampiran
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        {previewImage && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Preview Lampiran</label>
            <Image
              src={previewImage}
              alt="Preview"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
          >
            Upload Laporan
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
