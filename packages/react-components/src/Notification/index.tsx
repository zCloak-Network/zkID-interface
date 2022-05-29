import type { TransactionResponse } from '@ethersproject/abstract-provider';

import { Alert, AlertTitle, Box, Collapse, Link, Portal, styled } from '@mui/material';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CallError, ContractError, OutOfGasError, UserRejectError } from '@zcloak/zkid-core/errors';

import { endpoints } from '@zkid/app-config/endpoints';
import { ExplorerDataType, getExplorerLink } from '@zkid/app-config/getExplorerLink';

interface NotificationState {
  notifyError: (error: unknown, destroy?: number | null) => number;
  notifyTx: (transaction: TransactionResponse, chainId: number, destroy?: number | null) => number;
}

export const NotificationContext = createContext<NotificationState>({} as NotificationState);

const NotificationWrapper = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
`;

let id = 0;

type Message = {
  id: number;
  title: string;
  message?: React.ReactNode;
  severity: 'success' | 'info' | 'warning' | 'error';
};

function makeErrorMessage(error: unknown): Message {
  const theId = id++;

  if (error instanceof CallError) {
    return {
      id: theId,
      title: `Call ${error.methodName} error`,
      message: error.reason,
      severity: 'error'
    };
  } else if (error instanceof OutOfGasError) {
    return {
      id: theId,
      title: `Call ${error.methodName} out of gas`,
      message: error.message,
      severity: 'error'
    };
  } else if (error instanceof UserRejectError) {
    return {
      id: theId,
      title: 'User reject transaction',
      message: error.message,
      severity: 'error'
    };
  } else if (error instanceof ContractError) {
    return {
      id: theId,
      title: 'Contract Error',
      message: error.message,
      severity: 'error'
    };
  } else if (error instanceof Error) {
    return {
      id: theId,
      title: 'Error',
      message: error.message,
      severity: 'error'
    };
  } else {
    return {
      id: theId,
      title: 'Unknown error',
      severity: 'error'
    };
  }
}

const NotificationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageRef = useRef(messages);

  useEffect(() => {
    messageRef.current = messages;
  }, [messages]);

  const notifyError = useCallback((error: unknown, destroy: number | null = 6000) => {
    const message = makeErrorMessage(error);

    setMessages([...messageRef.current, message]);

    if (destroy) {
      setTimeout(() => {
        setMessages(messageRef.current.filter(({ id }) => id !== message.id));
      }, destroy);
    }

    return message.id;
  }, []);

  const notifyTx = useCallback(
    (transaction: TransactionResponse, chainId: number, destroy: number | null = 6000) => {
      const endpoint = endpoints.find(({ chainId: _chainId }) => chainId === _chainId);
      const message: Message = {
        id: id++,
        title: 'Transaction submited',
        message: 'Wait for confirm',
        severity: 'success'
      };

      setMessages([...messageRef.current, message]);

      if (destroy) {
        setTimeout(() => {
          setMessages(messageRef.current.filter(({ id }) => id !== message.id));
        }, destroy);
      }

      transaction.wait().then((receipt) => {
        const message: Message = {
          id: id++,
          title: receipt.status ? 'Confirmed transaction' : 'Transaction failed',
          message: endpoint ? (
            <>
              Transaction {receipt.confirmations} confirmed, &nbsp;
              <Link
                href={getExplorerLink(
                  endpoint.explorer,
                  receipt.transactionHash,
                  ExplorerDataType.TRANSACTION
                )}
                target="_blank"
              >
                View on explorer.
              </Link>
            </>
          ) : undefined,
          severity: receipt.status ? 'success' : 'error'
        };

        setMessages([...messageRef.current, message]);

        if (destroy) {
          setTimeout(() => {
            setMessages(messageRef.current.filter(({ id }) => id !== message.id));
          }, destroy);
        }
      });

      return message.id;
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ notifyError, notifyTx }}>
      {children}
      <Portal>
        <NotificationWrapper>
          <TransitionGroup>
            {messages.map(({ id, message, severity, title }) => (
              <Collapse key={id} mountOnEnter unmountOnExit>
                <Alert
                  onClose={() =>
                    setMessages(messageRef.current.filter(({ id: _id }) => id !== _id))
                  }
                  severity={severity}
                  sx={{ my: 1, mx: 2, width: '300px' }}
                  variant="filled"
                >
                  <AlertTitle>{title}</AlertTitle>
                  <Box sx={{ wordBreak: 'break-all' }}>{message}</Box>
                </Alert>
              </Collapse>
            ))}
          </TransitionGroup>
        </NotificationWrapper>
      </Portal>
    </NotificationContext.Provider>
  );
};

export default React.memo<typeof NotificationProvider>(NotificationProvider);
