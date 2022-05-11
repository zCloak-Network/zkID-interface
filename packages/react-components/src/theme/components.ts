import { type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    rounded: true;
  }
}

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
    variants: [
      {
        props: { variant: 'rounded', size: 'medium' },
        style: {
          background: '#fff',
          boxShadow: '0px 3px 6px rgba(196, 203, 214, 0.1)',
          color: '#000',
          borderRadius: 20,
          '&:hover': {
            background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)',
            boxShadow: '0px 3px 6px rgba(51, 51, 51, 0.3)'
          }
        }
      }
    ],
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
  },

  MuiStepConnector: {
    styleOverrides: {
      root: {
        top: 16
      }
    }
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        width: 32,
        height: 32,
        color: 'rgba(255,255,255,0.26)',
        '&.Mui-active, &.Mui-completed': {
          color: '#fff',
          '.MuiStepIcon-text': {
            fill: '#000'
          }
        }
      },
      text: {
        fontWeight: 700
      }
    }
  }
});

export { createComponents };
