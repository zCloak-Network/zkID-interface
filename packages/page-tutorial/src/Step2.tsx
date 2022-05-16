import type { ICTypeSchema, IMessage, MessageBody } from '@kiltprotocol/sdk-js';

import { Message } from '@kiltprotocol/sdk-js';
import { Box, Button, CircularProgress, Container, styled } from '@mui/material';
import FileSaver from 'file-saver';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CTYPE } from '@zkid/app-config/constants';
import { useClaim, useRequestForAttestation } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service/Api';
import { AttestationStatus } from '@zkid/service/types';
import { sleep } from '@zkid/service/utils';

import Contents from './components/Contents';
import Credential from './components/Credential';
import SubmitClaim from './components/SubmitClaim';
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
  const { attesterFullDid, claimerLightDid, keystore, nextStep } = useContext(TutorialContext);
  const [ready, setReady] = useState(false);
  const [originMessage, setOriginMessage] = useState<IMessage | null>(null);
  const [contents, setContents] = useState<any>();

  const claim = useClaim(CTYPE as ICTypeSchema, contents, claimerLightDid?.did);
  const requestForAttestation = useRequestForAttestation(keystore, claim, claimerLightDid);

  const message = useMemo(() => {
    if (requestForAttestation && claimerLightDid && attesterFullDid) {
      const messageBody: MessageBody = {
        content: { requestForAttestation },
        type: Message.BodyType.REQUEST_ATTESTATION
      };

      return new Message(messageBody, claimerLightDid.did, attesterFullDid.did);
    } else {
      return null;
    }
  }, [attesterFullDid, claimerLightDid, requestForAttestation]);

  const download = useCallback(() => {
    if (originMessage) {
      const blob = new Blob([JSON.stringify(originMessage.body.content)], {
        type: 'text/plain;charset=utf-8'
      });

      FileSaver.saveAs(blob, 'credential.json');
    }
  }, [originMessage]);

  const fetchAttestation = useCallback(async () => {
    if (claimerLightDid?.did && claimerLightDid.encryptionKey?.id) {
      while (true) {
        const {
          data: { attestationStatus }
        } = await credentialApi.getAttestationStatus({
          senderKeyId: `${claimerLightDid.did}#${claimerLightDid.encryptionKey.id}`
        });

        if (attestationStatus === AttestationStatus.attested) {
          break;
        } else if (attestationStatus === AttestationStatus.notAttested) {
          return;
        }

        await sleep(6000);
      }

      await credentialApi
        .getAttestation({
          receiverKeyId: `${claimerLightDid.did}#${claimerLightDid.encryptionKey.id}`
        })
        .then(({ data }) => {
          if (data.length > 0) {
            return Message.decrypt(data[0], keystore, claimerLightDid);
          } else {
            return null;
          }
        })
        .then((message) => setOriginMessage(message));
    }
  }, [keystore, claimerLightDid]);

  useEffect(() => {
    fetchAttestation().finally(() => setReady(true));
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
          {originMessage ? (
            <Credential credential={originMessage.body.content} />
          ) : (
            <Contents contentsChange={setContents} />
          )}
          {originMessage ? (
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
                claimerLightDid={claimerLightDid}
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
