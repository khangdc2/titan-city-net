import React, { useEffect, useState } from "react";

interface NPC {
  id: string;
  x: number;
  y: number;
  name: string;
  message: string;
  zone: string;
  task?: string;
}

interface Vehicle {
  id: string;
  x: number;
  y: number;
  label: string;
  owner: string;
}

export default function GamePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueText, setDialogueText] = useState("");
  const [direction, setDirection] = useState<string | null>(null);
  const [currentZone, setCurrentZone] = useState("Downtown");
  const [currentMusic, setCurrentMusic] = useState<HTMLAudioElement | null>(null);
  const [questLog, setQuestLog] = useState<string[]>([]);
  const [activeQuest, setActiveQuest] = useState<string | null>(null);
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [autoMoveTarget, setAutoMoveTarget] = useState<{ x: number; y: number } | null>(null);

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
    const handleMove = (e: KeyboardEvent) => {
      setDirection(e.key);
    };
    window.addEventListener("keydown", handleMove);
    return () => window.removeEventListener("keydown", handleMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        const speed = 5;
        const next = { ...prev };

        if (autoMoveTarget) {
          const dx = autoMoveTarget.x - next.x;
          const dy = autoMoveTarget.y - next.y;
          if (Math.abs(dx) < speed && Math.abs(dy) < speed) {
            setAutoMoveTarget(null);
            return next;
          }
          if (Math.abs(dx) > speed) next.x += dx > 0 ? speed : -speed;
          if (Math.abs(dy) > speed) next.y += dy > 0 ? speed : -speed;
        } else if (direction) {
          switch (direction) {
            case "ArrowUp":
              next.y -= speed;
              break;
            case "ArrowDown":
              next.y += speed;
              break;
            case "ArrowLeft":
              next.x -= speed;
              break;
            case "ArrowRight":
              next.x += speed;
              break;
          }
        }

        const zone = next.x < 600 ? "Downtown" : "Solar Park";
        if (zone !== currentZone) {
          setCurrentZone(zone);
          if (currentMusic) {
            currentMusic.volume = 0;
            currentMusic.pause();
          }
          const music = new Audio(zone === "Downtown" ? "/downtown.mp3" : "/solarpark.mp3");
          music.loop = true;
          music.volume = 0.5;
          music.play();
          setCurrentMusic(music);
        }

        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [direction, currentZone, currentMusic, autoMoveTarget]);

  const handleNPCClick = (npc: NPC) => {
    const beep = new Audio("/beep.mp3");
    beep.volume = 0.3;
    beep.play();
    setSelectedNPC(npc);
    setDialogueText(`${npc.message}${npc.task ? `\nTask: ${npc.task}` : ""}`);
    setShowDialogue(true);
  };

  const acceptQuest = () => {
    if (selectedNPC?.task && !questLog.includes(selectedNPC.task)) {
      setQuestLog((prev) => [...prev, selectedNPC.task!]);
      setActiveQuest(selectedNPC.task);

      const nextNPC = npcs.find((n) => n.name === "Luna");
      if (nextNPC) {
        setAutoMoveTarget({ x: nextNPC.x, y: nextNPC.y });
      }
    }
    setShowDialogue(false);
  };

  if (!avatar) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="w-screen h-screen bg-gray-950 relative overflow-hidden">
      <h2 className="text-white text-xl p-4">TitanCity - {currentZone}</h2>

      {/* Player Avatar */}
      <div
        style={{
          position: "absolute",
          top: pos.y,
          left: pos.x,
          transition: "top 0.05s, left 0.05s",
        }}
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
          style={{
            position: "absolute",
            top: npc.y,
            left: npc.x,
            cursor: "pointer",
          }}
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

      {/* Dialogue Box */}
      {showDialogue && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-xl shadow-lg max-w-md text-center animate-bounce">
          <p className="text-sm italic whitespace-pre-line mb-2">{dialogueText}</p>
          {selectedNPC?.task && (
            <button
              onClick={acceptQuest}
              className="bg-teal-500 hover:bg-teal-400 text-white py-1 px-4 rounded-full text-sm"
            >
              Accept Quest
            </button>
          )}
        </div>
      )}

      {/* Quest Log */}
      <div className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-64">
        <h3 className="text-md font-bold mb-2">📜 Quest Log</h3>
        {questLog.length === 0 ? (
          <p className="text-sm text-gray-400">No active quests.</p>
        ) : (
          <ul className="list-disc list-inside text-sm space-y-1">
            {questLog.map((quest, index) => (
              <li key={index} className={quest === activeQuest ? "text-teal-400" : ""}>
                {quest}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}