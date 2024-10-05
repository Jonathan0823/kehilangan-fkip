"use client";

import { FiPaperclip } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";

export default function ReportForm() {
  const [reportType, setReportType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //di sini tembat upload data ke data base atau api
      console.log({ attachment, date, description, reportType });
      setSuccessMessage("Laporan berhasil diupload");
    } catch (err) {
      setError("Laporan gagal diupload");
      throw err;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sampaikan laporan Anda</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Pilih Jenis Laporan
          </label>
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

        <button
          type="submit"
          className="w-1/2 bg-blue-500 text-white py-2 rounded"
        >
          Upload Laporan
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
}
