import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ label, onChange, defaultValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}
      >
        <DatePicker label={label}
          slotProps={{ textField: { size: 'small' } }}
          sx={{
            width: '50%',
          }}
          format="DD-MM-YYYY"
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}