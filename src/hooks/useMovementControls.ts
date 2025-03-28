import { useEffect } from "react";

export default function useMovementControls(
  setPlayerPos: (cb: (pos: { x: number; y: number }) => { x: number; y: number }) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayerPos((prev) => {
        const baseSpeed = 10;
        const speed = e.shiftKey ? baseSpeed * 2 : baseSpeed;
        switch (e.key) {
          case "ArrowUp":
            return { ...prev, y: prev.y - speed };
          case "ArrowDown":
            return { ...prev, y: prev.y + speed };
          case "ArrowLeft":
            return { ...prev, x: prev.x - speed };
          case "ArrowRight":
            return { ...prev, x: prev.x + speed };
          case " ":
            return { ...prev, y: prev.y - speed * 3 }; // jump
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setPlayerPos]);
}
