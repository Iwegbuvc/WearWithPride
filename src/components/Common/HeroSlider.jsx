import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
];

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const HeroSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="relative overflow-hidden w-full h-[70vh] min-h-[320px] flex items-center justify-center bg-white rounded-xl shadow-2xl">
      <button
        className="absolute left-1 sm:left-4 z-10 bg-white/80 hover:bg-white text-black rounded-full p-1 sm:p-2 shadow-lg focus:outline-none"
        onClick={() => paginate(-1)}
        aria-label="Previous image"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <FaChevronLeft className="text-xl sm:text-2xl" />
      </button>
      <button
        className="absolute right-1 sm:right-4 z-10 bg-white/80 hover:bg-white text-black rounded-full p-1 sm:p-2 shadow-lg focus:outline-none"
        onClick={() => paginate(1)}
        aria-label="Next image"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <FaChevronRight className="text-xl sm:text-2xl" />
      </button>
      <div className="w-full h-full flex items-center justify-center relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={imageIndex}
            src={images[imageIndex]}
            alt="slider"
            className="w-full h-full object-cover rounded-xl select-none absolute top-0 left-0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ opacity: { duration: 0.7 } }}
            drag={false}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              minHeight: "180px",
              minWidth: "100px",
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSlider;
