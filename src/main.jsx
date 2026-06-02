import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/reset.css";
import "./style/index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "@pages/Landing/Landing.jsx";
import Vfx from "@pages/vfx/vfx.jsx";
import Coding from "@pages/coding/coding.jsx";
import About from "@pages/about/about.jsx";
import Contact from "@pages/contact/contact.jsx";
import Navlayout from "@functional/Layout/Navlayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route element={<Navlayout />}>
            <Route path="/vfx" element={<Vfx />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
