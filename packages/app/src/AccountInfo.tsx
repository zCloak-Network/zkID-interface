import { Box } from '@mui/material';
import React, { useMemo } from 'react';

import { Address, FormatBalance } from '@zkid/react-components';
import { useEndpoint, useNativeBalance } from '@zkid/react-hooks';

interface Props {
  account: string;
}

const AccountInfo: React.FC<Props> = ({ account }) => {
  const accounst = useMemo(() => [account], [account]);
  const balances = useNativeBalance(accounst);
  const endpoint = useEndpoint();

  const balance = useMemo(() => balances?.[0], [balances]);

  return (
    <Box>
      <FormatBalance symbol={endpoint?.currencySymbol} value={balance} />
      <Box>
        <Address value={account} />
      </Box>
    </Box>
  );
};

export default React.memo(AccountInfo);
