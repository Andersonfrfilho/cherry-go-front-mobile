import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ErrorData } from '../errors/Error.type';

type CommonContextData = {
  isLoading: boolean;
  appError: Partial<ErrorData>;
  setAppError: Dispatch<SetStateAction<Partial<ErrorData>>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
interface CommonsProviderProps {
  children: ReactNode;
}
const CommonContext = createContext<CommonContextData>({} as CommonContextData);

function CommonProvider({ children }: CommonsProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appError, setAppError] = useState<Partial<ErrorData>>({});

  return (
    <CommonContext.Provider
      value={{ isLoading, setIsLoading, appError, setAppError }}
    >
      {children}
    </CommonContext.Provider>
  );
}

function useCommon(): CommonContextData {
  const context = useContext(CommonContext);
  return context;
}

export { CommonProvider, useCommon };
