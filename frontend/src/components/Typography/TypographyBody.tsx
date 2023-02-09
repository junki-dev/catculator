/** @jsxImportSource @emotion/react */
import { css, Link, Typography } from '@mui/material';

interface TypographyBodyProps {
  icon: JSX.Element;
  label: string;
  uri: string;
}

export default function TypographyBody({ icon, label, uri }: TypographyBodyProps) {
  return (
    <Typography css={css({ margin: '1rem 0 0 0', height: '15px' })} variant="body2" color="#4F4537" align="center">
      {icon}
      {`${label} - `}
      <Link color="inherit" target="_blank" href={uri}>
        {uri}
      </Link>
    </Typography>
  );
}
