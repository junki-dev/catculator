import { Box, Typography } from '@mui/material';

interface ResultBoxProps {
  amount: number;
}

export default function ResultBox({ amount }: ResultBoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '5rem',
        width: '25%',
        minWidth: '17rem',
        backgroundColor: '#B4AA99',
        borderRadius: 1,
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" color="text.secondary" align="center">
        {amount}g
      </Typography>
    </Box>
  );
}
