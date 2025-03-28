import React from "react";

export default function Pet({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{ position: "absolute", top: y, left: x }}
      className="z-10"
    >
      <div className="text-2xl animate-bounce">🐾</div>
    </div>
  );
}
