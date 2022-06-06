import { Box, Link, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Link as LinkRoute, useNavigate } from 'react-router-dom';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable } from '@zkid/react-components';
import { useQueryParam } from '@zkid/react-hooks';

import AccountInfo from '../AccountInfo';
import MoreLinks from '../MoreLinks';
import NetworkCell from '../NetworkCell';

const Wrapper = styled(Box)`
  z-index: 10;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 30px;

  background-color: #f4f5fc;
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
`;

const ActiveLink: React.FC<React.PropsWithChildren<{ to: string; active: string }>> = ({
  active,
  children,
  to
}) => {
  const [param] = useQueryParam<string>('anchor');

  return (
    <Link
      component={LinkRoute}
      sx={(theme) => ({
        textDecoration: active === param ? 'underline' : undefined,
        color: active === param ? theme.palette.grey[600] : '#000'
      })}
      to={to}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const { account } = useWallet();
  const navigate = useNavigate();
  const [param] = useQueryParam<string>('anchor');
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (param) {
      document.getElementById(param)?.scrollIntoView();
    }
  }, [param]);

  return (
    <Wrapper>
      <Stack alignItems="center" direction="row" spacing={10}>
        <Logo onClick={() => navigate('/')}>
          <img src={require('@zkid/app-config/assets/logo-black.svg')} />
        </Logo>
        {upLg && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={4}
            sx={{
              '.MuiLink-root': {
                textUnderlineOffset: 6
              }
            }}
          >
            <ActiveLink active="dashboard" to="/dashboard?anchor=dashboard">
              Dashboard
            </ActiveLink>
            <ActiveLink active="dashboard-poap" to="/dashboard?anchor=dashboard-poap">
              POAP
            </ActiveLink>
            <ActiveLink active="dashboard-proof" to="/dashboard?anchor=dashboard-proof">
              Proof
            </ActiveLink>
            <ActiveLink active="dashboard-activities" to="/dashboard?anchor=dashboard-activities">
              Activities
            </ActiveLink>
          </Stack>
        )}
      </Stack>
      <Stack
        className="ZkidHeader-right"
        direction="row"
        spacing={1}
        sx={{
          '.ZkidNetworkCell': {
            background: 'rgba(103, 104, 172, 0.2)',
            ':hover': {
              background: 'rgba(103, 104, 172, 0.2)'
            }
          },
          '.ZkidAccountInfo': {
            background: '#fff'
          },
          '.ZkidAccountInfo .ZkidAccountInfo-address': {
            background: '#fff'
          }
        }}
      >
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
