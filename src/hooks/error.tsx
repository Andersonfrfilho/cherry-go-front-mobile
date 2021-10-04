import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { userRepository } from '../databases/repository/user.repository';
import { ConstantError } from '../errors/constants';
import { ErrorData } from '../errors/Error.type';
import * as RootNavigation from '../routes/RootNavigation';

type ErrorContextData = {
  appError: Partial<ErrorData>;
  setAppError: Dispatch<SetStateAction<Partial<ErrorData>>>;
  appErrorVerifyError: (data: any) => Promise<void>;
};
interface ErrorProviderProps {
  children: ReactNode;
}
export type VerifyErrorDTO = {
  status_code: number | 'app';
  code: string;
  message?: string;
};

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

function ErrorProvider({ children }: ErrorProviderProps) {
  const [appError, setAppError] = useState<Partial<ErrorData>>({});

  async function unauthorizedError(err: Error): Promise<void> {
    console.log(ConstantError[err.status][err.response.data.code]);
    setAppError(ConstantError[err.status][err.response.data.code]);
    userRepository.removeAll();
  }

  async function appErrorVerifyError(err): Promise<void> {
    console.log('##############');
    console.log(ConstantError[600]);
    if (err.message === 'Network Error') {
      setAppError(ConstantError[600]['0005']);
      RootNavigation.navigate('InternalServerErrorScreenProvider', {});
      return;
    }

    if (err.response.status === 401) {
      await unauthorizedError(err);
      return;
    }

    setAppError(ConstantError[500]['50001']);
  }

  return (
    <ErrorContext.Provider
      value={{ appError, setAppError, appErrorVerifyError }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

function useError(): ErrorContextData {
  const context = useContext(ErrorContext);
  return context;
}

export { ErrorProvider, useError };
