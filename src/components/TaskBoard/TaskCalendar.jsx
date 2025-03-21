import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const TaskCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <Calendar onChange={setDate} value={date} />
      <p className="mt-2 text-sm text-gray-600">Selected: {date.toDateString()}</p>
    </div>
  );
};

export default TaskCalendar;