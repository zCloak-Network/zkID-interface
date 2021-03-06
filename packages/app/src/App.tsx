import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useEagerConnect } from '@zcloak/react-wallet';

import { metaMaskWallet } from '@zkid/app-config/wallets';
import Dashboard from '@zkid/page-dashboard';
import Home from '@zkid/page-home';
import Tutorial from '@zkid/page-tutorial';

import DashboardFrame from './DashboardFrame';
import TutorialFrame from './TutorialFrame';

const NoMatch: React.FC<{ to: string }> = ({ to }) => {
  return <Navigate replace to={to} />;
};

const App: React.FC = () => {
  useEagerConnect(metaMaskWallet);

  return (
    <HashRouter>
      <Routes>
        <Route element={<TutorialFrame />}>
          <Route element={<NoMatch to="/guide" />} path="tutorial" />
          <Route element={<Tutorial />} path="guide" />
          <Route element={<Home />} index />
        </Route>
        <Route element={<DashboardFrame />} path="dashboard">
          <Route element={<Dashboard />} index />
        </Route>
        <Route element={<NoMatch to="/" />} path="*" />
      </Routes>
    </HashRouter>
  );
};

export default React.memo(App);
