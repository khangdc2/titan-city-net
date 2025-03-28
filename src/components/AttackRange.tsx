import React from "react";

export default function AttackRange({ x, y, radius }: { x: number; y: number; radius: number }) {
  return (
    <div
      className="absolute rounded-full border border-rose-400 opacity-30 pointer-events-none"
      style={{
        top: y - radius,
        left: x - radius,
        width: radius * 2,
        height: radius * 2,
      }}
    />
  );
}
