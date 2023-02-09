/** @jsxImportSource @emotion/react */
import TypographyError from '../Typography/TypographyError';

import { Box, css, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

interface BaseSelectProps<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
  id: string;
  items: IMenuItem[];
  isRequired?: boolean;
  errors?: FieldError;
}

export interface IMenuItem {
  value: number;
  name: string;
}

export default function BaseSelect<T extends FieldValues>({
  control,
  name,
  label,
  id,
  items,
  isRequired = false,
  errors,
}: BaseSelectProps<T>) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="energy-requirement-select-label">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              required={isRequired}
              onChange={onChange}
              label={label}
              labelId={`base-select-${label}`}
              css={css({
                background: '#ffedcb',
                width: '100%',
              })}
              id={id}
            >
              <MenuItem value="">
                <em>—</em>
              </MenuItem>
              {items.map((item, idx) => (
                <MenuItem key={`base-select-item-${idx}-${item.value}`} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <TypographyError text={errors ? errors.message : ''} />
      </FormControl>
    </Box>
  );
}
