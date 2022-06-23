import { CircularProgress } from '@mui/material';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { KiltProofs, Poap, SimpleAggregator } from '@zcloak/contracts-core';
import { getRequestHash } from '@zcloak/contracts-core/utils';
import { useWallet } from '@zcloak/react-wallet';

import { ATTESTER_ADDRESS, CTYPE_HASH } from '@zkid/app-config/constants';
import {
  KiltProofsAdddress,
  PoapAdddress,
  SimpleAggregatorAddress
} from '@zkid/app-config/constants/address';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';
import { CredentialContext } from '@zkid/react-components';
import { useIsInitialState } from '@zkid/react-hooks';

import { decodeSs58Address, stringToHex } from './utils';
import { Wrapper } from '.';

interface JudgeStepState {
  step: number;
  kiltProofs: KiltProofs | null;
  poap: Poap | null;
  simpleAggregator: SimpleAggregator | null;
  exists: boolean;
  finished: boolean;
  nextStep: () => void;
  prevStep: () => void;
}

export const requestHash = getRequestHash({
  cType: CTYPE_HASH,
  programHash: ZK_PROGRAM.hash,
  fieldNames: ZK_PROGRAM.filed.split(',').map((it) => stringToHex(it)),
  attester: decodeSs58Address(ATTESTER_ADDRESS)
});

export const JudgeStepContext = createContext<JudgeStepState>({} as JudgeStepState);

const JudgeStep: React.FC<{ children: (step: number) => React.ReactNode }> = ({ children }) => {
  const { account, provider } = useWallet();
  const { credential, reset } = useContext(CredentialContext);
  const [step, setStep] = useState(0);
  const [exists, setExists, existsInitial] = useIsInitialState<boolean>(false);
  const [finished, setFinished, finishedInitial] = useIsInitialState<boolean>(false);
  const isMounted = useRef(true);

  const nextStep = useCallback(() => setStep(step + 1), [step]);
  const prevStep = useCallback(() => setStep(step - 1), [step]);

  const kiltProofs = useMemo(
    () => (provider ? new KiltProofs(KiltProofsAdddress, provider, account) : null),
    [account, provider]
  );

  const poap = useMemo(
    () => (provider ? new Poap(PoapAdddress, provider, account) : null),
    [account, provider]
  );

  const simpleAggregator = useMemo(
    () => (provider ? new SimpleAggregator(SimpleAggregatorAddress, provider, account) : null),
    [account, provider]
  );

  useEffect(() => {
    let unsub: (() => void) | null = null;

    if (account && kiltProofs) {
      kiltProofs
        .singleProofExists(account, requestHash, (exists) => {
          setExists(exists);
        })
        .then((_unsub) => (unsub = _unsub));
    }

    return () => {
      unsub?.();
    };
  }, [account, kiltProofs, setExists, simpleAggregator]);

  useEffect(() => {
    let unsub: (() => void) | null = null;

    if (account && simpleAggregator) {
      simpleAggregator
        .isFinished(account, requestHash, (finished) => {
          setFinished(finished);
        })
        .then((_unsub) => (unsub = _unsub));
    }

    return () => {
      unsub?.();
    };
  });

  useEffect(() => {
    if (existsInitial) {
      if (exists) {
        isMounted.current && setStep(3);
      } else if (credential) {
        isMounted.current && reset();
      }

      isMounted.current = false;
    }
  }, [credential, exists, existsInitial, reset]);

  return existsInitial && finishedInitial ? (
    <JudgeStepContext.Provider
      value={{
        step,
        kiltProofs,
        poap,
        simpleAggregator,
        exists,
        finished,
        nextStep,
        prevStep
      }}
    >
      {children(step)}
    </JudgeStepContext.Provider>
  ) : (
    <Wrapper disableGutters maxWidth="md" sx={{ textAlign: 'center' }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Wrapper>
  );
};

export default JudgeStep;
