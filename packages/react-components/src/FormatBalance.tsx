import { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
  decimals?: number;
  value?: BigNumberish | null;
  logo?: string;
  unit?: number;
  symbol?: string;
}

export const formatDisplay = (value: string, decimal = 3) => {
  if (value.includes('.')) {
    const [pre, suf] = value.split('.');

    return decimal === 0 ? pre : pre + '.' + suf.slice(0, decimal);
  } else {
    return value;
  }
};

const FormatBalance: React.FC<Props> = ({ decimals, logo, symbol, unit = 3, value }) => {
  const display = useMemo(() => {
    const _display = formatUnits((value ?? '0').toString(), decimals);

    return formatDisplay(_display, unit);
  }, [value, decimals, unit]);

  return (
    <Box alignItems="center" display="inline-flex" lineHeight={1}>
      {logo && (
        <Box
          component="img"
          src={logo}
          sx={{
            width: 20,
            height: 20,
            mr: 1
          }}
        />
      )}
      <Box className="FormatBalance-text" component="span">
        {display}
      </Box>
      {symbol && (
        <Box className="FormatBalance_symbol" component="span" ml={0.5}>
          &nbsp;
          {symbol.toUpperCase()}
        </Box>
      )}
    </Box>
  );
};

export default React.memo<typeof FormatBalance>(FormatBalance);
