import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ScrollToTop />  {/* listens to route changes */}
      <App />
    </StrictMode>
  </BrowserRouter>
);
