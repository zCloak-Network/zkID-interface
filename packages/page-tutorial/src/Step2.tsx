import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.div`
  color: #fff;
`;

const Step2: React.FC = () => {
  return (
    <Wrapper>
      <h2>Install extension</h2>
      <p>
        Your wallet is used to derive private keys, which are used to encrypt your data and sign
        private transactions.
      </p>
    </Wrapper>
  );
};

export default React.memo(Step2);
