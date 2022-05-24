import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React, { useCallback } from 'react';

const MoreLinks: React.FC = () => {
  const popupState = usePopupState({ variant: 'popper', popupId: 'MoreLinks-popup' });

  const handleItemClick = useCallback(
    (href: string) => {
      popupState.close();
      window.open(href, '_blank');
    },
    [popupState]
  );

  return (
    <>
      <IconButton
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.5)'
          }
        }}
        {...bindTrigger(popupState)}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={() => handleItemClick('https://zcloak.network')}>About</MenuItem>
        <MenuItem onClick={() => handleItemClick('https://discord.gg/3bzTAXS9Ys')}>
          Discord
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('https://twitter.com/zcloaknetwork')}>
          Twitter
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(MoreLinks);
