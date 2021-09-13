import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ErrorData } from '../errors/Error.type';

type UserContextData = {
  isLoading: boolean;
  appError: Partial<ErrorData>;
  setAppError: Dispatch<SetStateAction<Partial<ErrorData>>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

function UserProvider({ children }: UserProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appError, setAppError] = useState<Partial<ErrorData>>({});

  return (
    <UserContext.Provider
      value={{ isLoading, setIsLoading, appError, setAppError }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser(): UserContextData {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useUser };
