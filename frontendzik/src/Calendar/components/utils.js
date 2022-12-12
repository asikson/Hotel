import { DAYS } from "./const";

//metoda genetująca dni miesiąca
export const range = (end) => {

    const { result } = Array.from({ length: end }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1
      }),
      { result: [], current: 1 }
    );
    return result;

  };

//metoda generująca miesiące
export const getDaysInMonth = (month, year) =>{

  return new Date(year, month + 1, 0).getDate();

};  


//metoda sortująca dni w miesiącu
export const getSortedDays = (month, year) => {

  const dayIndex = new Date(year, month, 0).getDay()

  return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];

};

export const getDateObject = (day, month, year) => {

  return new Date(year, month, day);

};

export const areDatesTheSame = (first, second) => {

  return (
    first.getFullYear() === second.getFullYear() && 
    first.getMonth() === second.getMonth() && 
    first.getDate() === second.getDate()
  );
};

