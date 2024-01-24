import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Home from "../pages/Home/Home";
import NavBar from "../components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={"home"} replace={true} />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Navigate to={"home"} replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
