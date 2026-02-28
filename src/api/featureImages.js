// Utility to fetch feature images from backend
import API from "../api/api";


// Fetch homepage feature images
export async function fetchFeatureImages() {
  try {
    const res = await API.get("/admin/getHomePageImages");
    return res.data.data || [];
  } catch (err) {
    return [];
  }
}

// Admin: Upload homepage feature image
export async function uploadFeatureImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await API.post("/admin/addHomePageImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return { success: false, message: err?.response?.data?.message || "Upload failed" };
  }
}
