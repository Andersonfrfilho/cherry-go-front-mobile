import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Q } from '@nozbe/watermelondb';
import { GENDER_ENUM } from '../enums/genderType.enum';
import { AppError } from '../errors/AppError';
import { api } from '../services/api';
import { UserClientAddressRegisterDTO, UserClientPhoneCodeConfirmDTO, UserClientPhoneDTO, UserClientRegisterDTO } from './dtos';
import { database } from '../databases';
import { User as ModelUser } from '../databases/model/User';
import { Address as ModelAddress } from '../databases/model/Address';
import { UserAddress as ModelUserAddress, UserAddress } from '../databases/model/UserAddress';
import { userRepository } from '../databases/repository/user.repository';
import { addressRepository } from '../databases/repository/address.repository';
import { phoneRepository } from '../databases/repository/phone.repository';
import { tokenRepository } from '../databases/repository/token.repository';
import { NOT_FOUND } from '../errors/constants/NotFound.const';

type ClientUserContextData = {
  userClient: UserClient;
  registerClient: (userData: UserClientRegisterDTO) => Promise<void>;
  registerAddressClient: (
    addressData: UserClientAddressRegisterDTO,
  ) => Promise<void>;
  registerPhoneClient: (phoneData:UserClientPhoneDTO) =>Promise<void>;
  resendCodePhoneClient: (id:string)=>Promise<void>;
  confirmCodePhoneClient: (phoneConfirm:UserClientPhoneCodeConfirmDTO)=>Promise<void>;
  token:Token;
};
interface ClientUserProviderProps {
  children: ReactNode;
}
const ClientUserContext = createContext<ClientUserContextData>(
  {} as ClientUserContextData,
);
type Term = {
  id: string;
  accept: boolean;
  type: string;
};
type User_Type = {
  id: string;
  user_id: string;
  user_type_id: string;
  active: boolean;
  roles: string[];
  permissions: string[];
  user_type: {
    id: string;
    name: string;
    description: null | any;
  };
};
type Image_Profile = {};
export type Phone = {
  country_code: string,
  ddd: string,
  number: string,
  id: string
};
type Addresses = {
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  country: string;
  id: string;
  complement?: string;
  reference?: string;
  latitude?: string;
  longitude?: string;
  image_profile?: Image_Profile[];
};
export type UserClient = {
  id: string;
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  active: boolean;
  password: string;
  password_confirm: string;
  birth_date: string;
  gender: GENDER_ENUM;
  details?: any;
  phones?: Phone[];
  addresses?: Addresses[];
  types?: User_Type[];
  term?: Term[];
  transactions?: [];
};

export type Token = {
  id?:string;
  token?:string;
  refresh_token?:string;
}

function ClientUserProvider({ children }: ClientUserProviderProps) {
  const [userClient, setUserClient] = useState<UserClient>({} as UserClient);
  const [token, setToken] = useState<Token>({} as Token);

  async function registerClient(userData: UserClientRegisterDTO) {
    try {
      const { data: user } = await api.post('/v1/users/clients', userData);

      await userRepository.createOrUpdate(user)

      setUserClient(user);
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function registerAddressClient(
    addressData: UserClientAddressRegisterDTO,
  ) {
    try {
      if (!addressData.user_id) {
        const [user] = await userRepository.findAll()

        if(!user){
          throw new AppError({
            message: '',
            status_code:'app',
            code:'0004' ,
          });
        }

        addressData.user_id = user.external_id;
      }

      const { data: user } = await api.post(
        '/v1/users/clients/addresses',
        addressData,
      );

      const [address] = user.addresses;

      await addressRepository.createOrUpdate(address)

    } catch (err) {
      if(NOT_FOUND[404][4001].code===err.response.data.code&&NOT_FOUND[404][4001].status_code===err.response.status&&NOT_FOUND[404][4001].message===err.response.data.message){
        await userRepository.removeAllDatabase();
      }

      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function registerPhoneClient(
    phoneData: UserClientPhoneDTO,
  ) {
    try {
      if (!phoneData.user_id) {
        console.log("###### - 0")
        const [user] = await userRepository.findAll()


        if(!user){
          throw new AppError({
            message: '',
            status_code:'app',
            code:'0004' ,
          });
        }

        console.log(user.getUser())
        phoneData.user_id = user.external_id;
      }
      const { data: { user, token } } = await api.post(
        '/v1/users/clients/phones',
        phoneData,
      );
      setToken({token})

      const [phone] = user.phones;

      await phoneRepository.createOrUpdate(phone)
      await tokenRepository.createOrUpdate({token})

    } catch (err) {

      if(NOT_FOUND[404][4001].code===err.response.data.code&&NOT_FOUND[404][4001].status_code===err.response.status){
        await userRepository.removeAllDatabase();
      }

      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function resendCodePhoneClient(
   id:string
  ) {
    let user_id = id;
    try {
      if (!user_id) {
        const [user] = await userRepository.findAll()

        if(!user){
          throw new AppError({
            message: '',
            status_code:'app',
            code:'0004' ,
          });
        }

        user_id = user.external_id;
      }

      const { data: { user, token } } = await api.post(
        '/v1/users/clients/phones/resend/code',
        {user_id},
      );
      setUserClient(user)
      setToken({token})

      await tokenRepository.createOrUpdate({token})
    } catch (err) {
      if(NOT_FOUND[404][4001].code===err.response.data.code&&NOT_FOUND[404][4001].status_code===err.response.status&&NOT_FOUND[404][4001].message===err.response.data.message){
        await userRepository.removeAllDatabase();
      }

      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function confirmCodePhoneClient(
    {code,token,id}:UserClientPhoneCodeConfirmDTO
   ) {
     let user_id = id;
     let token_db;
     try {
       if (!user_id) {
         const [user] = await userRepository.findAll()
         const [token] = await tokenRepository.findAll()

         if(!user){
           throw new AppError({
             message: '',
             status_code:'app',
             code:'0004' ,
           });
         }

         user_id = user.external_id;
         token_db = token.token;
       }
       console.log( {code,token,user_id})
       await api.post(
         '/v1/users/confirm/phone',
         {code,token:token||token_db,user_id},
       );
     } catch (err) {
       if(NOT_FOUND[404][4001].code===err.response.data.code&&NOT_FOUND[404][4001].status_code===err.response.status&&NOT_FOUND[404][4001].message===err.response.data.message){
        await userRepository.removeAllDatabase();
       }
       console.log("####################")
       console.log(err.response.data)
       throw new AppError({
         message: err.response.data.message,
         status_code: err.response.status,
         code: err.response.data.code,
       });
     }
   }

  return (
    <ClientUserContext.Provider
      value={{ registerClient, registerAddressClient, userClient, registerPhoneClient, resendCodePhoneClient,confirmCodePhoneClient, token }}
    >
      {children}
    </ClientUserContext.Provider>
  );
}

function useClientUser(): ClientUserContextData {
  const context = useContext(ClientUserContext);
  return context;
}

export { ClientUserProvider, useClientUser };
