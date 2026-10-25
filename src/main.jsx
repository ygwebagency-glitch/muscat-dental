import "@fontsource-variable/fraunces";
import "@fontsource-variable/plus-jakarta-sans";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
window.addEventListener("load", () => {
  [
    "/images/highlights/experienced-dentists.jpg",
    "/images/highlights/advanced-technology.jpg",
    "/images/highlights/easy-appointments.jpg",
    "/images/about/dr-siddique-consultation.jpg",
    "/images/contact/contact-hero.jpg",
    "/images/testimonials/ahmad-raza.jpg",
    "/images/testimonials/muhammad-bilal.jpg",
    "/images/why/why-choose-us.jpg",
    "/images/gallery/before.jpg",
    "/images/gallery/after.jpg",
  ].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});