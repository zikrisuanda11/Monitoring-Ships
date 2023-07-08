import React, { useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function jsDateToLocalISO8601DateString(date) {
  const year = String(date.getFullYear());
  const month = String(101 + date.getMonth()).substring(1);
  const day = String(100 + date.getDate()).substring(1);
  const hours = String(100 + date.getHours()).substring(1);
  const minutes = String(100 + date.getMinutes()).substring(1);
  const seconds = String(100 + date.getSeconds()).substring(1);
  const milliseconds = String(1000 + date.getMilliseconds()).substring(1);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}


function dateStringToLocalDate(s) {
  if (!s) return null;
  return new DateFnsUtils().parse(s, 'yyyy-MM-dd');
}

export default function Datetimepicker({ label, value, onChange }) {

  const handleChange = React.useCallback(date => {
    onChange(date ? jsDateToLocalISO8601DateString(date) : null);
    // onChange({ target: { value: date ? jsDateToLocalISO8601DateString(date) : null } });
  }, [onChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        defaultValue={value}
        // value={dateStringToLocalDate(value)}
        onChange={handleChange}
        sx={{
          width: '100%'
        }}
        slotProps={{ textField: { size: 'small' } }}
        format="dd-MM-yyyy HH:mm"
      />
    </LocalizationProvider>
  );
}