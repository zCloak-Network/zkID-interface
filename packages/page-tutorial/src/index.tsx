import styled from '@emotion/styled';
import { Container, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

import JudgeStep from './JudgeStep';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export const Wrapper = styled(Container)`
  padding: 52px 122px;
  margin-top: 12px;

  backdrop-filter: blur(8px) brightness(120%);
  border-radius: 12px;
  box-shadow: 0 0 20px rgb(34 13 13 / 42%);
`;

const Tutorial: React.FC = () => {
  return (
    <JudgeStep>
      {(step) => (
        <Wrapper disableGutters maxWidth="md">
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
