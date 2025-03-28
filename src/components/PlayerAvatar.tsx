import React from "react";

interface PlayerAvatarProps {
  avatar: string;
  x: number;
  y: number;
}

export default function PlayerAvatar({ avatar, x, y }: PlayerAvatarProps) {
  return (
    <div
      style={{ position: "absolute", top: y, left: x }}
      className="z-20"
    >
      <img
        src={avatar}
        className="w-16 h-16 rounded-full border-4 border-teal-400 animate-pulse"
        alt="Player"
      />
    </div>
  );
}
