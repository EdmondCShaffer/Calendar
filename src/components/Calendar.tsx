import React, { useState } from 'react';
import CalendarDays from './CalendarDays';

const Calendar: React.FC = () => {
  const months: Array<string> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const DaysOfTheWeek: Array<string> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  return (
    <div className="calendar-container">
      <div className="header-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>{'<'}</button>
          <h2>
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button onClick={nextMonth}>{'>'}</button>
        </div>
        <div className="weekdays">
          {DaysOfTheWeek.map((weekday, index) => (
            <div key={index} className="weekday">
              {weekday}
            </div>
          ))}
        </div>
      </div>
      <CalendarDays currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
