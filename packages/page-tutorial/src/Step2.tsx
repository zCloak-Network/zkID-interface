import type { ICTypeSchema, IMessage, MessageBody } from '@kiltprotocol/sdk-js';

import { Did, Message } from '@kiltprotocol/sdk-js';
import { Box, Button, CircularProgress, Container, styled } from '@mui/material';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import FileSaver from 'file-saver';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ADMIN_ATTESTER_ADDRESS, CTYPE } from '@zkid/app-config/constants';
import {
  useClaim,
  useFullDid,
  useLightDid,
  useLocalStorage,
  useRequestForAttestation
} from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service/Api';

import Contents from './components/Contents';
import Credential from './components/Credential';
import SubmitClaim from './components/SubmitClaim';
import { TUTORIAL_MNEMONIC } from './keys';
import { TutorialContext } from '.';

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
  const { nextStep } = useContext(TutorialContext);
  const [ready, setReady] = useState(false);
  const [mnemonic, setMnemonic] = useLocalStorage<string>(TUTORIAL_MNEMONIC);
  const [credential, setCredential] = useState<IMessage | null>(null);
  const [contents, setContents] = useState<any>();

  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const lightDid = useLightDid(keystore, mnemonic);
  const claim = useClaim(CTYPE as ICTypeSchema, contents, lightDid?.did);
  const requestForAttestation = useRequestForAttestation(keystore, claim, lightDid);
  const attesterFullDid = useFullDid(ADMIN_ATTESTER_ADDRESS);

  const message = useMemo(() => {
    if (requestForAttestation && lightDid && attesterFullDid) {
      const messageBody: MessageBody = {
        content: { requestForAttestation },
        type: Message.BodyType.REQUEST_ATTESTATION
      };

      return new Message(messageBody, lightDid.did, attesterFullDid.did);
    } else {
      return null;
    }
  }, [attesterFullDid, lightDid, requestForAttestation]);

  const download = useCallback(async () => {
    if (credential) {
      const blob = new Blob([JSON.stringify(credential.body.content)], {
        type: 'text/plain;charset=utf-8'
      });

      // eslint-disable-next-line @typescript-eslint/await-thenable
      await FileSaver.saveAs(blob, 'credential.json');
    }
  }, [credential]);

  const fetchAttestation = useCallback(() => {
    if (lightDid?.did && lightDid.encryptionKey?.id) {
      credentialApi
        .getAttestation({
          receiverKeyId: `${lightDid.did}#${lightDid.encryptionKey.id}`
        })
        .then(({ data }) => {
          if (data.length > 0) {
            return Message.decrypt(data[0], keystore, lightDid);
          } else {
            return null;
          }
        })
        .then((message) => {
          setCredential(message);
          setReady(true);
        });
    }
  }, [keystore, lightDid]);

  useEffect(() => {
    if (!mnemonic) {
      setMnemonic(mnemonicGenerate());
    }
  }, [mnemonic, setMnemonic]);

  useEffect(() => {
    fetchAttestation();
  }, [fetchAttestation]);

  return (
    <Wrapper>
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
              <Button onClick={nextStep} variant="rounded">
                Next
              </Button>
            </Box>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <SubmitClaim
                attesterFullDid={attesterFullDid}
                claimLightDid={lightDid}
                keystore={keystore}
                message={message}
                onDone={fetchAttestation}
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
