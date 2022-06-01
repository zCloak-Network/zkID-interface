import styled from '@emotion/styled';
import { Container, Step, StepLabel, Stepper, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import JudgeStep from './JudgeStep';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export const Wrapper = styled(Container)<{ downSm?: boolean; downMd?: boolean }>(
  ({ downMd, downSm }) => `
  padding: ${downSm ? 0 : downMd ? '44px 16px' : '52px 122px'};
  margin-top: ${downSm ? '64px' : '44px'};

  backdrop-filter: ${downSm ? 'none' : 'blur(50px) brightness(130%)'};
  border-radius: ${downSm ? 0 : '12px'};
  box-shadow: ${downSm ? 'none' : '0px 0px 20px rgba(34, 13, 13, 0.42)'};
`
);

const Tutorial: React.FC = () => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <JudgeStep>
      {(step) => (
        <Wrapper disableGutters downMd={downMd} downSm={downSm} maxWidth={downMd ? 'sm' : 'md'}>
          <Stepper activeStep={step} alternativeLabel>
            <Step key={0}>
              <StepLabel />
            </Step>
            <Step key={1}>
              <StepLabel />
            </Step>
            <Step key={2}>
              <StepLabel />
            </Step>
            <Step key={3}>
              <StepLabel />
            </Step>
            <Step key={4}>
              <StepLabel />
            </Step>
          </Stepper>
          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}
          {step === 3 && <Step4 />}
          {step === 4 && <Step5 />}
        </Wrapper>
      )}
    </JudgeStep>
  );
};

export default Tutorial;
