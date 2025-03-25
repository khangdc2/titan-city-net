import React from "react";
import type { Quest } from "@types";

interface QuestLogProps {
  quests: Quest[];
  activeQuestId?: string;
}

export default function QuestLog({ quests, activeQuestId }: QuestLogProps) {
  return (
    <div className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-72">
      <h3 className="text-md font-bold mb-2">📜 Quest Log</h3>

      {quests.length === 0 ? (
        <p className="text-sm text-gray-400">No active quests.</p>
      ) : (
        <ul className="list-disc list-inside text-sm space-y-1">
          {quests.map((quest) => (
            <li
              key={quest.id}
              className={`${
                quest.id === activeQuestId
                  ? "text-teal-400 font-semibold"
                  : quest.completed
                  ? "text-green-400 line-through"
                  : "text-white"
              }`}
            >
              {quest.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
