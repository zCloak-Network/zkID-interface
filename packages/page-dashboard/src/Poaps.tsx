import { BigNumber } from '@ethersproject/bignumber';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { PoapCard, Slider } from '@zkid/react-components';
import { getLow128 } from '@zkid/react-components/PoapCard';
import { useAccountPoap } from '@zkid/react-hooks';

const Poaps: React.FC = () => {
  const { account } = useWallet();
  const nftId = useAccountPoap(account);

  const nftIds = useMemo(() => {
    if (nftId) {
      return [
        '40522552889507486262027357734207559572',
        '42018931746397126175492143712451320807',
        '125185194153452917765631924411805583030',
        '142084376254405164571847791340268850858',
        '150098118728916422961885807481892654353',
        '200131628285890828369532065092663508412',
        '202100964360959351678140981251573392558',
        '219435727696893656932292705285121930827'
      ]
        .map((poapId) => {
          if (BigNumber.from(nftId).shr(128).eq(poapId)) {
            return BigNumber.from(nftId);
          } else {
            return BigNumber.from(poapId).shl(128);
          }
        })
        .sort((l, r) => (getLow128(l).lt(getLow128(r)) ? 1 : -1))
        .map((nftId) => nftId.toHexString());
    } else {
      return [
        '40522552889507486262027357734207559572',
        '42018931746397126175492143712451320807',
        '125185194153452917765631924411805583030',
        '142084376254405164571847791340268850858',
        '150098118728916422961885807481892654353',
        '200131628285890828369532065092663508412',
        '202100964360959351678140981251573392558',
        '219435727696893656932292705285121930827'
      ].map((poapId) => {
        return BigNumber.from(poapId).shl(128).toHexString();
      });
    }
  }, [nftId]);

  return (
    <Box sx={{ mb: 10 }}>
      <h2>POAP</h2>
      <Slider dots={true} infinite={true} slidesToScroll={1} slidesToShow={4} speed={500}>
        {nftIds.map((nftId) => (
          <PoapCard key={nftId} nftId={nftId} />
        ))}
      </Slider>
    </Box>
  );
};

export default React.memo(Poaps);
