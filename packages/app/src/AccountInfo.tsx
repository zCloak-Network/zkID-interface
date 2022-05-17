import { Box } from '@mui/material';
import React, { useMemo } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { FormatBalance } from '@zkid/react-components';
import { useNativeBalance } from '@zkid/react-hooks';

interface Props {
  account: string;
}

const AccountInfo: React.FC<Props> = ({ account }) => {
  const { library } = useWallet();
  const accounst = useMemo(() => [account], [account]);
  const balances = useNativeBalance(accounst, library);

  const balance = useMemo(() => balances?.[0], [balances]);

  return (
    <Box>
      <FormatBalance value={balance} />
      <Box>0xfsdfs.fdsfsadf</Box>
    </Box>
  );
};

export default React.memo(AccountInfo);
