// src/api/products.js
import API from "./api";

// Create product (admin)
export const createProduct = async (formData) => {
  // formData: FormData instance with all fields and images
  return API.post("/admin/createProduct", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Update product (admin)
export const updateProduct = async (id, formData) => {
  return API.put(`/admin/updateProduct/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete product (admin)
export const deleteProductApi = async (id) => {
  return API.delete(`/admin/deleteProduct/${id}`);
};

// Fetch all products (with filters/pagination)
export const fetchProducts = async (params) => {
  return API.get("/admin/getProducts", { params });
};
