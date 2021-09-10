import React, { createContext, ReactNode, useContext, useState } from 'react';
import { GENDER_ENUM } from '../enums/genderType.enum';
import { AppError } from '../errors/AppError';
import { api } from '../services/api';
import { UserProviderRegisterDTO } from './dtos';

type ProviderUserContextData = {
  userProvider: ProviderUserType;
  registerProvider: (userData: UserProviderRegisterDTO) => Promise<void>;
};

type ProviderUserType = {
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  password_confirm: string;
  birth_date: string;
  gender: GENDER_ENUM;
};
interface ProviderUserProviderProps {
  children: ReactNode;
}
const ProviderUserContext = createContext<ProviderUserContextData>(
  {} as ProviderUserContextData,
);

function ProviderUserProvider({ children }: ProviderUserProviderProps) {
  const [userProvider, setUserProvider] = useState<ProviderUserType>(
    {} as ProviderUserType,
  );

  async function registerProvider(userData: UserProviderRegisterDTO) {
    try {
      const { data } = await api.post('/v1/users/providers', userData);
      setUserProvider(data);
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }
  return (
    <ProviderUserContext.Provider value={{ registerProvider, userProvider }}>
      {children}
    </ProviderUserContext.Provider>
  );
}

function useProviderUser(): ProviderUserContextData {
  const context = useContext(ProviderUserContext);
  return context;
}

export { ProviderUserProvider, useProviderUser };
