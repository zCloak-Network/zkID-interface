import React from 'react';

import { shortenAddress } from '@zcloak/zkid-core/utils';

interface Props {
  value?: string | null;
  isShorten?: boolean;
}

const Address: React.FC<Props> = ({ isShorten = true, value }) => {
  const address = value?.toString();

  return <>{isShorten ? shortenAddress(address) : address}</>;
};

export default React.memo(Address);
