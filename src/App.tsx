import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitanCityLandingPage from "@pages/TitanCityLandingPage";
import GamePage from "@pages/GamePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitanCityLandingPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
