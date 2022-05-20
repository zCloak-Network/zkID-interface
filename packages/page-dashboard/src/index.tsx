import React from 'react';

import Activities from './Activities';
import Poaps from './Poaps';
import Proof from './Proof';

const Dashboard: React.FC = () => {
  return (
    <>
      <Poaps />
      <Proof />
      <Activities />
    </>
  );
};

export default Dashboard;
