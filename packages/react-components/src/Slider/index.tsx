import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIosOutlined';
import { Box, IconButton } from '@mui/material';
import React, { useRef } from 'react';
import Slick, { Settings } from 'react-slick';

type Props = Settings;

const Wrapper = Slick;

const Slider: React.FC<Props> = ({ children, ...props }) => {
  const sliderRef = useRef<any>(null);

  return (
    <Wrapper
      ref={sliderRef}
      {...props}
      appendDots={(dots) => (
        <Box>
          <Box
            sx={{
              'button::before': {
                fontSize: '28px !important',
                opacity: '1 !important',
                color: '#D6D6D6 !important'
              },
              '.slick-active button::before': (theme) => ({
                color: `${theme.palette.primary.main} !important`
              })
            }}
          >
            {dots}
          </Box>
        </Box>
      )}
      nextArrow={
        <>
          <IconButton
            onClick={() => {
              sliderRef.current?.slickNext();
            }}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
              width: '40px',
              height: '40px',
              background: '#fff',
              color: '#999',
              border: '1px solid #CDD0D9',
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)',
              ':hover': {
                background: '#fff'
              }
            }}
          >
            <ArrowForwardIosOutlined />
          </IconButton>
        </>
      }
      prevArrow={
        <>
          <IconButton
            onClick={() => {
              sliderRef.current?.slickPrev();
            }}
            sx={{
              zIndex: 1,
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
              width: '40px',
              height: '40px',
              background: '#fff',
              color: '#999',
              border: '1px solid #CDD0D9',
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)',
              ':hover': {
                background: '#fff'
              }
            }}
          >
            <ArrowBackIosNewOutlined />
          </IconButton>
        </>
      }
    >
      {children}
    </Wrapper>
  );
};

export default React.memo<typeof Slider>(Slider);
