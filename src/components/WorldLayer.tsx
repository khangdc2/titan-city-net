import React from "react";
import PlayerAvatar from "@components/PlayerAvatar";
import NPCList from "@components/NPCList";
import SpawnEntities from "@components/SpawnEntities";
import type { Spawn, NPC } from "@types";

export default function WorldLayer({
  playerPos,
  avatar,
  npcs,
  spawns,
  onClickNPC,
  onClickSpawn,
}: {
  playerPos: { x: number; y: number };
  avatar: string;
  npcs: NPC[];
  spawns: Spawn[];
  onClickNPC: (npc: NPC) => void;
  onClickSpawn: (spawn: Spawn) => void;
}) {
  return (
    <>
      <PlayerAvatar avatar={avatar} x={playerPos.x} y={playerPos.y} />
      <NPCList npcs={npcs} onClick={onClickNPC} />
      <SpawnEntities spawns={spawns} onClick={onClickSpawn} />
    </>
  );
}
