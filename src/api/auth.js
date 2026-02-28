// src/api/auth.js
import API from "./api";

export const logout = async () => {
  // Call the backend logout endpoint
  return API.post("/logout");
};
