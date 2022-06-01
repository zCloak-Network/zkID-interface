import { Box, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
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
  font-weight: 500;

  > img {
    margin-right: 14px;
  }
`;

const Header: React.FC = () => {
  const { account } = useWallet();
  const navigate = useNavigate();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Wrapper
      sx={{
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
          justifyContent: 'center'
        }
      }}
    >
      <Logo onClick={() => navigate('/')}>
        <img src={require('@zkid/app-config/assets/logo.svg')} />
        {upMd && 'zCloak Network'}
      </Logo>
      <Stack className="ZkidHeader-right" direction="row" spacing={1}>
        {!account && <ButtonEnable variant="rounded"></ButtonEnable>}
        {upSm && <NetworkCell />}
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
