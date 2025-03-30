import { useEffect } from "react";

export default function usePetFollow(
  playerPos: { x: number; y: number },
  setPetPos: (pos: { x: number; y: number }) => void
) {
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
  }, [playerPos, setPetPos]);
}
