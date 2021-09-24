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
import { User as ModelUser } from '../databases/model/User';
import { userRepository } from '../databases/repository/user.repository';
import { tokenRepository } from '../databases/repository/token.repository';
import { useClientUser } from './clientUser';
import { useCommon } from './common';
import { phoneRepository } from '../databases/repository/phone.repository';
import { addressRepository } from '../databases/repository/address.repository';
import { imagesRepository } from '../databases/repository/image.repository';
import { termRepository } from '../databases/repository/term.repository';
import { UserTypeUser } from '../databases/model/UserTypeUser';
import { typeUserSchema } from '../databases/schema/typeUser.schema';
import { typeUserRepository } from '../databases/repository/typeUser.repository';

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
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const { setIsLoading } = useCommon();
  const { setUserClient } = useClientUser();

  useEffect(() => {
    async function loadUserData() {
      setIsLoading(true);

      const userDatabase = await userRepository.getUser();
      console.log(userDatabase);
      // if (userDatabase) {
      //   api.defaults.headers.authorization = `Bearer ${responseToken.token}`;
      //   const { active, rg, name, last_name, gender, cpf, email, user_id } =
      //     responseUser.getUser();
      //   setUserClient({
      //     active,
      //     email,
      //     cpf,
      //     gender,
      //     id: user_id,
      //     last_name,
      //     name,
      //     rg,
      //   });
      // }
    }
    loadUserData();
    setIsLoading(false);
  }, []);
  // useEffect(() => {
  //   async function loadUserData() {
  //     const userCollection = database.get<ModelUser>('users');
  //     const response = await userCollection.query().fetch();
  //     if (response.length > 0) {
  //       const userData = response[0]._raw as unknown as User;
  //       api.defaults.headers.authorization = `Bearer ${userData.token}`;
  //       setData(userData);
  //     }
  //     setLoading(false);
  //   }
  //   loadUserData();
  // }, []);

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
        const registerTypeUser = user.types.map((userType: ModelTypeUser) => {
          async function registerUserType() {
            const typeUserDatabase = await typeUserRepository.createOrUpdate(
              userType,
            );
            await userRepository.createUserTypeUser({
              user: userDatabase,
              userType: typeUserDatabase,
            });
          }
          return registerUserType();
        });

        await Promise.all(registerTypeUser);
      }
      if (user.term && user.term.length > 0) {
        const termDatabase = await termRepository.createOrUpdate(user.term[0]);
        await userRepository.createUserTerm({
          user: userDatabase,
          term: termDatabase,
        });
      }
      setUserClient({ ...user, token });
    } catch (error) {
      console.log(error);
      throw new Error(String(error));
    }
  }

  // async function signOut() {
  //   try {
  //     const userCollection = database.get<ModelUser>('users');
  //     await database.write(async () => {
  //       const userSelected = await userCollection.find(data.id);
  //       await userSelected.destroyPermanently();
  //     });
  //     setData({} as User);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(String(error));
  //   }
  // }

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
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
