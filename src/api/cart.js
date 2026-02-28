// src/api/cart.js
import API from "./api";

// Get current user's cart
export const getCart = async () => {
  return API.get("/cart");
};

// Add item to cart
export const addToCart = async (data) => {
  // data: { productId, quantity, size, color, selectedImage }
  return API.post("/cart/add", data);
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  return API.put(`/cart/item/${itemId}`, { quantity });
};

// Remove item from cart
export const removeCartItem = async (itemId) => {
  return API.delete(`/cart/item/${itemId}`);
};

// Clear cart
export const clearCart = async () => {
  return API.delete("/cart/clear");
};
