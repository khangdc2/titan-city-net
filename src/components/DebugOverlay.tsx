import React from "react";

interface DebugOverlayProps {
  x: number;
  y: number;
  zone: string;
  spawnCount: number;
}

export default function DebugOverlay({ x, y, zone, spawnCount }: DebugOverlayProps) {
  return (
    <div className="absolute top-2 right-2 bg-black/70 text-green-400 text-xs p-2 rounded z-50 font-mono shadow-md">
      <div>📍 x: {x}, y: {y}</div>
      <div>🗺️ zone: {zone}</div>
      <div>🎯 spawns: {spawnCount}</div>
    </div>
  );
}
