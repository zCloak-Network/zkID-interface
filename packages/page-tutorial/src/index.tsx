import styled from '@emotion/styled';
import { Did } from '@kiltprotocol/sdk-js';
import { Container, Step, StepLabel, Stepper } from '@mui/material';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { useEagerConnect, useWallet } from '@zcloak/react-wallet';
import { KiltProofs, Poap, SimpleAggregator } from '@zcloak/zkid-core';

import { ADMIN_ATTESTER_ADDRESS } from '@zkid/app-config/constants';
import {
  KiltProofsAdddress,
  PoapAdddress,
  SimpleAggregatorAddress
} from '@zkid/app-config/constants/address';
import { useFullDid, useLightDid, useLocalStorage } from '@zkid/react-hooks';

import { TUTORIAL_MNEMONIC } from './keys';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

const Wrapper = styled(Container)`
  padding: 52px 122px;
  margin-top: 12px;

  backdrop-filter: blur(8px) brightness(120%);
  border-radius: 12px;
  box-shadow: 0 0 20px rgb(34 13 13 / 42%);
`;

interface TutorialState {
  step: number;
  mnemonic?: string;
  keystore: Did.DemoKeystore;
  claimerLightDid?: Did.LightDidDetails;
  attesterFullDid?: Did.FullDidDetails | null;
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
  const [mnemonic, setMnemonic] = useLocalStorage<string>(TUTORIAL_MNEMONIC);

  const nextStep = useCallback(() => setStep(step + 1), [step]);
  const prevStep = useCallback(() => setStep(step - 1), [step]);
  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const claimerLightDid = useLightDid(keystore, mnemonic);
  const attesterFullDid = useFullDid(ADMIN_ATTESTER_ADDRESS);

  useEagerConnect();

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

  useEffect(() => {
    if (!mnemonic) {
      setMnemonic(mnemonicGenerate());
    }
  }, [mnemonic, setMnemonic]);

  return (
    <TutorialContext.Provider
      value={{
        step,
        mnemonic,
        keystore,
        kiltProofs,
        poap,
        simpleAggregator,
        claimerLightDid,
        attesterFullDid,
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
          <Step key={5}>
            <StepLabel />
          </Step>
        </Stepper>
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
        {step === 3 && <Step4 />}
        {step === 4 && <Step5 />}
        {step === 5 && <Step6 />}
      </Wrapper>
    </TutorialContext.Provider>
  );
};

export default Tutorial;
