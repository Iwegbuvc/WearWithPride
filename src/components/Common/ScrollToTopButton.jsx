import React from "react";

const buttonStyle = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  zIndex: 1000,
  padding: "0.75rem 1.25rem",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "background 0.2s",
};

export default function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;
  return (
    <button style={buttonStyle} onClick={handleClick} aria-label="Scroll to top">
      ↑ Top
    </button>
  );
}
