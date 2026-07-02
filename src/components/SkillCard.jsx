// =========================================
// FILE: SkillCard.jsx
// DESCRIPTION: A card component that displays a skill with flip animation.
// =========================================

import React, { useState } from "react";
import { THEME } from "../config/theme";

const SkillCard = ({ skill, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(true);

  // Theme shortcuts
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;

  // Handle the flip interaction
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group h-24 perspective-1000 cursor-pointer transition-transform duration-150 hover:scale-102 select-none"
      onClick={handleFlip}
    >
      {/* INNER CONTAINER */}
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE (Text) */}
        <div
          className={`absolute inset-0 backface-hidden flex items-center justify-center rounded-xl border font-bold text-lg ${cardBg} ${border}`}
        >
          {skill.name}
        </div>

        {/* BACK SIDE (Icon & Color) */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-xl ${skill.color} ${skill.text}`}
        >
          <skill.icon size={48} />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
