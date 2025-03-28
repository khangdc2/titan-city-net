import React from "react";

interface GameUIProps {
  avatar: string;
  zone: string;
  playerName?: string;
  level?: number;
  hp?: number;
  maxHp?: number;
  mp?: number;
  maxMp?: number;
}

export default function GameUI({
  avatar,
  zone,
  playerName = "Thiếu Hiệp",
  level = 10,
  hp = 80,
  maxHp = 100,
  mp = 50,
  maxMp = 100,
}: GameUIProps) {
  return (
    <>
      {/* Avatar góc trái trên */}
      <div className="absolute top-4 left-4 flex items-center gap-3 bg-gray-900/80 p-2 rounded-xl shadow-md">
        <img src={avatar} className="w-12 h-12 rounded-full border-2 border-teal-400" />
        <div>
          <div className="text-white font-bold">{playerName} - Lv.{level}</div>
          <div className="w-40 h-3 bg-red-900 rounded-full overflow-hidden mb-1">
            <div className="bg-red-500 h-full" style={{ width: `${(hp / maxHp) * 100}%` }} />
          </div>
          <div className="w-40 h-3 bg-blue-900 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${(mp / maxMp) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Minimap góc phải */}
      <div className="absolute top-4 right-4 bg-gray-800 border border-yellow-500 rounded-md p-2 w-32 h-32">
        <div className="relative w-full h-full bg-black flex items-center justify-center text-yellow-300 text-sm">
          {zone}
        </div>
      </div>

      {/* Hotbar kỹ năng */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-gray-800/80 p-2 rounded-2xl shadow-inner border border-gray-600">
        {[1, 2, 3, 4, 5, 6].map((slot) => (
          <div
            key={slot}
            className="w-12 h-12 bg-gray-700 rounded-lg border border-yellow-400 flex items-center justify-center text-white text-lg"
          >
            {slot}
          </div>
        ))}
      </div>

      {/* Quest log/chat góc trái dưới */}
      <div className="absolute bottom-4 left-4 w-64 h-32 bg-black/70 rounded-lg p-2 text-sm text-white overflow-y-auto">
        <p>- Bạn đã đến khu vực <span className="text-yellow-300">{zone}</span></p>
        <p>- Gặp NPC để nhận nhiệm vụ.</p>
        <p>- Ấn <b>1-6</b> để dùng kỹ năng.</p>
      </div>

      {/* XP/Vàng */}
      <div className="absolute bottom-4 right-4 text-xs text-yellow-200 bg-gray-900/80 p-2 rounded-lg">
        <div>Vàng: 1234 lượng</div>
        <div>EXP: 78%</div>
      </div>
    </>
  );
}
