import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  > img {
    margin-right: 14px;
  }
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Logo>
        <img src={require('@zkid/app-config/assets/logo.svg')} />
        zCloak Network
      </Logo>
    </Wrapper>
  );
};

export default React.memo(Header);
