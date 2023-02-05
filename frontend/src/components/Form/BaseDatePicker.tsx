/** @jsxImportSource @emotion/react */
import { css } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface BaseDatePickerProps<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
}

export default function BaseDatePicker<T extends FieldValues>({ control, name, label }: BaseDatePickerProps<T>) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <Controller
        render={({ field: { onChange, value } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              renderInput={(params) => <TextField {...params} />}
              css={css({ width: '100%', background: '#ffedcb' })}
              value={value || ''}
              onChange={(date) => {
                onChange(date);
              }}
              maxDate={dayjs()}
              inputFormat={'YYYY-MM-DD'}
            />
          </LocalizationProvider>
        )}
        name={name}
        control={control}
      />
    </Box>
  );
}
