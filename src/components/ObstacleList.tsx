import React from "react";
import type { Obstacle } from "@types";

interface Props {
  obstacles: Obstacle[];
}

export default function ObstacleList({ obstacles }: Props) {
  return (
    <>
      {obstacles.map((obj, i) => (
        <div
          key={i}
          className="absolute bg-gray-700 opacity-60 border border-white z-10"
          style={{ left: obj.x, top: obj.y, width: obj.width, height: obj.height }}
        />
      ))}
    </>
  );
}
