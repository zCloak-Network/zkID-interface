import { BigNumber } from '@ethersproject/bignumber';
import React, { useMemo } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { PoapCard, Slider } from '@zkid/react-components';
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
        .sort((l, r) => (l.lt(r) ? 1 : -1))
        .map((nftId) => nftId.toString());
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
        return BigNumber.from(poapId).shl(128).toString();
      });
    }
  }, [nftId]);

  return (
    <Slider dots={true} infinite={true} slidesToScroll={1} slidesToShow={4} speed={500}>
      {nftIds.map((nftId) => (
        <PoapCard key={nftId} nftId={nftId} />
      ))}
    </Slider>
  );
};

export default React.memo(Poaps);
