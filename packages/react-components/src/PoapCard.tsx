import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { hexDataSlice } from '@ethersproject/bytes';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
  nftId: BigNumberish;
  base?: string;
  ext?: string;
}

export function getLow128(value: BigNumberish) {
  return BigNumber.from(hexDataSlice(BigNumber.from(value).toHexString(), 16));
}

const PoapCard: React.FC<Props> = ({ base = 'images/poaps/', ext = 'webp', nftId }) => {
  const poapId = useMemo(() => BigNumber.from(nftId).shr(128).toString(), [nftId]);
  const imgName = useMemo(() => BigNumber.from(poapId).toString(), [poapId]);

  const imgPath = useMemo(() => `${base}/${imgName}.${ext}`, [base, ext, imgName]);

  const num = useMemo(() => {
    const _num = getLow128(nftId).toString();

    if (_num.length < 6) {
      return `${Array.from({ length: 6 - _num.length })
        .map(() => '0')
        .join('')}${_num}`;
    } else {
      return _num.slice(-6);
    }
  }, [nftId]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '288px',

        '>img': {
          display: 'block',
          width: '100%',
          imageRendering: '-webkit-optimize-contrast',
          userSelect: 'none'
        },
        '>span': {
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '12px',
          color: '#000',
          position: 'absolute',
          top: '256px',
          left: '82px',
          userSelect: 'none'
        }
      }}
    >
      <img src={imgPath} />
      <span>{num.toString()}</span>
    </Box>
  );
};

export default React.memo(PoapCard);
