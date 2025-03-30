import { useEffect, useState } from "react";

export default function useSkillPanelToggle(): [boolean, () => void] {
  const [showSkillPanel, setShowSkillPanel] = useState(false);

  const toggleSkillPanel = () => {
    setShowSkillPanel((prev) => !prev);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k") {
        toggleSkillPanel();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return [showSkillPanel, toggleSkillPanel];
}
