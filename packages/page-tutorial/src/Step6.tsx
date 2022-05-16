import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { ButtonEnable, NotificationContext, PoapCard } from '@zkid/react-components';

import { TutorialContext } from '.';

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  color: #fff;
  text-align: center;

  > h2 {
    margin-bottom: 12px;
    font-size: 30px;
  }

  > p {
    opacity: 0.8;
  }
`;

const Step6: React.FC = () => {
  const { poap } = useContext(TutorialContext);
  const { notifyError } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [nftId, setNftId] = useState<string>();

  const claim = useCallback(() => {
    if (poap) {
      setLoading(true);
      poap
        .claim()
        .then((tx) => tx.wait())
        .then(poap.getMintLog)
        .then((mintLog) => {
          if (mintLog) {
            setNftId(mintLog.nftId.toString());
          }

          return mintLog;
        })
        .catch(notifyError)
        .finally(() => setLoading(false));
    }
  }, [notifyError, poap]);

  return (
    <Wrapper>
      <h2>Claim Your POAP</h2>
      <p>Claim your POAP and enjoy your stay in zCloak Kingdom.</p>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginY: '44px'
        }}
      >
        {nftId ? (
          <PoapCard nftId={nftId} />
        ) : (
          <img src="/images/nft_cover.webp" style={{ width: 200 }} />
        )}
      </Box>
      <ButtonEnable loading={loading} onClick={claim} variant="rounded">
        Claim POAP
      </ButtonEnable>
    </Wrapper>
  );
};

export default React.memo(Step6);
