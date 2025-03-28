import React, { useEffect } from "react";
import Pet from "@components/Pet";

export default function WorldPlayer({ petPos }: { petPos: { x: number; y: number } }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "b") {
        const bark = new Audio("/sounds/pet-bark.mp3");
        bark.play();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <Pet x={petPos.x} y={petPos.y} />;
}