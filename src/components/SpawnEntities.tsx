import React from "react";
import type { Spawn } from "@types";

interface Props {
  spawns: Spawn[];
  onClick: (spawn: Spawn) => void;
}

export default function SpawnEntities({ spawns, onClick }: Props) {
  return (
    <>
      {spawns.map((spawn) => (
        <div
          key={spawn.id}
          style={{
            position: "absolute",
            top: spawn.lat,
            left: spawn.lng,
            cursor: "pointer",
          }}
          className="text-xl animate-bounce z-10"
          onClick={() => onClick(spawn)}
        >
          {spawn.type === "creature" ? "🐉" : spawn.type === "item" ? "💎" : "⚡"}
        </div>
      ))}
    </>
  );
}
