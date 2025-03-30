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
import { obstacles } from "@utils/obstacles";
import usePetFollow from "@hooks/usePetFollow";
import useSkillPanelToggle from "@hooks/useSkillPanelToggle";
import ObstacleList from "@components/ObstacleList";

export default function GamePage() {
  const [avatar, setAvatar] = useState<string>(() => {
    return localStorage.getItem("titanCityAvatar") || "/fallback-avatar.png";
  });
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
  const [petPos, setPetPos] = useState({ x: 120, y: 120 });
  const [zone, setZone] = useState("Unknown");
  const [spawns, setSpawns] = useState<Spawn[]>([]);
  const [questLog, setQuestLog] = useState<any[]>([]);
  const [activeQuest, setActiveQuest] = useState<any | null>(null);
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [zoom, setZoom] = useState(1);
  const zoomPercent = Math.round(zoom * 100);

  const [showSkillPanel, toggleSkillPanel] = useSkillPanelToggle();

  const npcs: NPC[] = [
    {
      id: "npc-luna",
      name: "Luna",
      x: 700,
      y: 500,
      zone: "Solar Park",
      message: "The solar fields are expanding every cycle!",
      task: "Collect solar crystals."
    },
    {
      id: "npc-ap",
      name: "AP",
      x: 400,
      y: 300,
      zone: "Downtown",
      message: "Welcome to TitanCity! This city runs on clean energy and code.",
      task: "Visit Luna in Solar Park."
    }
  ];

  const spawnManager = useRef<SpawnManager | null>(null);
  const questManager = useRef<QuestManager | null>(null);

  usePetFollow(playerPos, setPetPos);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayerPos((prev) => {
        const speed = e.shiftKey ? 20 : 10;
        let newX = prev.x;
        let newY = prev.y;
        if (e.key === "ArrowUp") newY -= speed;
        if (e.key === "ArrowDown") newY += speed;
        if (e.key === "ArrowLeft") newX -= speed;
        if (e.key === "ArrowRight") newX += speed;

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePreventScroll = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };
    const preventDefault = (e: Event) => e.preventDefault();

    window.addEventListener("keydown", handlePreventScroll, { passive: false });
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    return () => {
      window.removeEventListener("keydown", handlePreventScroll);
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  useEffect(() => {
    const z =
      playerPos.x < 200 ? "Long Tuyền Thôn" :
      playerPos.x > 900 ? "Pagoda" :
      playerPos.x > 600 ? "Solar Park" :
      "Downtown";
    setZone(z);
  }, [playerPos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpawns(prev => prev.map(spawn => {
        const dx = playerPos.x - spawn.lng;
        const dy = playerPos.y - spawn.lat;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const reaction = distance < 100 ? "👀" : "";

        return {
          ...spawn,
          lng: spawn.lng + (spawn.vx || 0),
          lat: spawn.lat + (spawn.vy || 0),
          reaction,
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [playerPos]);

  return (
    <CameraContainer playerPos={playerPos} zoom={zoom}>
      <DebugOverlay x={playerPos.x} y={playerPos.y} zone={zone} spawnCount={spawns.length} />
      <MiniMap playerPos={playerPos} />
      {showSkillPanel && <SkillPanel />}
      <GameUI avatar={avatar!} zone={zone} />
      <WorldLayer
        playerPos={playerPos}
        avatar={avatar!}
        npcs={npcs}
        spawns={spawns}
        onClickNPC={(npc) => {
          setSelectedNPC(npc);
          setDialogueText(`${npc.message}${npc.task ? `\nTask: ${npc.task}` : ""}`);
          setShowDialogue(true);
        }}
        onClickSpawn={() => {}}
      />
      <WorldPlayer petPos={petPos} />
      <ObstacleList obstacles={obstacles} />
      <AttackRange x={playerPos.x} y={playerPos.y} radius={80} />
      <Vehicles vehicles={[{ id: "bike-luna", x: 740, y: 500, label: "🚲 Luna's AI Bike", owner: "Luna" }]} />
      <QuestLog quests={questLog} activeQuestId={activeQuest?.id} />
      <ZoomIndicator zoom={zoomPercent} />
    </CameraContainer>
  );
}
