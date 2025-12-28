// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // or "smooth" or "instant"
    });
  }, [pathname]); // runs every time route path changes

  return null;
};

export default ScrollToTop;
