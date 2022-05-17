import { type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles';

import { createRoundedButton } from './createButton';

type Func = (mode: PaletteMode) => NonNullable<ThemeOptions['components']>;

/**
 * Style overrides for Material UI components.
 *
 * @see https://github.com/mui-org/material-ui/tree/master/packages/mui-material/src
 */
const createComponents: Func = () => ({
  MuiCssBaseline: {
    styleOverrides: `
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Kanit-Regular.ttf");
    }
    @font-face {
      font-family: "RobotoSlab";
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/RobotoSlab-Bold.ttf");
    }
    @font-face {
      font-family: "Roboto";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Roboto-Regular.ttf");
    }
    @font-face {
      font-family: "iconfont";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/iconfont.ttf");
    }
  `
  },

  MuiLink: {
    defaultProps: {
      underline: 'none'
    }
  },

  MuiInputLabel: {
    styleOverrides: {
      outlined: {
        position: 'relative',
        color: 'white',
        transform: 'none',
        marginBottom: '8px'
      },
      root: {
        '&.Mui-focused': {
          color: 'white'
        }
      }
    }
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
        '&.Mui-focused': {}
      },
      notchedOutline: {
        border: '1px solid rgba(255, 255, 255, 0.6)',
        ':hover': {}
      }
    }
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: 'red !important',
        borderRadius: '10px !important'
      },
      list: {
        background: '#D4CAFE',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '10px'
      }
    }
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        ':hover, &.Mui-selected,&.Mui-focusVisible': {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.6)'
          }
        }
      }
    }
  },

  MuiButtonBase: {
    styleOverrides: {
      root: {
        borderRadius: 10
      }
    }
  },

  MuiButton: {
    variants: [...createRoundedButton()],
    styleOverrides: {
      root: {
        borderRadius: 10
      },
      outlined: {
        borderRadius: 10,
        border: '1px solid #ba60f2',
        ':hover': {
          background: 'hsla(0,0%,100%,.7)'
        }
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        }
      },
      text: {
        ':hover': {
          background: '#F4F6FD'
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
  },

  MuiDialog: {
    styleOverrides: {
      root: {
        '.MuiDialogTitle-root': {
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 700,
          padding: '24px'
        }
      },
      paper: {
        borderRadius: '24px'
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {}
  }
});

export { createComponents };