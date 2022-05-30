import { ComponentsPropsList, Interpolation, Theme } from '@mui/material';

declare module '@mui/material/Button/Button' {
  interface ButtonPropsVariantOverrides {
    rounded: true;
  }
}

export function createRoundedButton(): {
  props: Partial<ComponentsPropsList['MuiButton']>;
  style: Interpolation<{ theme: Theme }>;
}[] {
  const baseStyle: Interpolation<{ theme: Theme }> = {
    minWidth: '128px',
    background: '#fff',
    boxShadow: '0px 3px 6px rgba(196, 203, 214, 0.1)',
    borderRadius: 50,
    '&:hover': {
      background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)',
      boxShadow: '0px 3px 6px rgba(51, 51, 51, 0.3)',
      color: '#fff'
    }
  };

  return [
    {
      props: {
        variant: 'rounded',
        size: 'small'
      },
      style: {
        ...baseStyle
      }
    },
    {
      props: {
        variant: 'rounded',
        size: 'medium'
      },
      style: {
        ...baseStyle
      }
    },
    {
      props: {
        variant: 'rounded',
        size: 'large'
      },
      style: {
        ...baseStyle
      }
    }
  ];
}
