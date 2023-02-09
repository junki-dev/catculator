/** @jsxImportSource @emotion/react */
import { css, Typography } from '@mui/material';

interface TypographyErrorProps {
  text?: string;
}

export default function TypographyError({ text }: TypographyErrorProps) {
  return <Typography css={css({ color: 'red', fontSize: '0.8rem' })}>{text}</Typography>;
}
