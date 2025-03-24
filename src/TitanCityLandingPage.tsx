import React, { useState } from "react";
import avatar1 from "./assets/avatar1.png";
import avatar2 from "./assets/avatar2.png";
import avatar3 from "./assets/avatar3.png";

export default function TitanCityLandingPage() {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

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

      {/* Modal chọn avatar */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-teal-300">Choose Your Avatar</h2>
            <div className="flex justify-center gap-4 mb-6">
              {[avatar1, avatar2, avatar3].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`w-20 h-20 rounded-full cursor-pointer border-4 transition-all ${
                    selectedAvatar === avatar ? "border-teal-400 scale-110" : "border-gray-600"
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded-xl font-semibold"
            >
              Confirm & Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}