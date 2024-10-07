"use client";

import * as React from "react";
import { useEdgeStore } from "@/app/lib/edgeStore";
import axios from "axios";
import Cropper from "react-easy-crop";
import getCroppedImg from "../lib/cropImage";
import { useSession } from "next-auth/react";

const UploadProfileImage: React.FC = (onClick) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = React.useState<number>(0);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const handleUpload = async () => {
    if (file && croppedAreaPixels) {
      if (preview) {
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
    }
  };

  const saveImageToDatabase = async (url: string | null) => {
    if (url) {
      try {
        const result = await axios.post("/api/uploadProfileImage", {
          id: session?.user.id,
          image: url,
        });
        console.log("Response from server:", result.data);
      } catch (error) {
        console.error("Error saving image URL to database:", error);
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
              className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            >
              <span className="text-xs text-white font-bold p-1">
                {progress}%
              </span>
            </div>
          </div>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}

        <button
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
