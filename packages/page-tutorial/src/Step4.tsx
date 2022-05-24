import styled from '@emotion/styled';
import { Box, Button, Container } from '@mui/material';
import React, { useContext, useState } from 'react';

import { BalancesContext } from '@zkid/react-components';

import Faucet from './components/Faucet';
import Verifing from './components/Verifing';
import ZkGenerator from './components/ZkGenerator';
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
  }

  > p {
    opacity: 0.8;
  }
`;

const ProofTrue: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        height: '149px',
        margin: '0 auto',
        marginY: '72px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '13px',
        '>img': {
          marginTop: '5px',
          marginLeft: '-50px'
        }
      }}
    >
      <img src="/images/pic_true.webp" />
      <span>Your proof is verified true, You can get an NFT</span>
    </Box>
  );
};

const Step4: React.FC = () => {
  const { balance } = useContext(BalancesContext);
  const { exists, nextStep } = useContext(JudgeStepContext);
  const [finished, setFinished] = useState(false);
  const [flag, setFlag] = useState(false);

  return (
    <Wrapper>
      <h2>Generate And Upload Proof</h2>
      <p>
        To claim your POAP, you first need to generate a STARK proof based on your credential in
        your zCloak ID Wallet then upload it.
      </p>
      {balance?.eq('0') ? (
        <Faucet />
      ) : (
        <>
          {finished && flag ? (
            <>
              <ProofTrue />
              <Button onClick={nextStep} variant="rounded">
                Next
              </Button>
            </>
          ) : exists ? (
            <>
              <Verifing setFinished={setFinished} />
              {finished && !flag && (
                <Button
                  onClick={() => {
                    setFlag(true);
                  }}
                  variant="rounded"
                >
                  Next
                </Button>
              )}
            </>
          ) : (
            <ZkGenerator />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default React.memo(Step4);
