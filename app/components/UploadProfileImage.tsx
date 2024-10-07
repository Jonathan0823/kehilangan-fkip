"use client";

import * as React from "react";
import { useEdgeStore } from "@/app/lib/edgeStore";
import axios from "axios";
import Cropper from "react-easy-crop";
import getCroppedImg from "../lib/cropImage";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
        setSend(true);
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
      }finally{
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

  const onCropComplete = (croppedArea: any, croppedAreaPixels:any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">
          Upload Profile Image
        </h2>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-900 border border-sky-400 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-sky-200"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="relative w-full h-64 mt-4 mb-4">
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
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4">
            <div
              className="bg-blue-600 h-6 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            >
              <span className="text-xs text-white font-bold p-1">
                {progress}%
              </span>
              <Link href={imageUrl}>View</Link>
            </div>
          </div>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}

        <button
          disabled={send}
          className="w-full bg-sky-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadProfileImage;
