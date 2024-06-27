import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar';
import '@testing-library/jest-dom';

describe('Calendar Component', () => {
  it('renders weekdays correctly', () => {
    const { getAllByText } = render(<Calendar />);
    expect(getAllByText('S').length).toBe(2);
    expect(getAllByText('M').length).toBe(1);
    expect(getAllByText('T').length).toBe(2);
    expect(getAllByText('W').length).toBe(1);
  });

  test('renders calendar header and CalendarDays component correctly', () => {
    const { getByText } = render(<Calendar />);

    expect(getByText('Jun 2024')).toBeInTheDocument();
    expect(getByText('<')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
  });

  test('clicking next and previous buttons updates current month', () => {
    const { getByText } = render(<Calendar />);

    fireEvent.click(getByText('>'));
    expect(
      getByText((content, element) => {
        return (
          element?.textContent === 'Jul 2024' &&
          element.tagName.toLowerCase() === 'h2'
        );
      })
    ).toBeInTheDocument();

    fireEvent.click(getByText('<'));
    expect(
      getByText((content, element) => {
        return (
          element?.textContent === 'Jun 2024' &&
          element.tagName.toLowerCase() === 'h2'
        );
      })
    ).toBeInTheDocument();
  });
});
