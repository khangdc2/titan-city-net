import React, { useEffect, useRef, useState } from "react";
import { SpawnManager } from "@managers/SpawnManager";
import { QuestManager } from "@managers/QuestManager";
import DialogueBox from "@components/DialogueBox";
import QuestLog from "@components/QuestLog";
import type { Spawn, NPC, Vehicle } from "@types";

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

  const spawnManager = useRef<SpawnManager | null>(null);
  const questManager = useRef<QuestManager | null>(null);

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
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: "bike-luna",
      x: 740,
      y: 500,
      label: "🚲 Luna's AI Bike",
      owner: "Luna"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("titanCityAvatar");
    if (saved) setAvatar(saved);
  }, []);

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
          case " ": return { ...prev, y: prev.y - speed * 3 }; // jump with spacebar
          default: return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const z =
      playerPos.x > 900 ? "Pagoda" :
      playerPos.x > 600 ? "Solar Park" :
      "Downtown";
    setZone(z);
  }, [playerPos]);

  useEffect(() => {
    if (!spawnManager.current) {
      spawnManager.current = new SpawnManager(() => playerPos, () => zone);
      spawnManager.current.start();
    }

    const interval = setInterval(() => {
      setSpawns(spawnManager.current!.getSpawnsInZone(zone));
    }, 2000);

    return () => clearInterval(interval);
  }, [playerPos, zone]);

  useEffect(() => {
    if (!questManager.current) {
      questManager.current = new QuestManager((q) => setQuestLog(q));
    }
    setActiveQuest(questManager.current.getActive());
  }, []);

  useEffect(() => {
    if (zone === "Pagoda" && activeQuest?.id === "quest-npc-thiensu") {
      const timer = setTimeout(() => {
        questManager.current?.completeQuest();
        alert("Bạn đã ngộ đạo 🌸");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [zone, activeQuest]);

  const handleNPCClick = (npc: NPC) => {
    setSelectedNPC(npc);
    setDialogueText(`${npc.message}${npc.task ? `\nTask: ${npc.task}` : ""}`);
    setShowDialogue(true);
  };

  const acceptQuest = () => {
    if (selectedNPC?.task) {
      questManager.current?.acceptQuest({
        id: `quest-${selectedNPC.id}`,
        title: selectedNPC.task,
        description: selectedNPC.message,
        giverNpcId: selectedNPC.id,
        targetZone: selectedNPC.zone,
        objective: selectedNPC.task,
      });
      setActiveQuest(questManager.current?.getActive() ?? null);
    }
    setShowDialogue(false);
  };

  if (!avatar) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="relative w-screen h-screen bg-gray-950 overflow-hidden">
      <h2 className="text-white text-xl p-4">TitanCity - {zone}</h2>

      {/* Minimap */}
      <div className="absolute top-4 left-4 bg-gray-800 border border-gray-600 rounded-md p-2 w-32 h-32">
        <div className="relative w-full h-full bg-black">
          <div
            className="absolute w-2 h-2 bg-teal-400 rounded-full"
            style={{ top: playerPos.y / 10, left: playerPos.x / 10 }}
          />
        </div>
      </div>

      {/* Player Avatar */}
      <div
        style={{ position: "absolute", top: playerPos.y, left: playerPos.x }}
        className="z-20"
      >
        <img
          src={avatar}
          className="w-16 h-16 rounded-full border-4 border-teal-400 animate-pulse"
        />
      </div>

      {/* NPCs */}
      {npcs.map((npc) => (
        <div
          key={npc.id}
          onClick={() => handleNPCClick(npc)}
          style={{ position: "absolute", top: npc.y, left: npc.x, cursor: "pointer" }}
        >
          <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold border-4 border-purple-300 hover:scale-110 transition">
            {npc.name}
          </div>
        </div>
      ))}

      {/* Vehicles */}
      {vehicles.map((v) => (
        <div
          key={v.id}
          style={{ position: "absolute", top: v.y, left: v.x }}
          className="text-yellow-300 text-sm animate-bounce"
        >
          {v.label}
        </div>
      ))}

      {/* Spawns */}
      {spawns.map((spawn) => (
        <div
          key={spawn.id}
          style={{ position: "absolute", top: spawn.lat, left: spawn.lng, cursor: "pointer" }}
          className="text-xl animate-bounce z-10"
          onClick={() => alert(`Bạn đụng ${spawn.type} ${spawn.id.slice(0, 4)}`)}
        >
          {spawn.type === "creature" ? "🐉" : spawn.type === "item" ? "💎" : "⚡"}
        </div>
      ))}

      {/* Dialogue Box */}
      {showDialogue && selectedNPC && (
        <DialogueBox
          message={dialogueText}
          onAccept={selectedNPC.task ? acceptQuest : undefined}
          onClose={() => setShowDialogue(false)}
          showButton={!!selectedNPC.task}
        />
      )}

      {/* Quest Log */}
      <QuestLog quests={questLog} activeQuestId={activeQuest?.id} />
    </div>
  );
}
