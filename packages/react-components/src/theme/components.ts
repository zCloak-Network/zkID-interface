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

  // MuiAlert: {
  //   styleOverrides: {
  //     message: {
  //       padding: 0
  //     },
  //     root: {
  //       alignItems: 'center',
  //       padding: '0px 16px',
  //       height: '32px',
  //       borderRadius: '16px'
  //     },
  //     filledWarning: {
  //       background: 'linear-gradient(221deg, #E2702A 0%, #EBAD58 100%, #6C59E0 100%)'
  //     }
  //   }
  // },

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
