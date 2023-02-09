/** @jsxImportSource @emotion/react */
import TypographyError from '../Typography/TypographyError';

import { Box, css, TextField } from '@mui/material';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

interface BaseTextFieldProps<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
  id: string;
  isRequired?: boolean;
  isFocus?: boolean;
  errors?: FieldError;
}

export default function BaseTextField<T extends FieldValues>({
  control,
  name,
  label,
  id,
  isRequired = false,
  isFocus = false,
  errors,
}: BaseTextFieldProps<T>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <TextField
              {...field}
              type="number"
              margin="normal"
              required={isRequired}
              fullWidth
              id={id}
              label={label}
              name={id}
              autoFocus={isFocus}
              css={css({ background: '#ffedcb', marginTop: 0 })}
            />
            <TypographyError text={errors ? errors.message : ''} />
          </>
        )}
      />
    </Box>
  );
}
