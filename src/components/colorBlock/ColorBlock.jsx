import React, { useState } from "react";
import './style.css'
export const ColorBlock = () => {
  const colorsData = [
    { text: "Нет контрибуций", color: "color-1" },
    { text: "1-9 контрибуций", color: "color-2" },
    { text: "10-19 контрибуций", color: "color-3" },
    { text: "20-29 контрибуций", color: "color-4" },
    { text: "30+ контрибуций", color: "color-5" },
  ];

  const [activePopupIndex, setActivePopupIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActivePopupIndex(index);
  };

  const handleMouseLeave = () => {
    setActivePopupIndex(null);
  };

  return (
    <div className="colors-block">
      <div>Меньше</div>
      {colorsData.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className={`color-block ${item.color}`}
        >
          {activePopupIndex === index && <div className="color-popup">{item.text}</div>}
        </div>
      ))}
      <div>Больше</div>
    </div>
  );
};