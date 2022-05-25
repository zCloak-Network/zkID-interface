import type { ICTypeSchema, MessageBody } from '@kiltprotocol/sdk-js';

import { Message } from '@kiltprotocol/sdk-js';
import { Box, Button, CircularProgress, Container, styled } from '@mui/material';
import FileSaver from 'file-saver';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { ATTESTER_DID, CTYPE } from '@zkid/app-config/constants';
import { CredentialContext } from '@zkid/react-components';
import { useClaim, useRequestForAttestation } from '@zkid/react-hooks';

import Contents from './components/Contents';
import Credential from './components/Credential';
import Readme from './components/Readme';
import SubmitClaim from './components/SubmitClaim';
import { JudgeStepContext } from './JudgeStep';

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  color: #fff;
  text-align: center;

  > h2 {
    margin-bottom: 12px;
    font-size: 30px;
  }

  > p {
    opacity: 0.8;
  }
`;

const Step2: React.FC = () => {
  const { nextStep } = useContext(JudgeStepContext);
  const { claimerLightDid, credential, keystore, ready } = useContext(CredentialContext);
  const [contents, setContents] = useState<any>();
  const [hasDownload, setHasDownload] = useState(false);

  const claim = useClaim(CTYPE as ICTypeSchema, contents, claimerLightDid?.did);
  const [requestForAttestation, retry] = useRequestForAttestation(keystore, claim, claimerLightDid);

  const message = useMemo(() => {
    if (requestForAttestation && claimerLightDid) {
      const messageBody: MessageBody = {
        content: { requestForAttestation },
        type: Message.BodyType.REQUEST_ATTESTATION
      };

      return new Message(messageBody, claimerLightDid.did, ATTESTER_DID);
    } else {
      return null;
    }
  }, [claimerLightDid, requestForAttestation]);

  const download = useCallback(() => {
    if (credential) {
      const blob = new Blob([JSON.stringify(credential)], {
        type: 'text/plain;charset=utf-8'
      });

      FileSaver.saveAs(blob, 'credential.json');

      setHasDownload(true);
    }
  }, [credential]);

  return (
    <Wrapper>
      <Readme />
      <h2>Describe Yourself</h2>
      <p>
        We have prepared a gift POAP for you. The POAP style varies by your age, class and
        equipment. To claim it, first describe yourself. Then submit.
      </p>
      {ready ? (
        <>
          {credential ? (
            <Credential credential={credential} />
          ) : (
            <Contents contentsChange={setContents} />
          )}
          {credential ? (
            <Box sx={{ display: 'flex' }}>
              <Button onClick={download} sx={{ mr: '44px' }} variant="rounded">
                Download
              </Button>
              <Button disabled={!hasDownload} onClick={nextStep} variant="rounded">
                Next
              </Button>
            </Box>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <SubmitClaim
                claimerLightDid={claimerLightDid}
                keystore={keystore}
                message={message}
                retry={retry}
              />
            </div>
          )}
        </>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Wrapper>
  );
};

export default React.memo(Step2);
