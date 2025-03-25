import React, { useEffect, useState } from "react";
import AvatarPicker from "@components/AvatarPicker";

export default function TitanCityLandingPage() {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  // Tự chuyển sang /game nếu đã có avatar
  useEffect(() => {
    const saved = localStorage.getItem("titanCityAvatar");
    if (saved) window.location.href = "/game";
  }, []);

  const handleConfirm = () => {
    if (selectedAvatar) {
      localStorage.setItem("titanCityAvatar", selectedAvatar);
      window.location.href = "/game";
    } else {
      alert("Please choose an avatar before starting!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome to <span className="text-teal-400">TitanCity</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-10">
        The future is local. Explore a cyber-eco metropolis where technology and nature coexist.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => setShowAvatarModal(true)}
          className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 px-8 rounded-2xl shadow-xl transition-all"
        >
          Play Now
        </button>
        <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-2xl shadow-xl transition-all">
          Whitepaper / Lore
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-xl transition-all">
          Connect Wallet / Login
        </button>
      </div>

      {showAvatarModal && (
        <AvatarPicker
          selectedAvatar={selectedAvatar}
          onSelect={setSelectedAvatar}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
