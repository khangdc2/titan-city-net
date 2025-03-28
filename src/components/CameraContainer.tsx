import React from "react";

export default function CameraContainer({
  playerPos,
  zoom,
  children,
}: {
  playerPos: { x: number; y: number };
  zoom: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative w-screen h-screen bg-gradient-to-br from-rose-950 to-gray-900 text-white font-sans overflow-hidden"
      style={{
        transform: `translate(${-playerPos.x + window.innerWidth / 2}px, ${-playerPos.y + window.innerHeight / 2}px) scale(${zoom})`,
        transition: 'transform 0.3s ease-out',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
}
