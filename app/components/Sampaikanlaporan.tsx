"use client";
import { FiPaperclip } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEdgeStore } from "@/app/lib/edgeStore";
import { z } from "zod";

const reportSchema = z.object({
  reportType: z.string().min(1, "Jenis laporan harus dipilih"),
  description: z.string().min(1, "Deskripsi tidak boleh kosong"),
  date: z.string().min(1, "Tanggal tidak boleh kosong"),
  file: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Hanya gambar yang boleh diunggah",
  }),
});

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
  const [send, setSend] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
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

  const handleInputChange = () => {
    setSend(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setSending(true);

    try {
      if (!file) {
        setError("File tidak boleh kosong");
        setSending(false);
        return;
      }

      reportSchema.parse({
        reportType,
        description,
        date,
        file: file as File,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map((e) => e.message).join(", "));
        setSending(false);
        return;
      }
    }

    try {
      const fileUploadResponse = await edgestore.publicFiles.upload({
        file: file as File,
        onProgressChange: (uploadProgress) => setProgress(uploadProgress),
      });
      const result = await axios.post("/api/userData", {
        id: session?.user?.id,
      });
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

      const response = await axios.post("/api/post", formData);
      setSuccessMessage("Laporan berhasil diupload");
      if (response.status === 200) {
        window.location.href = "/post";
      }

      setReportType("");
      setDescription("");
      setDate("");
      setFile(null);
      setPreviewImage(null);
      setProgress(0);
      setSend(false);
    } catch (err) {
      setError("Laporan gagal diupload");
      console.error("Error during form submission:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh md:min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 relative overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-10">Sampaikan laporan Anda</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Pilih Jenis Laporan
          </label>
          <div className="flex flex-col space-y-2 mb-10">
            {[
              "Kerusakan Fasilitas",
              "Kehilangan Barang",
              "Penemuan Barang",
            ].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setReportType(type);
                  handleInputChange();
                }}
                className={`py-2 px-4 rounded ${
                  reportType === type
                    ? "bg-blue-500 border-2 text-white font-bold"
                    : "border-blue-300 border-2 font-bold text-gray-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-10">
          <label className="block mb-2">Deskripsikan Laporan Anda</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              handleInputChange();
            }}
            className="w-full p-2 border bg-sky-100 border-gray-300 rounded"
            placeholder="Deskripsikan laporan Anda"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tanggal Kejadian</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              handleInputChange();
            }}
            className="w-full p-2 border bg-sky-100 border-gray-300 rounded"
          />
        </div>
        <div className="mb-10">
          <label className="flex items-center border border-gray-300 p-2 cursor-pointer">
            <FiPaperclip /> Upload Lampiran
            <input
              type="file"
              accept="image/*"
              title="Upload Lampiran"
              placeholder="Upload Lampiran"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                handleInputChange();
              }}
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
            disabled={send || sending}
            className={`w-full py-3 px-4 mt-6 rounded-lg text-lg font-semibold focus:ring focus:ring-sky-300 focus:outline-none transition-all duration-200 ${
              send || sending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
            type="submit"
          >
            Upload Laporan
          </button>
        </div>{" "}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
