import type { Proof as ProofType } from '@zcloak/service/types';

import {
  alpha,
  Box,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { shortenHash } from '@zcloak/contracts-core/utils';
import { useWallet } from '@zcloak/react-wallet';
import { ProofStatus } from '@zcloak/service/types';

import { CircularProgressWithLabel, Ellipsis } from '@zkid/react-components';
import { useToggle } from '@zkid/react-hooks';
import { zkidApi } from '@zkid/react-hooks/api';

const Progress: React.FC<{ progress: number; status: ProofStatus }> = ({ progress, status }) => {
  return status === ProofStatus.True ? (
    <Box
      sx={({ palette }) => ({
        color: palette.success.main,
        background: alpha(palette.success.main, 0.12),
        fontSize: 12,
        lineHeight: '12px',
        padding: '4px',
        whiteSpace: 'nowrap',
        borderRadius: '4px'
      })}
    >
      {status}
    </Box>
  ) : status === ProofStatus.False ? (
    <Box
      sx={({ palette }) => ({
        color: palette.error.main,
        background: alpha(palette.error.main, 0.12),
        fontSize: 12,
        lineHeight: '12px',
        padding: '4px',
        whiteSpace: 'nowrap',
        borderRadius: '4px'
      })}
    >
      {status}
    </Box>
  ) : (
    <CircularProgressWithLabel color="primary" value={progress * 100} />
  );
};

const Row: React.FC<{ proof: ProofType; index: number }> = ({
  index,
  proof: { cTypeHash, expectResult, percent, programDetails, proofCid, rootHash, status, time }
}) => {
  const [open, toggle] = useToggle();

  return (
    <>
      <TableRow hover onClick={toggle}>
        <TableCell>{index}</TableCell>
        <TableCell>{programDetails.programName}</TableCell>
        <TableCell>Adventurer Profile</TableCell>
        <TableCell>
          <Ellipsis width="200px">{programDetails.programFieldName}</Ellipsis>
        </TableCell>
        <TableCell>
          <Ellipsis width="100px">{shortenHash(proofCid)}</Ellipsis>
        </TableCell>
        <TableCell>
          <Progress progress={Number(percent)} status={status} />
        </TableCell>
        <TableCell
          sx={(theme) => ({
            color: theme.palette.grey[700]
          })}
        >
          {moment(time).format('MM/DD/YYYY HH:mm:ss')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table
                aria-label="purchases"
                size="small"
                sx={(theme) => ({
                  '.MuiTableCell-root': {
                    color: theme.palette.grey[600]
                  }
                })}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>output</TableCell>
                    <TableCell>Ctype hash</TableCell>
                    <TableCell>program hash</TableCell>
                    <TableCell>root hash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{expectResult.join(',')}</TableCell>
                    <TableCell>{shortenHash(cTypeHash)}</TableCell>
                    <TableCell>{shortenHash(programDetails.programHash)}</TableCell>
                    <TableCell>{shortenHash(rootHash)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Proof: React.FC = () => {
  const { account } = useWallet();
  const [proofs, setProofs] = useState<ProofType[]>([]);

  useEffect(() => {
    if (account) {
      zkidApi.userProof({ dataOwner: account }).then(({ data }) => setProofs(data));
    }
  }, [account]);

  return (
    <Box id="dashboard-proof">
      <h2>Proof</h2>
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ padding: '14px', borderRadius: '10px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Program Name</TableCell>
              <TableCell>Claim alias</TableCell>
              <TableCell>Data type</TableCell>
              <TableCell>Proof CID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proofs.map((proof, index) => (
              <Row index={index + 1} key={index} proof={proof} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default React.memo(Proof);
