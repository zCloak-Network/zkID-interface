import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { ButtonEnable, NotificationContext } from '@zkid/react-components';

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

  > img {
    display: block;
    width: 200px;
    margin: 44px auto;
  }
`;

const Step6: React.FC = () => {
  const { poap } = useContext(TutorialContext);
  const { notifyError } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const claim = useCallback(() => {
    if (poap) {
      setLoading(true);
      poap
        .claim()
        .then((tx) => tx.wait())
        .catch(notifyError)
        .finally(() => setLoading(false));
    }
  }, [notifyError, poap]);

  return (
    <Wrapper>
      <h2>Claim Your POAP</h2>
      <p>Claim your POAP and enjoy your stay in zCloak Kingdom.</p>
      <img src="/images/nft_cover.png" />
      <ButtonEnable loading={loading} onClick={claim} variant="rounded">
        Claim POAP
      </ButtonEnable>
    </Wrapper>
  );
};

export default React.memo(Step6);
