import { Box, Container, styled } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { Address, ButtonEnable } from '@zkid/react-components';
import { credentialApi } from '@zkid/service';
import { sleep } from '@zkid/service/utils';

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

const WalletContent = styled(Box)`
  align-items: center;
  background: hsla(0, 0%, 100%, 0.85);
  border-radius: 20px;
  box-shadow: 0 6px 58px rgb(121 127 173 / 20%);
  color: #333;
  display: flex;
  flex-direction: column;
  font-family: Kanit;
  font-size: 20px;
  font-weight: 400;
  height: 152px;
  justify-content: space-between;
  opacity: 1;
  padding: 22px 30px;
  margin: 44px 0 0;
`;

const Step4: React.FC = () => {
  const { nextStep } = useContext(TutorialContext);
  const { account } = useWallet();
  const [faucetSuccess, setFaucetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      credentialApi.faucetStatus({ address: account }).then(({ data: { status } }) => {
        if (status === 3) {
          setFaucetSuccess(true);
        } else {
          setFaucetSuccess(false);
        }
      });
    }
  }, [account]);

  const getToken = useCallback(async () => {
    if (account) {
      setLoading(true);
      const { code } = await credentialApi.faucet({ address: account });

      if (code === 200) {
        while (true) {
          await sleep(6000);
          const {
            data: { status }
          } = await credentialApi.faucetStatus({ address: account });

          if (status === 3) {
            break;
          }
        }
      }

      setFaucetSuccess(true);
      setLoading(false);
    }
  }, [account]);

  return (
    <Wrapper>
      <h2>Connect Metamask</h2>
      <p>BTW, get your fox friend ready. He will fetch your POAP for you.</p>
      <WalletContent>
        <img src={require('@zkid/app-config/assets/metamask.svg')} />
        <span>MetaMask</span>
      </WalletContent>
      <Box sx={{ fontSize: '18px', color: '#fff', marginTop: '16px', marginBottom: '58px' }}>
        {account && (
          <>
            <Address value={account} /> is connected.
          </>
        )}
      </Box>
      {faucetSuccess ? (
        <ButtonEnable onClick={nextStep} variant="rounded">
          Next
        </ButtonEnable>
      ) : (
        <ButtonEnable loading={loading} onClick={getToken} variant="rounded">
          Get token
        </ButtonEnable>
      )}
    </Wrapper>
  );
};

export default React.memo(Step4);
