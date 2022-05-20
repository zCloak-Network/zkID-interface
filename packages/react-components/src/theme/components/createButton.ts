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
    background: '#fff',
    boxShadow: '0px 3px 6px rgba(196, 203, 214, 0.1)',
    color: '#000',
    borderRadius: 50,
    '&:hover': {
      background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)',
      boxShadow: '0px 3px 6px rgba(51, 51, 51, 0.3)'
    }
  };

  return [
    {
      props: {
        variant: 'rounded',
        size: 'small'
      },
      style: {
        ...baseStyle,
        padding: '4px 10px'
      }
    },
    {
      props: {
        variant: 'rounded',
        size: 'medium'
      },
      style: {
        ...baseStyle,
        padding: '6px 16px'
      }
    },
    {
      props: {
        variant: 'rounded',
        size: 'large'
      },
      style: {
        ...baseStyle,
        padding: '8px 22px',
        fontSize: '0.9375rem'
      }
    }
  ];
}
