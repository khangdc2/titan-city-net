import React from "react";

export default function MiniMap({ playerPos }: { playerPos: { x: number; y: number } }) {
  return (
    <div className="absolute top-4 left-4 w-32 h-32 bg-black border border-gray-700 rounded-md overflow-hidden z-40">
      <div className="relative w-full h-full">
        <div
          className="absolute w-2 h-2 bg-teal-400 rounded-full"
          style={{ top: playerPos.y / 10, left: playerPos.x / 10 }}
        />
        <div
          className="absolute border border-cyan-300 rounded-sm"
          style={{
            top: playerPos.y / 10 - 8,
            left: playerPos.x / 10 - 8,
            width: 16,
            height: 16,
          }}
        />
      </div>
    </div>
  );
}
