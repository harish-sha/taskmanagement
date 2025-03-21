import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';

const CalendarComponent = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
    </LocalizationProvider>
  );
};

export default CalendarComponent;
