import React from "react";

interface DialogueBoxProps {
  message: string;
  onAccept?: () => void;
  onClose?: () => void;
  showButton?: boolean;
}

export default function DialogueBox({ message, onAccept, onClose, showButton }: DialogueBoxProps) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-xl shadow-lg max-w-md text-center animate-bounce">
      <p className="text-sm italic whitespace-pre-line mb-2">{message}</p>
      {showButton && (
        <button
          onClick={onAccept}
          className="bg-teal-500 hover:bg-teal-400 text-white py-1 px-4 rounded-full text-sm"
        >
          Accept Quest
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-xs text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}