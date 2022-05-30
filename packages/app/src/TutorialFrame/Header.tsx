import { Box, Stack, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable } from '@zkid/react-components';

import AccountInfo from '../AccountInfo';
import MoreLinks from '../MoreLinks';
import NetworkCell from '../NetworkCell';

const Wrapper = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  padding: 0 30px;

  color: #fff;

  .ZkidHeader-right {
    position: absolute;
    right: 30px;
  }
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;

  font-size: 20px;
  font-weight: 700;

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
      <Stack className="ZkidHeader-right" direction="row" spacing={1}>
        {!account && (
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
        <NetworkCell />
        {account && (
          <>
            <AccountInfo account={account} />
          </>
        )}
        <MoreLinks />
      </Stack>
    </Wrapper>
  );
};

export default React.memo(Header);
