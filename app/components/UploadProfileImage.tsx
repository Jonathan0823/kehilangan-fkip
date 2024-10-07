import * as React from "react";
import { useEdgeStore } from "@/app/lib/edgeStore";
import axios from "axios";
import Cropper from "react-easy-crop";
import getCroppedImg from "../lib/cropImage";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaCamera, FaUpload } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md"; 
import { CircularProgress } from "@mui/material"; 

interface UploadProfileImageProps {
  onClick: (url: string) => void;
  onUpload: () => void;
}

const UploadProfileImage: React.FC<UploadProfileImageProps> = ({
  onClick,
  onUpload,
}) => {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [preview, setPreview] = useState<string>("");
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [send, setSend] = useState<boolean>(false);

  const handleUpload = async () => {
    if (file && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels);
      try {
        const res = await edgestore.publicFiles.upload({
          file: croppedImage,
          onProgressChange: (progress) => {
            console.log(progress);
            setProgress(progress);
          },
        });

        const uploadedUrl = res?.url;
        setImageUrl(uploadedUrl);
        console.log("Uploaded Image URL:", uploadedUrl);
        await saveImageToDatabase(uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const saveImageToDatabase = async (url: string | null) => {
    if (url) {
      try {
        const result = await axios.post("/api/uploadProfileImage", {
          id: session?.user.id,
          image: url,
        });
        setSuccessMessage("Image uploaded successfully");
        onClick(url);
        setTimeout(() => {
          onUpload();
        }, 2000);
        console.log("Response from server:", result.data);
      } catch (error) {
        console.error("Error saving image URL to database:", error);
      } finally {
        setSend(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100">
      <div className="bg-white p-10 rounded-xl max-w-lg w-full shadow-xl transition-shadow duration-300 hover:shadow-2xl border border-sky-300">
        <div className="text-center">
          <label className="text-3xl font-semibold flex items-center justify-center text-sky-600">
            <span>Select Profile Picture</span>
            <FaCamera size={28} className="ml-2" />
          </label>
          <p className="text-gray-500 mt-2">Upload a clear, high-quality image</p>
        </div>

        {/* Input file yang lebih modern */}
        <div className="mt-6 mb-4">
          <label className="block w-full border-2 border-dashed border-sky-400 rounded-lg p-6 text-center cursor-pointer hover:bg-sky-50 hover:border-sky-600 transition duration-200 ease-in-out">
            <FaUpload className="text-sky-600 mx-auto mb-2" size={24} />
            <span className="text-sky-600 font-medium">Choose Image</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Preview Gambar dan Cropper */}
        {preview && (
          <div className="relative w-full h-64 mt-6 mb-4 bg-gray-100 rounded-lg overflow-hidden shadow-md border border-gray-300">
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        {/* Progress bar untuk upload */}
        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-sky-500 h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            >
              <span className="text-xs text-white font-bold p-1">
                {progress}%
              </span>
            </div>
          </div>
        )}

        {/* Tombol Upload muncul hanya setelah file dipilih */}
        {preview && (
          <button
            disabled={send}
            className={`w-full py-3 px-4 mt-6 rounded-lg text-lg font-semibold focus:ring focus:ring-sky-300 focus:outline-none transition-all duration-200 ${
              send ? "bg-gray-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
            onClick={handleUpload}
          >
            {send ? <CircularProgress size={24} color="inherit" /> : "Upload"}
          </button>
        )}

        {/* Link untuk melihat gambar yang diupload dan icon sukses */}
        {imageUrl && (
          <div className="flex flex-col items-center mt-6">
            <a
              href={imageUrl}
              className="text-sky-600 hover:underline font-medium"
            >
              View Uploaded Image
            </a>
            <MdCheckCircle className="text-green-500 text-5xl mt-4" />
          </div>
        )}

        {/* Pesan sukses */}
        {successMessage && (
          <p className="text-green-500 text-center mt-4 font-semibold">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadProfileImage;
