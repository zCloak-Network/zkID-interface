import styled from '@emotion/styled';
import { Box, CircularProgress, Container } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable, NotificationContext, PoapCard } from '@zkid/react-components';
import { zkidApi } from '@zkid/service';

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
  const { account } = useWallet();
  const { poap } = useContext(TutorialContext);
  const { notifyError } = useContext(NotificationContext);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nftId, setNftId] = useState<string>();

  useEffect(() => {
    if (account) {
      zkidApi
        .getMintPoap({ who: account })
        .then(({ data }) => {
          if (data) {
            setNftId(data.nftId);
          } else {
            setNftId(undefined);
          }
        })
        .finally(() => setReady(true));
    }
  }, [account]);

  const claim = useCallback(() => {
    if (poap) {
      setLoading(true);
      poap
        .claim()
        .then((tx) => tx.wait())
        .then((receipt) => poap.getMintLog(receipt))
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
      {ready ? (
        <>
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
          {nftId ? (
            <ButtonEnable variant="rounded">Go to dashboard</ButtonEnable>
          ) : (
            <ButtonEnable loading={loading} onClick={claim} variant="rounded">
              Claim POAP
            </ButtonEnable>
          )}
        </>
      ) : (
        <Box>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Wrapper>
  );
};

export default React.memo(Step6);
