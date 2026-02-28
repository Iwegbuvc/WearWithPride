
import React, { useState } from "react";
import { uploadFeatureImage } from "../../api/featureImages";
import { useToast } from "../ui/use-toast";


const AdminHomePageImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image file.");
      toast({
        title: "No file selected",
        description: "Please select an image file to upload.",
        variant: "destructive",
      });
      return;
    }
    setUploading(true);
    const result = await uploadFeatureImage(file);
    setUploading(false);
    if (result.success) {
      setMessage("Image uploaded successfully!");
      setFile(null);
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
        variant: "success",
      });
    } else {
      setMessage(result.message || "Upload failed.");
      toast({
        title: "Upload failed",
        description: result.message || "Image upload failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-8 border border-gray-200">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
        <span>📸</span> Upload Homepage Feature Image
      </h2>
      <form onSubmit={handleUpload} className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50 hover:bg-blue-100 transition mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="feature-image-upload"
          />
          <label htmlFor="feature-image-upload" className="cursor-pointer flex flex-col items-center">
            <span className="text-4xl mb-2">⬆️</span>
            <span className="text-lg text-blue-600">Drag & drop or click to upload image</span>
            {file && <span className="mt-2 text-sm text-gray-700">Selected: {file.name}</span>}
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow disabled:opacity-50 transition"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {message && <div className="mt-6 text-center text-base font-medium text-green-600">{message}</div>}
    </div>
  );
};

export default AdminHomePageImageUpload;
