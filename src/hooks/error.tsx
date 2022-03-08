import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { userRepository } from '../databases/repository/user.repository';
import { HTTP_ERROR_CODES_ENUM } from '../errors/AppError';
import { ConstantError } from '../errors/constants';
import { FORBIDDEN } from '../errors/constants/Forbidden.const';
import { ErrorData } from '../errors/Error.type';
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

  function unauthorizedError(err: Error): void {
    setAppError(ConstantError[err.response.status][err.response.data.code]);
    RootNavigation.navigate('UnauthorizedErrorScreen', {});
  }
  function forbiddenError(err: Error): void {
    setAppError(ConstantError[err.response.status][err.response.data.code]);

    if (err.response.data.code === FORBIDDEN[403][3002].code) {
      RootNavigation.navigate('ResendEmailActiveStack', {
        email: !!err.config.data && JSON.parse(err.config.data).email,
      });
      return;
    }
    RootNavigation.navigate('UnauthorizedErrorScreen', {});
    return;
  }
  function badRequestError(err: Error): void {
    setAppError(ConstantError[err.response.status][err.response.data.code]);
  }

  function notFoundError(err: Error): void {
    setAppError(ConstantError[err.response.status][err.response.data.code]);
    RootNavigation.navigate('NotFoundErrorScreen', {});
  }

  function internalServerError(): void {
    setAppError(ConstantError[600]['0005']);
    RootNavigation.navigate('InternalServerErrorScreen', {});
  }

  function unknownServerError(): void {
    setAppError(ConstantError[500]['50001']);
    RootNavigation.navigate('UnknownErrorScreen', {});
  }

  async function appErrorVerifyError(err) {
    console.log(
      '%c ### Hook Error####',
      'color: green; background: yellow; font-size: 30px',
    );
    console.log(JSON.stringify(err, null, 2));
    if (!err.response) {
      return;
    }

    if (err.message === "Cannot read property '_raw' of undefined") {
      unknownServerError();
      return;
    }
    if (err.message === 'Network Error') {
      internalServerError();
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.FORBIDDEN) {
      forbiddenError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.UNAUTHORIZED) {
      unauthorizedError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.BAD_REQUEST) {
      badRequestError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.NOT_FOUND) {
      notFoundError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.INTERNAL_SERVER_ERROR) {
      if (err.response.data.code === '50001') {
        notFoundError(err);
        return;
      }
    }
    unknownServerError();
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
