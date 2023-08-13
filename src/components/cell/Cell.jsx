import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import "dayjs/locale/ru";
import { isMondayFunc } from "../../utils";
import './style.css'
export const Cell = ({ data, item }) => {
  dayjs.locale("ru");

  const [showPopup, setShowPopup] = useState(false);

  const [positionPopup, setpositionPopup] = useState(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const popupRef = useRef(null);

  const cellRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (cellRef.current && !cellRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (popupRef.current) {
      const { width } = popupRef.current.getBoundingClientRect();
      //для того чтобы стрелка popup стояла посерединие
      width && setpositionPopup(width / 2 - 6);
    }
  }, [showPopup]);

  const getColorByContributions = (contributions) => {
    if (contributions === 0 || !contributions) {
      return "color-1"; // Цвет для "Нет контрибуций"
    } else if (contributions >= 1 && contributions <= 9) {
      return "color-2"; // Цвет для "1-9 контрибуций"
    } else if (contributions >= 10 && contributions <= 19) {
      return "color-3"; // Цвет для "10-19 контрибуций"
    } else if (contributions >= 20 && contributions <= 29) {
      return "color-4"; // Цвет для "20-29 контрибуций"
    } else {
      return "color-5"; // Цвет для "30+ контрибуций"
    }
  };

  return (
    <div
      className={`cell ${showPopup && "cellSelected"} ${getColorByContributions(
        data[item.date]
      )}`}
      key={item.date}
      onClick={togglePopup}
      ref={cellRef}
    >
      {isMondayFunc(item.date) && (
        <div className="month">{isMondayFunc(item.date)}</div>
      )}

      <div
        className="popup"
        ref={popupRef}
        style={{
          left: `${-positionPopup}px`,
          visibility: showPopup ? "visible" : "hidden",
        }}
      >
        <div className="popup-arrow"> </div>
        <div className="popup-content">
          <div className="contribution">
            {data[item.date] ? data[item.date] : "Нет"} контрибуций
          </div>
          <div className="popup-date">
            {dayjs(item.date).format("dddd, MMMM D, YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
};
