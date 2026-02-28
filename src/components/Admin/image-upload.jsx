import React from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFiles,
  setImageFiles,
  uploadedImageUrls,
  setUploadedImageUrls,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) setImageFiles(droppedFiles);
  }

  function handleRemoveImage(index) {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (uploadedImageUrls) {
      const newUrls = uploadedImageUrls.filter((_, i) => i !== index);
      setUploadedImageUrls(newUrls);
    }
  }

  // Removed uploadImagesToServer and image loading state logic

  // Removed effect for uploading images to server

  // Local preview for selected file
  const [localPreviews, setLocalPreviews] = React.useState([]);
  React.useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const urls = imageFiles.map((file) => {
        if (typeof file === "string") {
          return file;
        } else if (file && typeof file === "object" && file.url) {
          return file.url;
        } else if (file instanceof File) {
          return URL.createObjectURL(file);
        } else {
          return null;
        }
      });
      setLocalPreviews(urls);
      return () => urls.forEach((url) => url && url.startsWith("blob:") && URL.revokeObjectURL(url));
    } else {
      setLocalPreviews([]);
    }
  }, [imageFiles]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple
        />
        {imageFiles && imageFiles.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {localPreviews.map((url, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                {url && (
                  <img
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="max-h-40 rounded-md object-contain"
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(idx)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload images</span>
          </Label>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
