import { Container, styled } from '@mui/material';
import React, { useContext } from 'react';

import { CredentialContext } from '@zkid/react-components';

import Contents from './components/Contents';
import Credential from './components/Credential';
import Readme from './components/Readme';

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

const Step2: React.FC = () => {
  const { credential, verified } = useContext(CredentialContext);

  return (
    <Wrapper>
      <Readme />
      <h2>Describe Yourself</h2>
      <p>
        We have prepared a gift POAP for you. The POAP style varies by your age, class and
        equipment. To claim it, first describe yourself. Then submit.
      </p>
      {credential && verified ? <Credential credential={credential} /> : <Contents />}
    </Wrapper>
  );
};

export default React.memo(Step2);
