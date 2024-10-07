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

const MAX_UPLOADS = 3; 
const UPLOAD_TIME_FRAME = 60000; 

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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [preview, setPreview] = useState<string>("");
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [sending, setSending] = useState<boolean>(false);
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [lastUploadTime, setLastUploadTime] = useState<number>(0);

  const handleUpload = async () => {
    const currentTime = Date.now();
    if (currentTime - lastUploadTime < UPLOAD_TIME_FRAME && uploadCount >= MAX_UPLOADS) {
      alert("You have reached the maximum upload limit. Please try again later.");
      return;
    }

    if (file && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels) as File;
      try {
        setSending(true);
        const res = await edgestore.publicFiles.upload({
          file: croppedImage,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });

        const uploadedUrl = res?.url;
        setImageUrl(uploadedUrl);
        await saveImageToDatabase(uploadedUrl);
        setUploadCount(prev => prev + 1);
        setLastUploadTime(currentTime);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setSending(false);
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
          onUpload();
        console.log("Response from server:", result.data);
      } catch (error) {
        console.error("Error saving image URL to database:", error);
      } finally {
  
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (selectedFile.size > 2 * 1024 * 1024) { 
        alert("File size must be less than 2MB.");
        return;
      }
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onCropComplete = (croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
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

        {preview && (
          <button
            disabled={sending}
            className={`w-full py-3 px-4 mt-6 rounded-lg text-lg font-semibold focus:ring focus:ring-sky-300 focus:outline-none transition-all duration-200 ${
             sending ? "bg-gray-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
            onClick={handleUpload}
          >
            {sending ? <CircularProgress size={24} color="inherit" /> : "Upload"}
          </button>
        )}

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
