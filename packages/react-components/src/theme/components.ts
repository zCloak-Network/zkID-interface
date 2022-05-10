import { type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles';

type Func = (mode: PaletteMode) => NonNullable<ThemeOptions['components']>;

/**
 * Style overrides for Material UI components.
 *
 * @see https://github.com/mui-org/material-ui/tree/master/packages/mui-material/src
 */
const createComponents: Func = () => ({
  MuiLink: {
    defaultProps: {
      underline: 'none'
    }
  },

  MuiTextField: {
    defaultProps: {
      InputLabelProps: { shrink: true }
    }
  },

  MuiButton: {
    styleOverrides: {
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        }
      }
    }
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: 'none'
      }
    }
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.125rem'
      }
    }
  }
});

export { createComponents };
