import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Home from "../pages/Home/Home";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Pricing from "../pages/Pricing/Pricing";

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Navigate to={"home"} replace={true} />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<Navigate to={"home"} replace={true} />} />
      </Routes>
      <Footer />
    </div>
  );
}
// the keyboard slick , what is the ame of youbabe
export default App;
