import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '@zkid/page-home';
import Tutorial from '@zkid/page-tutorial';

import BaseFrame from './BaseFrame';

const NoMatch: React.FC<{ to: string }> = ({ to }) => {
  return <Navigate replace to={to} />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<BaseFrame />}>
          <Route element={<Tutorial />} path="tutorial" />
          <Route element={<Home />} index />
        </Route>
        <Route element={<NoMatch to="/" />} path="*" />
      </Routes>
    </HashRouter>
  );
};

export default React.memo(App);
