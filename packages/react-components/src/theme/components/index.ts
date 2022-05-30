import { type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/Button/Button' {
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
    * {
      box-sizing: border-box;
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 100;
      src: url("/fonts/Kanit-Thin.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 100;
      src: url("/fonts/Kanit-ThinItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 200;
      src: url("/fonts/Kanit-ExtraLight.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 200;
      src: url("/fonts/Kanit-ExtraLightItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 300;
      src: url("/fonts/Kanit-Light.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 300;
      src: url("/fonts/Kanit-LightItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Kanit-Regular.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Kanit-Italic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 500;
      src: url("/fonts/Kanit-Medium.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 500;
      src: url("/fonts/Kanit-MediumItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 600;
      src: url("/fonts/Kanit-SemiBold.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 600;
      src: url("/fonts/Kanit-SemiBoldItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/Kanit-Bold.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/Kanit-BoldItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 800;
      src: url("/fonts/Kanit-ExtraBold.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 800;
      src: url("/fonts/Kanit-ExtraBoldItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 900;
      src: url("/fonts/Kanit-Black.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 900;
      src: url("/fonts/Kanit-BlackItalic.ttf");
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
      font-family: "Papyrus";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/PapyrusStd.OTF");
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
        borderRadius: '10px !important'
      },
      list: {
        paddingLeft: 4,
        paddingRight: 4,
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
          backgroundColor: '#EAECF2',
          ':hover': {
            backgroundColor: '#EAECF2'
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
        props: {
          variant: 'rounded'
        },
        style: {
          minWidth: '128px',
          background: '#fff',
          boxShadow: '0px 3px 6px rgba(196, 203, 214, 0.1)',
          borderRadius: 50,
          color: '#000',
          ':hover': {
            background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)',
            boxShadow: '0px 3px 6px rgba(51, 51, 51, 0.3)',
            color: '#fff'
          }
        }
      }
    ],
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: 'initial',
        transition:
          'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
      },
      outlined: {
        borderRadius: 10,
        border: '1px solid #ba60f2',
        boxShadow: '0px 3px 6px rgba(102, 102, 102, 0.4)',
        background: 'rgba(255, 255, 255, 0.3)',
        color: '#BA60F2',
        ':hover': {
          background: 'rgba(255, 255, 255, 0.7)'
        }
      },
      contained: ({ theme }) => ({
        color: '#fff',
        ':hover': {
          background: `${theme.palette.primary.main}`
        }
      }),
      sizeSmall: {
        padding: '4px 10px'
      },
      sizeMedium: {
        padding: '6px 16px'
      },
      sizeLarge: {
        padding: '8px 22px',
        fontSize: '0.9375rem'
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
      root: ({ theme: { spacing } }) => ({
        '.MuiDialogTitle-root': {
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 700,
          padding: spacing(3)
        }
      }),
      paper: {
        borderRadius: '24px'
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme: { spacing } }) => ({
        padding: spacing(3)
      })
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme: { spacing } }) => ({
        padding: spacing(3),
        paddingTop: 0
      })
    }
  },

  MuiTableRow: {
    styleOverrides: {
      root: {
        '&.MuiTableRow-hover:hover': {
          backgroundColor: '#E5E7ED'
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: () => ({
        '&:nth-of-type(1)': {
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px'
        },
        '&:nth-last-of-type(1)': {
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px'
        },
        borderBottom: 'none',
        color: '#000',
        fontWeight: 700
      }),
      head: ({ theme }) => ({
        borderBottom: '1px solid #E5E7ED',
        color: theme.palette.grey[700]
      })
    }
  }
});

export { createComponents };
