import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { ConstantError } from '../errors/constants';
import { ErrorData } from '../errors/Error.type';
// import { useNavigation } from './navigation';
import * as RootNavigation from '../routes/RootNavigation';

type ErrorContextData = {
  appError: Partial<ErrorData>;
  setAppError: Dispatch<SetStateAction<Partial<ErrorData>>>;
  appErrorVerifyError: (data: any) => void;
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

  function appErrorVerifyError(err): void {
    switch (err.constructor) {
      case Error:
        if (err.message === 'Network Error') {
          console.log('entrou');
          setAppError(ConstantError.app['0005']);
          RootNavigation.navigate('InternalServerErrorScreenProvider', {});
        }
        break;
      default:
        setAppError(ConstantError[500]['50001']);
        break;
    }
  }
  function handleMOvePage() {
    RootNavigation.navigate('InternalServerErrorScreenProvider', {});
  }
  return (
    <ErrorContext.Provider
      value={{ appError, setAppError, appErrorVerifyError, handleMOvePage }}
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
