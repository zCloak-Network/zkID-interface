import CheckCircle from '@mui/icons-material/CheckCircle';
import CopyAll from '@mui/icons-material/CopyAll';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

import { useCopyClipboard } from '@zkid/react-hooks';

interface Props extends ButtonProps {
  toCopy: string;
}

const Copy: React.FC<Props> = ({ children, toCopy, ...props }) => {
  const [isCopied, setCopied] = useCopyClipboard();

  return (
    <Button
      onClick={() => setCopied(toCopy)}
      startIcon={isCopied ? <CheckCircle /> : <CopyAll />}
      {...props}
    >
      {isCopied ? 'Copied' : children}
    </Button>
  );
};

export default React.memo(Copy);
