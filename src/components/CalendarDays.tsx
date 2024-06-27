import React, { useState, useEffect } from 'react';

interface CalendarDay {
  currentMonth: boolean;
  date: Date;
  number: number;
  selected: boolean;
}

export interface CalendarDaysProps {
  currentMonth: Date;
}

const CalendarDays: React.FC<CalendarDaysProps> = ({ currentMonth }) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [daysArray, setDaysArray] = useState<CalendarDay[]>([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDayClick = (day: Date) => {
    if (day >= today) {
      setSelectedDay(day);
    }
  };

  useEffect(() => {
    const getDaysArray = (currentMonth: Date): CalendarDay[] => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      return Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1);
        return {
          currentMonth: true,
          date,
          number: i + 1,
          selected: selectedDay
            ? date.toDateString() === selectedDay.toDateString()
            : false,
        };
      });
    };

    setDaysArray(getDaysArray(currentMonth));
  }, [currentMonth, selectedDay]);

  const firstDayOfWeek = daysArray.length > 0 ? daysArray[0].date.getDay() : 0;

  const emptySlots = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div key={`empty-${index}`} className="empty-day"></div>
  ));

  return (
    <div className="calendar-days">
      <div className="days-grid">
        {emptySlots}
        {daysArray.map((day) => (
          <div
            key={`${day.date.getFullYear()}-${day.date.getMonth()}-${
              day.number
            }`}
            className={`calendar-day 
                ${day.currentMonth ? 'current-month' : 'other-month'} 
                ${day.selected ? 'selected' : ''}
                ${day.date < today ? 'past-day' : ''}
                ${day.date.getTime() === today.getTime() ? 'current-day' : ''}`}
            onClick={() => handleDayClick(day.date)}
          >
            <p>{day.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDays;
