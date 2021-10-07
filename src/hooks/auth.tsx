import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { database } from '../databases';
import { api } from '../services/api';
import { TypeUser as ModelTypeUser } from '../databases/model/TypeUser';
import { UserTerm as ModelUserTerm } from '../databases/model/UserTerm';
import { User as ModelUser } from '../databases/model/User';
import { userRepository } from '../databases/repository/user.repository';
import { tokenRepository } from '../databases/repository/token.repository';
import { useClientUser, UserClient } from './clientUser';
import { useCommon } from './common';
import { phoneRepository } from '../databases/repository/phone.repository';
import { addressRepository } from '../databases/repository/address.repository';
import { imagesRepository } from '../databases/repository/image.repository';
import { termRepository } from '../databases/repository/term.repository';
import { Term as ModelTerm } from '../databases/model/Term';
import { typeUserSchema } from '../databases/schema/typeUser.schema';
import { typeUserRepository } from '../databases/repository/typeUser.repository';
import * as RootNavigation from '../routes/RootNavigation';
import { useError } from './error';
import { GetModelResponse } from '../databases/model/dtos/getUser.dto';
import { AppError } from '../errors/AppError';
import { useProviderUser, UserProvider } from './providerUser';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const { setIsLoading, setIsLoadingRouter } = useCommon();
  const { setUserClient } = useClientUser();
  const { setUserProvider } = useProviderUser();
  const { appErrorVerifyError } = useError();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsLoadingRouter(true);
      const user = await userRepository.getUser();

      if (user) {
        api.defaults.headers.authorization = `Bearer ${user.token}`;
        setUserClient(user);
      }
      setIsLoadingRouter(false);
      setIsLoading(false);
    })();
    return () => {};
  }, []);

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      await userRepository.removeAll();

      const { data } = await api.post('/v1/users/sessions', {
        email,
        password,
      });
      const { token, refresh_token, user } = data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userDatabase = await userRepository.createOrUpdate(user);

      await tokenRepository.createOrUpdate({
        token,
        refresh_token,
        user_id: userDatabase.id,
      });

      if (user.phones && user.phones.length > 0) {
        const phoneDatabase = await phoneRepository.createOrUpdate(
          user.phones[0],
        );
        await userRepository.createUserPhone({
          user: userDatabase,
          phone: phoneDatabase,
        });
      }

      if (user.addresses && user.addresses.length > 0) {
        const addressDatabase = await addressRepository.createOrUpdate(
          user.addresses[0],
        );
        await userRepository.createUserAddress({
          user: userDatabase,
          address: addressDatabase,
        });
      }

      if (user.image_profile && user.image_profile.length > 0) {
        const imageProfileDatabase = await imagesRepository.createOrUpdate(
          user.image_profile[0],
        );
        await userRepository.createUserImageProfile({
          user: userDatabase,
          imageProfile: imageProfileDatabase,
        });
      }

      if (user.types && user.types.length > 0) {
        const typeUserDatabase = await typeUserRepository.createOrUpdate(
          user.types,
        );

        const userTypeUsers = typeUserDatabase.map(userType => ({
          user: userDatabase,
          userType,
        }));

        await userRepository.createUserTypeUser(userTypeUsers);
      }

      if (user.terms && user.terms.length > 0) {
        const termUserDatabase = await termRepository.createOrUpdate(
          user.terms,
        );
        const userTerms = termUserDatabase.map(term => ({
          user: userDatabase,
          term,
        }));
        await userRepository.createUserTerm(userTerms);
      }

      const userGetUser = await userRepository.getUser();

      if (!userGetUser) {
        throw new AppError({
          message: 'usuario não encontrado',
          code: '4001',
          status_code: 401,
        });
      }
      const dataClone = {} as GetModelResponse;
      Object.assign(dataClone, userGetUser);
      setUserClient(dataClone);
    } catch (error) {
      console.log(error);
      appErrorVerifyError(error);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await userRepository.removeAll();
      setUserClient({} as GetModelResponse);
      setUserProvider({} as UserProvider);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // async function updatedUser(user: User) {
  //   try {
  //     const userCollection = database.get<ModelUser>('users');
  //     await database.write(async () => {
  //       const userSelected = await userCollection.find(user.id);
  //       await userSelected.update(userData => {
  //         userData.name = user.name;
  //         userData.driver_license = user.driver_license;
  //         userData.avatar = user.avatar;
  //       });
  //       console.log(user);
  //       setData(user);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(String(error));
  //   }
  // }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
