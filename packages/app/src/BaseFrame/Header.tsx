import { Box, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable } from '@zkid/react-components';

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;

  > img {
    margin-right: 14px;
  }
`;

const Header: React.FC = () => {
  const { account } = useWallet();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo onClick={() => navigate('/')}>
        <img src={require('@zkid/app-config/assets/logo.svg')} />
        zCloak Network
      </Logo>
      {account ? (
        <>account</>
      ) : (
        <ButtonEnable
          sx={{
            background: 'linear-gradient(221deg, #D7ADF8 0%, #A29CF3 100%, #6C59E0 100%)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            color: '#000',
            '&:hover': {
              background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)',
              color: '#fff'
            }
          }}
          variant="rounded"
        ></ButtonEnable>
      )}
    </Wrapper>
  );
};

export default React.memo(Header);
