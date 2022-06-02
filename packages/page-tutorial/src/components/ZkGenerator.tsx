import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { Box, Button, styled, useTheme } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { shortenHash } from '@zcloak/contracts-core/utils';

import { CTYPE_HASH } from '@zkid/app-config/constants';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';
import { Proof } from '@zkid/extension-core/types';
import { StayAlert, ZkidExtensionContext, ZkRule } from '@zkid/react-components';
import { useToggle } from '@zkid/react-hooks';

import AddProof from './AddProof';

const Wrapper = styled(Box)`
  width: 100%;
  text-align: left;
  margin: 20px 0;
`;

const Item = styled(Box)`
  width: 100%;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  margin-top: 10px;

  > label {
    font-size: 12px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 4px;
  }

  > .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title,
  .value {
    font-size: 16px;
    line-height: 24px;
    color: #333;
  }

  .value {
    font-weight: 300;
  }
`;

const ZkGenerator: React.FC = () => {
  const { palette } = useTheme();
  const { zkidExtension } = useContext(ZkidExtensionContext);
  const [genLoading, setGenLoading] = useState(false);
  const [proof, setProof] = useState<Proof>();
  const [open, toggle] = useToggle();
  const [error, setError] = useState<Error | null>(null);

  const generate = useCallback(() => {
    setGenLoading(true);
    zkidExtension.openzkIDPopup('OPEN_GENERATE_PROOF', {
      cTypeHash: CTYPE_HASH,
      programHashName: ZK_PROGRAM.name,
      programFieldName: ZK_PROGRAM.filed,
      programHash: ZK_PROGRAM.hash,
      programDetail: ZK_PROGRAM.detailString
    });
  }, [zkidExtension]);

  useEffect(() => {
    const handleEvent = (value: Proof) => {
      setGenLoading(false);
      setProof(value);
    };

    const handleCLose = () => {
      setGenLoading(false);
    };

    zkidExtension.on('SEND_PROOF_TO_WEB', handleEvent);
    zkidExtension.on('EXTENSION_CLOSED', handleCLose);

    return () => {
      zkidExtension.off('SEND_PROOF_TO_WEB', handleEvent);
      zkidExtension.off('EXTENSION_CLOSED', handleCLose);
    };
  }, [zkidExtension]);

  return (
    <Wrapper>
      <ZkRule onClose={toggle} open={open} />
      <StayAlert message={error?.message} open={!!error && !proof} severity="error" />
      <Item>
        <label>zk Program</label>
        <div className="content">
          <span className="title">
            <Button
              onClick={toggle}
              sx={{
                padding: 0,
                color: 'inherit',
                ':hover': {
                  color: palette.primary.main
                }
              }}
              variant="text"
            >
              {ZK_PROGRAM.name}
              <span style={{ fontWeight: 700 }}>
                &nbsp;
                <CallMadeIcon sx={{ fontSize: '12px' }} />
              </span>
            </Button>
          </span>
          <span className="value">{shortenHash(ZK_PROGRAM.hash)}</span>
        </div>
      </Item>
      <Item>
        <label>Credential type</label>
        <div className="content">
          <span className="title">Adventurer Profile</span>
        </div>
      </Item>
      <Item>
        <label>field name</label>
        <div className="content">
          <span className="title">{ZK_PROGRAM.filed}</span>
        </div>
      </Item>
      <Item sx={(theme) => ({ borderColor: error && !proof ? theme.palette.error.main : 'white' })}>
        <label>outputs,rootHash,proof cid</label>
        <div className="content">
          <span className="title">
            {proof && (
              <>
                {proof.expectResult};{shortenHash(proof.rootHash)};{shortenHash(proof.proofCid)}
              </>
            )}
          </span>
          <span className="value">
            {!proof && (
              <LoadingButton
                loading={genLoading}
                onClick={generate}
                sx={{
                  background: '#4B45FF',
                  color: '#fff',
                  ':hover': {
                    background: '#4B45FF',
                    opacity: 0.8
                  }
                }}
                variant="rounded"
              >
                Generate
              </LoadingButton>
            )}
          </span>
        </div>
      </Item>
      {error && !proof && (
        <Box sx={(theme) => ({ fontSize: 12, color: theme.palette.error.main })}>
          {error.message}
        </Box>
      )}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <AddProof proof={proof} reportError={setError}>
          Submit
        </AddProof>
      </Box>
    </Wrapper>
  );
};

export default React.memo(ZkGenerator);
