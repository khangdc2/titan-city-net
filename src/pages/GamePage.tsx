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

export default function GamePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
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
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayerPos((prev) => {
        const baseSpeed = 10;
        const speed = e.shiftKey ? baseSpeed * 2 : baseSpeed;
        switch (e.key) {
          case "ArrowUp": return { ...prev, y: prev.y - speed };
          case "ArrowDown": return { ...prev, y: prev.y + speed };
          case "ArrowLeft": return { ...prev, x: prev.x - speed };
          case "ArrowRight": return { ...prev, x: prev.x + speed };
          case " ": return { ...prev, y: prev.y - speed * 3 }; // jump
          default: return prev;
        }
      });

      if (/^[1-6]$/.test(e.key)) {
        const nearest = spawns.reduce((closest, spawn) => {
          const dist = Math.hypot(spawn.lat - playerPos.y, spawn.lng - playerPos.x);
          const closestDist = closest ? Math.hypot(closest.lat - playerPos.y, closest.lng - playerPos.x) : Infinity;
          return dist < closestDist ? spawn : closest;
        }, null as Spawn | null);

        if (nearest) {
          alert(`🔥 Thi triển kỹ năng ${e.key} lên ${nearest.type} ${nearest.id.slice(0, 4)}`);
        } else {
          alert("❌ Không có mục tiêu trong phạm vi!");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, spawns]);

  useEffect(() => {
    const handleKeyToggle = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k") {
        setShowSkillPanel(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyToggle);

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(z + 0.1, 2));
      } else if (e.key === "-" || e.key === "_") {
        setZoom((z) => Math.max(z - 0.1, 0.5));
      }
    });
    return () => window.removeEventListener("keydown", handleKeyToggle);
  }, []);

  const npcs: NPC[] = [
    {
      id: "npc-ap",
      x: 400,
      y: 300,
      name: "AP",
      message: "Welcome to TitanCity! This city runs on clean energy and code.",
      zone: "Downtown",
      task: "Visit Luna in Solar Park."
    },
    {
      id: "npc-luna",
      x: 700,
      y: 500,
      name: "Luna",
      message: "The solar fields are expanding every cycle!",
      zone: "Solar Park",
      task: "Collect solar crystals."
    },
    {
      id: "npc-anon",
      x: 300,
      y: 150,
      name: "???",
      message: "Even the silent are part of this city's heartbeat.",
      zone: "Downtown",
    },
    {
      id: "npc-thiensu",
      x: 950,
      y: 700,
      name: "Thiền Sư",
      message: "Phật pháp vô biên. Con đường ngộ đạo bắt đầu từ tâm.",
      zone: "Pagoda",
      task: "Thiền định tại chánh điện."
    },
    {
      id: "npc-tieuphu",
      x: 50,
      y: 300,
      name: "Tiều Phu",
      message: "Long Tuyền là vùng đất thanh bình. Muốn vào thành hãy đi về phía Đông!",
      zone: "Long Tuyền Thôn"
    }
  ];

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
        onClickSpawn={(spawn) => alert(`Bạn đụng ${spawn.type} ${spawn.id.slice(0, 4)}`)}
      />
      <Vehicles vehicles={[{ id: "bike-luna", x: 740, y: 500, label: "🚲 Luna's AI Bike", owner: "Luna" }]} />
      <AttackRange x={playerPos.x} y={playerPos.y} radius={80} />
      {showDialogue && selectedNPC && (
        <DialogueBox
          message={dialogueText}
          onAccept={selectedNPC.task ? () => {
            questManager.current?.acceptQuest({
              id: `quest-${selectedNPC.id}`,
              title: selectedNPC.task,
              description: selectedNPC.message,
              giverNpcId: selectedNPC.id,
              targetZone: selectedNPC.zone,
              objective: selectedNPC.task,
            });
            setActiveQuest(questManager.current?.getActive() ?? null);
            setShowDialogue(false);
          } : undefined}
          onClose={() => setShowDialogue(false)}
          showButton={!!selectedNPC.task}
        />
      )}
      <QuestLog quests={questLog} activeQuestId={activeQuest?.id} />
      <ZoomIndicator zoom={zoomPercent} />
    </CameraContainer>
  );
}
