import dayjs from "dayjs";

export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const isMondayFunc = (inputDate) => {
    const date = dayjs(inputDate);
  
    const firstDayOfMonth = date.startOf("month");
    const dayOfWeek = firstDayOfMonth.day(); // День недели для первого дня месяца (0 - воскресенье, 1 - понедельник, ...)
  
    let daysToAdd = 1 - dayOfWeek; // Количество дней, которые нужно добавить к первому дню месяца, чтобы получить понедельник
    if (daysToAdd < 0) {
      daysToAdd += 7; // Если первый день месяца не воскресенье, добавляем 7 дней для перехода на понедельник следующей недели
    }
  
    const firstMonday = firstDayOfMonth.add(daysToAdd, "day");
  
    return inputDate === firstMonday.format("YYYY-MM-DD")
      ?  capitalizeFirstLetter(firstMonday.format("MMMM"))
      : null;
  };

  export const startDay = () => {
    const startDate = dayjs();

    const newDate = startDate.subtract(50, "week");

    // Коррекция на начальный день недели (понедельник)
    const daysToSubtractForCorrection = (newDate.day() + 6) % 7;
    const correctedDate = newDate.subtract(daysToSubtractForCorrection, "day");

    return correctedDate.format("YYYY-MM-DD");
  };

