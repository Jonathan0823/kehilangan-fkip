"use client";
import { FiPaperclip } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEdgeStore } from "@/app/lib/edgeStore";

export default function ReportForm() {
  const { data: session } = useSession();
  const [reportType, setReportType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!file) {
      setError("Silakan unggah lampiran.");
      return;
    }

    try {
      const fileUploadResponse = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (uploadProgress) => setProgress(uploadProgress),
      });
      const result = await axios.post("/api/userData",{id:session?.user?.id});
      console.log(result);
      const user = result.data;
      const formData = {
        title: reportType,
        description,
        image: fileUploadResponse.url,
        date,
        userImage: user?.image,
        userName: session?.user?.name,
        userId: session?.user?.id,
        type: reportType,
      };

      await axios.post("/api/post", formData);
      setSuccessMessage("Laporan berhasil diupload");
      setReportType("");
      setDescription("");
      setDate("");
      setFile(null);
      setPreviewImage(null);
      setProgress(0);
    } catch (err) {
      setError("Laporan gagal diupload");
      console.error("Error during form submission:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 mt-20 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sampaikan laporan Anda</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Pilih Jenis Laporan</label>
          <div className="flex flex-col space-y-2">
            {["Kerusakan Fasilitas", "Kehilangan Barang", "Penemuan Barang"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setReportType(type)}
                className={`py-2 px-4 rounded ${
                  reportType === type
                    ? "bg-blue-500 border-2 text-white font-bold"
                    : "border-blue-300 border-2 font-bold text-sky-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Deskripsikan Laporan Anda</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Deskripsikan laporan Anda"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Tanggal Kejadian</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center border border-gray-300 p-2 cursor-pointer">
            <FiPaperclip /> Upload Lampiran
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
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

        {progress > 0 && (
          <div className="mb-4">
            <progress value={progress} max={100} className="w-full"></progress>
            <p>{progress}%</p>
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
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
}
