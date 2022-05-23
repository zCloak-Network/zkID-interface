import type { ProofProcess } from '@zkid/service/types';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Card, CircularProgress, Link } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { ExplorerDataType, getExplorerLink } from '@zkid/app-config/getExplorerLink';
import { Address } from '@zkid/react-components';
import { useEndpoint, useInterval } from '@zkid/react-hooks';
import { zkidApi } from '@zkid/service';

import { requestHash } from '../JudgeStep';

const Cell: React.FC<{ success?: boolean; address?: string; transactionHash?: string }> = ({
  address,
  success,
  transactionHash
}) => {
  const endpoint = useEndpoint();

  return (
    <Card
      onClick={() =>
        endpoint &&
        transactionHash &&
        window.open(
          getExplorerLink(endpoint.explorer, transactionHash, ExplorerDataType.TRANSACTION)
        )
      }
      sx={() => ({
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '48px',
        marginTop: '36px',
        paddingX: '48px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '13px',
        overflow: 'visible',
        cursor: 'pointer'
      })}
    >
      <Card
        sx={({ palette }) => ({
          position: 'absolute',
          left: '16px',
          top: '-12px',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            success === undefined
              ? 'white'
              : success === true
              ? palette.success.main
              : palette.error.main,
          borderRadius: '12px',
          color: '#fff',
          fontSize: '12px'
        })}
      >
        {success === undefined ? (
          <CircularProgress size={16} />
        ) : success === true ? (
          <DoneIcon sx={{ stroke: 'white', strokeWidth: 2, color: 'white', fontSize: '12px' }} />
        ) : (
          <CloseIcon sx={{ stroke: 'white', strokeWidth: 2, color: 'white', fontSize: '12px' }} />
        )}
      </Card>
      <Box
        sx={({ palette }) => ({
          color:
            success === undefined
              ? palette.grey[900]
              : success === true
              ? palette.success.main
              : palette.error.main,

          fontWeight: 500
        })}
      >
        {success === undefined
          ? 'Loading...'
          : success === true
          ? 'Verified true'
          : 'Verified False'}
      </Box>
      {transactionHash && (
        <Box>
          By worker&nbsp;
          {endpoint && address && (
            <Link
              href={getExplorerLink(endpoint.explorer, address, ExplorerDataType.ADDRESS)}
              target="_blank"
            >
              <Address value={address} />
            </Link>
          )}
        </Box>
      )}
    </Card>
  );
};

const Verifing: React.FC<{ setFinished: (finished: boolean) => void }> = ({ setFinished }) => {
  const { account } = useWallet();
  const [process, setProcess] = useState<ProofProcess>();

  const fetchProofProcess = useCallback(() => {
    if (account) {
      zkidApi
        .proofProcess({ dataOwner: account, requestHash })
        .then(({ data }) => setProcess(data));
    }
  }, [account]);

  useInterval(fetchProofProcess, 6000);

  useEffect(() => {
    if (process?.finished) {
      setFinished(true);
    } else {
      setFinished(false);
    }
  }, [process?.finished, setFinished]);

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: '72px'
      }}
    >
      {process?.verifying.map(({ isPassed, transactionHash, worker }, index) => (
        <Cell address={worker} key={index} success={isPassed} transactionHash={transactionHash} />
      ))}
      {!process?.finished && <Cell />}
    </Box>
  );
};

export default React.memo(Verifing);
