import styled from '@emotion/styled';
import { Box, CircularProgress, Container } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallet } from '@zcloak/react-wallet';

import {
  BalancesContext,
  ButtonEnable,
  NotificationContext,
  PoapCard
} from '@zkid/react-components';
import { zkidApi } from '@zkid/service';

import { JudgeStepContext } from './JudgeStep';

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
    font-weight: 500;
  }

  > p {
    opacity: 0.8;
  }
`;

const Step5: React.FC = () => {
  const { account, chainId } = useWallet();
  const { poap } = useContext(JudgeStepContext);
  const { notifyError, notifyTx } = useContext(NotificationContext);
  const { setPoapId } = useContext(BalancesContext);
  const navigate = useNavigate();
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
        .then((tx) => {
          chainId && notifyTx(tx, chainId);

          return tx.wait();
        })
        .then((receipt) => poap.getMintLog(receipt))
        .then((mintLog) => {
          if (mintLog) {
            setNftId(mintLog.nftId.toString());
            setPoapId(mintLog.nftId.toString());
          }

          return mintLog;
        })
        .catch(notifyError)
        .finally(() => setLoading(false));
    }
  }, [chainId, notifyError, notifyTx, poap, setPoapId]);

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
            <ButtonEnable onClick={() => navigate('/dashboard')} variant="rounded">
              Go to dashboard
            </ButtonEnable>
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

export default React.memo(Step5);
