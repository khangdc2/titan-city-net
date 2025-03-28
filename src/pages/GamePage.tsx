import React, { useEffect, useRef, useState } from "react";
import DebugOverlay from "@components/DebugOverlay";
import { SpawnManager } from "@managers/SpawnManager";
import { QuestManager } from "@managers/QuestManager";
import DialogueBox from "@components/DialogueBox";
import QuestLog from "@components/QuestLog";
import GameUI from "@components/GameUI";
import SkillPanel from "@components/SkillPanel";
import PlayerAvatar from "@components/PlayerAvatar";
import NPCList from "@components/NPCList";
import SpawnEntities from "@components/SpawnEntities";
import type { Spawn, NPC, Vehicle } from "@types";
import Vehicles from "@components/Vehicles";
import MiniMap from "@components/MiniMap";
import ZoomIndicator from "@components/ZoomIndicator";
import AttackRange from "@components/AttackRange";
import CameraContainer from "@components/CameraContainer";
import WorldLayer from "@components/WorldLayer";
import WorldPlayer from "@components/WorldPlayer";
export default function GamePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
  const [petPos, setPetPos] = useState({ x: 120, y: 120 });
  const [zone, setZone] = useState("Unknown");
  const [spawns, setSpawns] = useState<Spawn[]>([]);
  const [questLog, setQuestLog] = useState<any[]>([]);
  const [activeQuest, setActiveQuest] = useState<any | null>(null);
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [showSkillPanel, setShowSkillPanel] = useState(false);
  const [zoom, setZoom] = useState(1);
  const zoomPercent = Math.round(zoom * 100);
  const spawnManager = useRef<SpawnManager | null>(null);
  const questManager = useRef<QuestManager | null>(null);
  useEffect(() => {
    const followInterval = setInterval(() => {
      setPetPos((prev) => {
        const dx = playerPos.x - prev.x;
        const dy = playerPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 2;
        if (dist < 5) return prev;
        return {
          x: prev.x + (dx / dist) * speed,
          y: prev.y + (dy / dist) * speed,
        };
      });
    }, 100);
    return () => clearInterval(followInterval);
  }, [playerPos]);
  useEffect(() => {
    const handlePreventScroll = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };
    const preventDefault = (e: Event) => e.preventDefault();
    window.addEventListener("keydown", handlePreventScroll);
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    return () => {
      window.removeEventListener("keydown", handlePreventScroll);
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);
  return (
    <CameraContainer playerPos={playerPos} zoom={zoom}>
      <DebugOverlay x={playerPos.x} y={playerPos.y} zone={zone} spawnCount={spawns.length} />
      <MiniMap playerPos={playerPos} />
      {showSkillPanel && <SkillPanel />}
      <GameUI avatar={avatar!} zone={zone} />
      <WorldLayer
        playerPos={playerPos}
        avatar={avatar!}
        npcs={npcs} // ✅ sửa dòng này
        spawns={spawns}
        onClickNPC={(npc) => {
          setSelectedNPC(npc);
          setDialogueText(`${npc.message}${npc.task ? `\nTask: ${npc.task}` : ""}`);
          setShowDialogue(true);
        }}
        onClickSpawn={() => {}}
      />
      <AttackRange x={playerPos.x} y={playerPos.y} radius={80} />
      <Vehicles vehicles={[{ id: "bike-luna", x: 740, y: 500, label: "🚲 Luna's AI Bike", owner: "Luna" }]} />
      <QuestLog quests={questLog} activeQuestId={activeQuest?.id} />
      <ZoomIndicator zoom={zoomPercent} />
    </CameraContainer>
  );
}
