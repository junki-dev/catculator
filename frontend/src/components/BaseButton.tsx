import { Button } from '@mui/material';

interface BaseButtonProps {
  label: string;
  color: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function BaseButton({ label, color, disabled = false, onClick }: BaseButtonProps) {
  return (
    <Button sx={{ p: 1, width: '100%', color, fontWeight: 'bold' }} onClick={() => onClick()} disabled={disabled}>
      {label}
    </Button>
  );
}
