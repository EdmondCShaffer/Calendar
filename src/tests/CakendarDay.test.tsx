import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarDays, { CalendarDaysProps } from '../components/CalendarDays';

const currentDate = new Date('2024-06-13');

const defaultProps: CalendarDaysProps = {
  currentMonth: currentDate,
};

describe('CalendarDays Component', () => {
  it('renders days of the current month correctly', () => {
    const { getByText, queryByText } = render(
      <CalendarDays {...defaultProps} />
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('15')).toBeInTheDocument();
    expect(queryByText('31')).not.toBeInTheDocument();
  });

  it('selects the correct day and updates selectedDay', () => {
    const { getByText } = render(<CalendarDays {...defaultProps} />);

    const dayToClick = getByText('28');
    fireEvent.click(dayToClick);

    // Add further assertions as per your component's behavior
    const updatedSelectedDay = getByText('28').closest('.calendar-day');
    expect(updatedSelectedDay).toHaveClass('selected');
  });

  it('does not update selectedDay or call onDayClick for past dates', () => {
    const { getByText } = render(<CalendarDays {...defaultProps} />);

    const pastDayToClick = getByText('10');
    fireEvent.click(pastDayToClick);

    const updatedSelectedDay = getByText('10').closest('.calendar-day');
    expect(updatedSelectedDay).not.toHaveClass('selected');
  });

  it('renders today with "current-day" class', () => {
    const today = new Date();
    const { getByText } = render(<CalendarDays {...defaultProps} />);

    const todayElement = getByText(today.getDate().toString()).closest(
      '.calendar-day'
    );
    expect(todayElement).toHaveClass('current-day');
  });

  it('renders day with "past-day" class if before today', () => {
    const { getByText } = render(<CalendarDays {...defaultProps} />);

    const selectedDayElement = getByText('10').closest('.calendar-day');
    expect(selectedDayElement).toHaveClass('past-day');
  });

  it('todays day has "selected" class if it is today', () => {
    const today = new Date();
    const { getByText } = render(<CalendarDays {...defaultProps} />);

    const selectedDayElement = getByText(today.getDate().toString()).closest(
      '.calendar-day'
    );
    expect(selectedDayElement).toHaveClass('current-day');
  });
});
