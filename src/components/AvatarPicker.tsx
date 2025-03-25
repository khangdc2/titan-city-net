import React from "react";
import avatar1 from "@assets/avatar1.png";
import avatar2 from "@assets/avatar2.png";
import avatar3 from "@assets/avatar3.png";

interface AvatarPickerProps {
  onSelect: (avatar: string) => void;
  selectedAvatar: string | null;
  onConfirm: () => void;
}

export default function AvatarPicker({ onSelect, selectedAvatar, onConfirm }: AvatarPickerProps) {
  return (
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
              onClick={() => onSelect(avatar)}
            />
          ))}
        </div>
        <button
          onClick={onConfirm}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded-xl font-semibold"
        >
          Confirm & Start
        </button>
      </div>
    </div>
  );
}