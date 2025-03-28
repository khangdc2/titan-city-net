import { useEffect } from "react";

export default function useMovementControls(setPos: (pos: (prev: any) => any)) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const baseSpeed = 10;
      const speed = e.shiftKey ? baseSpeed * 2 : baseSpeed;
      setPos((prev) => {
        switch (e.key) {
          case "ArrowUp": return { ...prev, y: prev.y - speed };
          case "ArrowDown": return { ...prev, y: prev.y + speed };
          case "ArrowLeft": return { ...prev, x: prev.x - speed };
          case "ArrowRight": return { ...prev, x: prev.x + speed };
          case " ": return { ...prev, y: prev.y - speed * 3 };
          default: return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setPos]);
}
