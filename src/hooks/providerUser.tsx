import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ErrorData } from '../errors/Error.type';

type ProviderUserContextData = {
  isLoading: boolean;
  appError: Partial<ErrorData>;
  setAppError: Dispatch<SetStateAction<Partial<ErrorData>>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
interface ProviderUserProviderProps {
  children: ReactNode;
}
const ProviderUserContext = createContext<ProviderUserContextData>(
  {} as ProviderUserContextData,
);

function ProviderUserProvider({ children }: ProviderUserProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appError, setAppError] = useState<Partial<ErrorData>>({});

  return (
    <ProviderUserContext.Provider
      value={{ isLoading, setIsLoading, appError, setAppError }}
    >
      {children}
    </ProviderUserContext.Provider>
  );
}

function useProviderUser(): ProviderUserContextData {
  const context = useContext(ProviderUserContext);
  return context;
}

export { ProviderUserProvider, useProviderUser };
