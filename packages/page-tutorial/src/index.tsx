import styled from '@emotion/styled';
import { Container, Step, StepLabel, Stepper } from '@mui/material';
import React, { createContext, useCallback, useMemo, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { KiltProofs, Poap, SimpleAggregator } from '@zcloak/zkid-core';

import {
  KiltProofsAdddress,
  PoapAdddress,
  SimpleAggregatorAddress
} from '@zkid/app-config/constants/address';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const Wrapper = styled(Container)`
  padding: 52px 122px;
  margin-top: 12px;

  backdrop-filter: blur(8px) brightness(120%);
  border-radius: 12px;
  box-shadow: 0 0 20px rgb(34 13 13 / 42%);
`;

interface TutorialState {
  step: number;
  kiltProofs: KiltProofs | null;
  poap: Poap | null;
  simpleAggregator: SimpleAggregator | null;
  nextStep: () => void;
  prevStep: () => void;
}

export const TutorialContext = createContext<TutorialState>({} as TutorialState);

const Tutorial: React.FC = () => {
  const { account, library } = useWallet();
  const [step, setStep] = useState(0);

  const nextStep = useCallback(() => setStep(step + 1), [step]);
  const prevStep = useCallback(() => setStep(step - 1), [step]);

  const kiltProofs = useMemo(
    () => (library ? new KiltProofs(KiltProofsAdddress, library, account) : null),
    [account, library]
  );

  const poap = useMemo(
    () => (library ? new Poap(PoapAdddress, library, account) : null),
    [account, library]
  );

  const simpleAggregator = useMemo(
    () => (library ? new SimpleAggregator(SimpleAggregatorAddress, library, account) : null),
    [account, library]
  );

  return (
    <TutorialContext.Provider
      value={{
        step,
        kiltProofs,
        poap,
        simpleAggregator,
        nextStep,
        prevStep
      }}
    >
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
    </TutorialContext.Provider>
  );
};

export default Tutorial;
