import React from 'react';

import Activities from './Activities';
import Banner from './Banner';
import Poaps from './Poaps';
import Proof from './Proof';

const Dashboard: React.FC = () => {
  return (
    <>
      <Banner />
      <Poaps />
      <Proof />
      <Activities />
    </>
  );
};

export default Dashboard;
