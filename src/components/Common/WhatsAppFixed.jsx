import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFixed = () => {
  return (
    <a
      href="https://wa.me/08085807354" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-8 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </a>
  );
};

export default WhatsAppFixed;
