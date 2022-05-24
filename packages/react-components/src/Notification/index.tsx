import { Alert, AlertTitle, Box, Collapse, Portal, styled } from '@mui/material';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CallError, ContractError, OutOfGasError, UserRejectError } from '@zcloak/zkid-core/errors';

interface NotificationState {
  notifyError: (error: unknown) => void;
}

export const NotificationContext = createContext<NotificationState>({} as NotificationState);

const NotificationWrapper = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
`;

let id = 0;

const NotificationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [messages, setMessages] = useState<{ id: number; title: string; message?: string }[]>([]);
  const messageRef = useRef(messages);

  useEffect(() => {
    messageRef.current = messages;
  }, [messages]);

  const notifyError = useCallback((error: unknown) => {
    const theId = id++;

    if (error instanceof CallError) {
      setMessages([
        ...messageRef.current,
        {
          id: theId,
          title: `Call ${error.methodName} error`,
          message: error.reason
        }
      ]);
    } else if (error instanceof OutOfGasError) {
      setMessages([
        ...messageRef.current,
        {
          id: theId,
          title: `Call ${error.methodName} out of gas`,
          message: error.message
        }
      ]);
    } else if (error instanceof UserRejectError) {
      setMessages([
        ...messageRef.current,
        {
          id: theId,
          title: 'User reject transaction',
          message: error.message
        }
      ]);
    } else if (error instanceof ContractError) {
      setMessages([
        ...messageRef.current,
        {
          id: theId,
          title: 'Contract Error',
          message: error.message
        }
      ]);
    } else if (error instanceof Error) {
      setMessages([
        ...messageRef.current,
        {
          id: theId,
          title: 'Error',
          message: error.message
        }
      ]);
    } else {
      setMessages([
        ...messageRef.current,
        {
          id: theId,
          title: 'Unknown error'
        }
      ]);
    }

    setTimeout(() => {
      setMessages(messageRef.current.filter(({ id }) => id !== theId));
    }, 6000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifyError }}>
      {children}
      <Portal>
        <NotificationWrapper>
          <TransitionGroup>
            {messages.map(({ id, message, title }) => (
              <Collapse key={id} mountOnEnter unmountOnExit>
                <Alert severity="error" sx={{ my: 1, mx: 2, width: '300px' }} variant="filled">
                  <AlertTitle>{title}</AlertTitle>
                  {message}
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
