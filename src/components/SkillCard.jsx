import React, { useState } from "react";
import { THEME } from "../config/theme";

const SkillCard = ({ skill, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group h-32 perspective-1000 cursor-pointer select-none"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className={`absolute inset-0 backface-hidden flex items-center justify-center rounded-xl border font-bold text-lg shadow-sm ${cardBg} ${border}`}
        >
          {skill.name}
        </div>

        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-xl ${skill.color} ${skill.text} shadow-lg`}
        >
          <skill.icon size={48} />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
