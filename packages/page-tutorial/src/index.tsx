import styled from '@emotion/styled';
import { Container, Step, StepLabel, Stepper } from '@mui/material';
import React, { createContext, useCallback, useState } from 'react';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const Wrapper = styled(Container)`
  padding: 52px 172px;
  margin-top: 12px;

  backdrop-filter: blur(8px) brightness(120%);
  border-radius: 12px;
  box-shadow: 0 0 20px rgb(34 13 13 / 42%);
`;

interface TutorialState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

export const TutorialContext = createContext<TutorialState>({} as TutorialState);

const Tutorial: React.FC = () => {
  const [step, setStep] = useState(4);

  const nextStep = useCallback(() => setStep(step + 1), [step]);
  const prevStep = useCallback(() => setStep(step - 1), [step]);

  return (
    <TutorialContext.Provider value={{ step, nextStep, prevStep }}>
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
          <Step key={5}>
            <StepLabel />
          </Step>
        </Stepper>
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
        {step === 3 && <Step4 />}
        {step === 4 && <Step5 />}
      </Wrapper>
    </TutorialContext.Provider>
  );
};

export default Tutorial;
