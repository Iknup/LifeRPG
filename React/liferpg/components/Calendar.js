const Calendar = dynamic(() => import('react-calendar'), { ssr: false });
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className="w-fit bg-primary">
      <h1>Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="bg-primary w-full h-full p-4"
      />
    </div>
  );
};

export default MyCalendar;
