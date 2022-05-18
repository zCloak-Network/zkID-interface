import { Button } from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { ZkidExtensionContext } from '@zkid/react-components';

const CreatePassword: React.FC = () => {
  const { zkidExtension } = useContext(ZkidExtensionContext);

  const handleClick = useCallback(() => {
    zkidExtension.openzkIDPopup('OPEN_FIRST', undefined);
  }, [zkidExtension]);

  return (
    <Button onClick={handleClick} variant="rounded">
      Create password
    </Button>
  );
};

export default React.memo(CreatePassword);
