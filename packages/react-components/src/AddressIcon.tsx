import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

interface Props {
  value?: string | null;
  diameter?: number;
}

const AddressIcon: React.FC<Props> = ({ diameter = 20, value }) => {
  return (
    <Jazzicon
      diameter={diameter}
      seed={jsNumberForAddress(value || '0x0000000000000000000000000000000000000000')}
    />
  );
};

export default React.memo(AddressIcon);
