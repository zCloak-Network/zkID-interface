import { type PaletteMode } from '@mui/material';
import { type PaletteOptions } from '@mui/material/styles';

/**
 * Customized Material UI color palette.
 *
 * @see https://mui.com/customization/palette/
 * @see https://mui.com/customization/default-theme/?expand-path=$.palette
 */
const createPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  primary: {
    main: '#6768ac'
  },
  background: {
    default: mode === 'light' ? 'rgba(255, 255, 255 ,1)' : '#121212'
  }
});

export { createPalette };
