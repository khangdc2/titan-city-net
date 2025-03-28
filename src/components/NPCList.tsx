import React from "react";
import type { NPC } from "@types";

interface Props {
  npcs: NPC[];
  onClick: (npc: NPC) => void;
}

export default function NPCList({ npcs, onClick }: Props) {
  return (
    <>
      {npcs.map((npc) => (
        <div
          key={npc.id}
          onClick={() => onClick(npc)}
          style={{ position: "absolute", top: npc.y, left: npc.x, cursor: "pointer" }}
        >
          <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold border-4 border-purple-300 hover:scale-110 transition">
            {npc.name}
          </div>
        </div>
      ))}
    </>
  );
}
