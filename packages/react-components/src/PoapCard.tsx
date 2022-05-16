import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { hexDataSlice } from '@ethersproject/bytes';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
  nftId: BigNumberish;
  base?: string;
  ext?: string;
}

const PoapCard: React.FC<Props> = ({ base = '/images/poaps/', ext = 'webp', nftId }) => {
  const poapId = useMemo(() => BigNumber.from(nftId).shr(128).toString(), [nftId]);
  const imgName = useMemo(() => BigNumber.from(poapId).toString(), [poapId]);

  const imgPath = useMemo(() => `${base}/${imgName}.${ext}`, [base, ext, imgName]);

  const num = useMemo(
    () => hexDataSlice(BigNumber.from(nftId).toHexString(), 16).slice(-6),
    [nftId]
  );

  console.log(num);

  return (
    <Box
      sx={{
        position: 'relative',
        '>img': {
          width: '248px',
          height: '336px',
          marginBottom: '20px',
          imageRendering: '-webkit-optimize-contrast',
          userSelect: 'none'
        },
        '>span': {
          fontSize: '12px',
          fontFamily: 'Kanit',
          fontWeight: '600',
          lineHeight: '12px',
          color: '#000000',
          position: 'absolute',
          bottom: '137px',
          left: '70px',
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
