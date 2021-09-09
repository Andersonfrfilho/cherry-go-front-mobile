import React, { createContext, ReactNode, useContext, useState } from 'react';
import { GENRE_ENUM } from '../enums/genreType.enum';
import { AppError } from '../errors/AppError';
import { api } from '../services/api';
import { UserClientDTO } from './dtos';

type ClientUserContextData = {
  userClient: UserClient;
  registerClient: (userData: UserClientDTO) => Promise<void>;
};
interface ClientUserProviderProps {
  children: ReactNode;
}
const ClientUserContext = createContext<ClientUserContextData>(
  {} as ClientUserContextData,
);

type UserClient = {
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  password_confirm: string;
  birth_date: string;
  gender: GENRE_ENUM;
};

function ClientUserProvider({ children }: ClientUserProviderProps) {
  const [userClient, setUserClient] = useState<UserClient>({} as UserClient);

  async function registerClient(userData: UserClientDTO) {
    try {
      console.log(userData);
      const { data } = await api.post('/v1/users/clients', userData);
      setUserClient(data);
    } catch (err) {
      console.log(err.response.data);
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  return (
    <ClientUserContext.Provider value={{ registerClient, userClient }}>
      {children}
    </ClientUserContext.Provider>
  );
}

function useClientUser(): ClientUserContextData {
  const context = useContext(ClientUserContext);
  return context;
}

export { ClientUserProvider, useClientUser };
