import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Q } from '@nozbe/watermelondb';
import { GENDER_ENUM } from '../enums/genderType.enum';
import { AppError } from '../errors/AppError';
import { api } from '../services/api';
import { UserClientRegisterDTO } from './dtos';
import { database } from '../databases';
import { User as ModelUser } from '../databases/model/User';

type ClientUserContextData = {
  userClient: UserClient;
  registerClient: (userData: UserClientRegisterDTO) => Promise<void>;
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
  gender: GENDER_ENUM;
};

function ClientUserProvider({ children }: ClientUserProviderProps) {
  const [userClient, setUserClient] = useState<UserClient>({} as UserClient);

  async function registerClient(userData: UserClientRegisterDTO) {
    try {
      const { data: user } = await api.post('/v1/users/clients', userData);

      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const [userExist] = await userCollection
          .query(Q.where('user_id', user.id))
          .fetch();

        if (userExist) {
          await userExist.update(userExistDb => {
            userExistDb.user_id = user.id;
            userExistDb.name = user.name;
            userExistDb.email = user.email;
            userExistDb.last_name = user.last_name;
            userExistDb.cpf = user.cpf;
            userExistDb.rg = user.rg;
            userExistDb.gender = user.gender;
            userExistDb.active = user.active;
          });
        }

        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.last_name = user.last_name;
          newUser.cpf = user.cpf;
          newUser.rg = user.rg;
          newUser.gender = user.gender;
          newUser.active = user.active;
        });
      });

      setUserClient(user);
    } catch (err) {
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
