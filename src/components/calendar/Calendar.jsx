import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Cell } from "../cell/Cell";
import { ColorBlock } from "../colorBlock/ColorBlock";
import { startDay } from "../../utils";
import './style.css'
const url = "https://dpg.gg/test/calendar.json";
const weekDay = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];


export const Calendar = () => {
  const [data, setData] = useState(null);
  const [arrDates, setArrDates] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      const dates = arrayOfDates();
      setArrDates(dates);
    });
  }, []);

  const arrayOfDates = () => {
    const numberOfObjects = 357;
    const startDate = dayjs(startDay());
    const arrDates = [];

    for (let i = 0; i < numberOfObjects; i++) {
      const newDate = startDate.add(i, "day");
      const formattedDate = newDate.format("YYYY-MM-DD");

      arrDates.push({ date: formattedDate });
    }
    return arrDates;
  };
  return (
    <div>
      <div className="cells">
        {weekDay.map((item) => (
          <div className="week-day">{item}</div>
        ))}
        {data && arrDates.map((item) => <Cell data={data} item={item} />)}
      </div>
      <ColorBlock />
    </div>
  );
};
