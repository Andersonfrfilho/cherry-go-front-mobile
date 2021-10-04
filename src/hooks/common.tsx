import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

type CommonContextData = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoadingRouter: boolean;
  setIsLoadingRouter: Dispatch<SetStateAction<boolean>>;
};

interface CommonProviderProps {
  children: ReactNode;
}

const CommonContext = createContext<CommonContextData>({} as CommonContextData);

function CommonProvider({ children }: CommonProviderProps) {
  const [isLoadingRouter, setIsLoadingRouter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <CommonContext.Provider
      value={{ isLoading, setIsLoading, isLoadingRouter, setIsLoadingRouter }}
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
