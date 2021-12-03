import React, { createContext, ReactNode, useContext, useState } from 'react';
import { GENDER_ENUM } from '../enums/genderType.enum';
import { api } from '../services/api';
import { userRepository } from '../databases/repository/user.repository';
import { addressRepository } from '../databases/repository/address.repository';
import { phoneRepository } from '../databases/repository/phone.repository';
import { tokenRepository } from '../databases/repository/token.repository';
import { NOT_FOUND } from '../errors/constants/NotFound.const';
import { Platform } from 'react-native';
import { AxiosError } from 'axios';
import { UploadUserClientImageDocumentDTO, UploadUserClientImageProfileDTO, UserClientAddressRegisterDTO, UserClientPhoneCodeConfirmDTO, UserClientPhoneDTO, UserClientRegisterDTO } from './dtos/users';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';
import { useError } from './error';
import { GetModelResponse } from '../databases/model/dtos/getUser.dto';
import { useCommon } from './common';
import { AppError } from '../errors/AppError'
import { Details } from './providerUser';

type ClientUserContextData = {
  userClient: GetModelResponse;
  setUserClient: React.Dispatch<React.SetStateAction<GetModelResponse>>;
  registerClient: (userData: UserClientRegisterDTO) => Promise<void>;
  registerAddressClient: (
    addressData: UserClientAddressRegisterDTO,
  ) => Promise<void>;
  registerPhoneClient: (phoneData: UserClientPhoneDTO) => Promise<void>;
  resendCodePhoneClient: (id: string) => Promise<void>;
  confirmCodePhoneClient: (phoneConfirm: UserClientPhoneCodeConfirmDTO) => Promise<void>;
  uploadUserClientImageDocument: (uploadDocumentData: UploadUserClientImageDocumentDTO) => Promise<void>;
  uploadUserClientImageProfile: (uploadImageProfileData: UploadUserClientImageProfileDTO) => Promise<void>;
  token: Token;
  forgotPasswordMail(email: string): Promise<void>;
  forgotPasswordPhone(phoneData: Partial<UserClientPhoneDTO>): Promise<ForgotPasswordPhoneResponse>;
  countdown: number;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  userIdResetPassword: string;
  resetPassword(dataResetPassword: ResetPasswordProps): Promise<void>;
  updateDetails(data: UpdateDetailsProps): Promise<void>;
  registerAccountBank(data: RegisterAccountBankProps): Promise<Details>;
  removeAccountBank(accountBankId: string): Promise<Details>;
};
interface RegisterAccountBankProps {
  branch_number: string;
  account_number: string;
  account_holder_name: string;
  name_account_bank: string;
  code_bank: string;
}
interface UpdateDetailsProps {
  details: any;
}
interface ResetPasswordProps {
  password: string;
  token: string;
}
interface ForgotPasswordPhoneResponse {
  countdown: Number;
  userId: string;
}
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
type Image = {
  id: string;
  link: string;
}
type Image_Profile = {
  image: Image;
};
export type Phone = {
  country_code: string,
  ddd: string,
  number: string,
  id: string
};
export type Addresses = {
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
};
export type UserClient = {
  id: string;
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  active: boolean;
  password?: string;
  password_confirm?: string;
  birth_date: string;
  gender: GENDER_ENUM;
  details?: any;
  phones?: Phone[];
  addresses?: Addresses[];
  types?: User_Type[];
  term?: Term[];
  transactions?: [];
  image_profile?: Image_Profile[];

};
export type ClientAppointment = {
  id: string;
  client_id: string;
  appointment_id: string;
  active: boolean;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  client: UserClient;
}
export type Token = {
  id?: string;
  token?: string;
  refresh_token?: string;
  user_id?: string;
}



function ClientUserProvider({ children }: ClientUserProviderProps) {
  const [userClient, setUserClient] = useState<GetModelResponse>({} as GetModelResponse);
  const [token, setToken] = useState<Token>({} as Token);
  const [countdown, setCountdown] = useState(0);
  const [phone, setPhone] = useState('');
  const [userIdResetPassword, setUserIdResetPassword] = useState('');
  const { setIsLoading } = useCommon();
  const { appErrorVerifyError } = useError();

  async function registerClient(userData: UserClientRegisterDTO) {
    try {
      const { data: user } = await api.post('/v1/users/clients', userData);

      await userRepository.createOrUpdate(user)

      setUserClient(user);
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      })
    }
  }

  async function registerAddressClient(
    addressData: UserClientAddressRegisterDTO,
  ) {
    try {
      if (!addressData.user_id) {
        const [user] = await userRepository.findAll()

        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 600,
            code: '0003',
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
      if (NOT_FOUND[404][4001].code === err.response.data.code && NOT_FOUND[404][4001].status_code === err.response.status && NOT_FOUND[404][4001].message === err.response.data.message) {
        await userRepository.removeAllDatabase();
      }

      appErrorVerifyError({
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
        const [user] = await userRepository.findAll()


        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 600,
            code: '0003',
          });
        }

        phoneData.user_id = user.external_id;
      }
      const { data: { user, token } } = await api.post(
        '/v1/users/clients/phones',
        phoneData,
      );
      setToken({ token })

      const [phone] = user.phones;

      await phoneRepository.createOrUpdate(phone)
      await tokenRepository.createOrUpdate({ token })

    } catch (err) {

      if (NOT_FOUND[404][4001].code === err.response.data.code && NOT_FOUND[404][4001].status_code === err.response.status) {
        await userRepository.removeAllDatabase();
      }

      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function resendCodePhoneClient(
    id: string
  ) {
    let user_id = id;
    try {
      if (!user_id) {
        const [user] = await userRepository.findAll()

        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 600,
            code: '0003',
          });
        }

        user_id = user.external_id;
      }

      const { data: { user, token } } = await api.post(
        '/v1/users/clients/phones/resend/code',
        { user_id },
      );
      setUserClient(user)
      setToken({ token })

      await tokenRepository.createOrUpdate({ token })
    } catch (err: unknown | AxiosError) {
      if (NOT_FOUND[404][4001].code === err.response.data.code && NOT_FOUND[404][4001].status_code === err.response.status && NOT_FOUND[404][4001].message === err.response.data.message) {
        await userRepository.removeAllDatabase();
      }

      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function confirmCodePhoneClient(
    { code, token, id }: UserClientPhoneCodeConfirmDTO
  ) {
    let token_db;
    let user_id = id;
    try {
      if (!user_id) {
        const [user] = await userRepository.findAll()
        const [token] = await tokenRepository.findAll()

        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 600,
            code: '0003',
          });
        }

        user_id = user.external_id;
        token_db = token.token;
      }

      await api.post(
        '/v1/users/confirm/phone',
        { code, token: token || token_db, user_id },
      );
      setUserIdResetPassword(user_id)
    } catch (err) {
      if (NOT_FOUND[404][4001].code === err.response.data.code && NOT_FOUND[404][4001].status_code === err.response.status && NOT_FOUND[404][4001].message === err.response.data.message) {
        await userRepository.removeAllDatabase();
      }

      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }


  async function uploadUserClientImageDocument(
    { image_uri, user_id, description }: UploadUserClientImageDocumentDTO
  ) {
    try {
      if (!user_id) {
        const [user] = await userRepository.findAll()

        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 600,
            code: '0003',
          });
        }

        user_id = user.external_id;
      }
      const fileName = image_uri.split('/').pop()

      if (!fileName) {
        throw new AppError({
          message: '',
          status_code: 600,
          code: '0004',
        });
      }

      let match = /\.(\w+)$/.exec(fileName);

      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();

      formData.append('document', {
        uri: Platform.OS === "android" ? image_uri : image_uri.replace("file://", ""),
        name: fileName,
        type
      });

      formData.append('description', description);
      formData.append('user_id', user_id);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await api.post('/v1/users/documents/image', formData, config);
    } catch (err) {
      if (NOT_FOUND[404][4001].code === err.response.data.code && NOT_FOUND[404][4001].status_code === err.response.status && NOT_FOUND[404][4001].message === err.response.data.message) {
        await userRepository.removeAllDatabase();
      }

      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function uploadUserClientImageProfile(
    { image_uri, user_id }: UploadUserClientImageProfileDTO
  ) {

    try {
      if (!user_id) {
        const [user] = await userRepository.findAll()

        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 600,
            code: '0003',
          });
        }

        user_id = user.external_id;
      }
      const fileName = image_uri.split('/').pop()

      if (!fileName) {
        appErrorVerifyError({
          message: '',
          status_code: 600,
          code: '0004',
        });
      }

      let match = /\.(\w+)$/.exec(fileName);

      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('userpic', myFileInput.files[0], 'chris.jpg');
      formData.append('image_profile', {
        uri: Platform.OS === "android" ? image_uri : image_uri.replace("file://", ""),
        name: fileName,
        type
      });

      formData.append('user_id', 'b83d1b74-4015-4b27-95dd-86110dbcff32');
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await api.post('/v1/users/profiles/images', formData, config);
    } catch (err) {
      if (NOT_FOUND[404][4001].code === err.response.data.code && NOT_FOUND[404][4001].status_code === err.response.status && NOT_FOUND[404][4001].message === err.response.data.message) {
        await userRepository.removeAllDatabase();
      }

      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function forgotPasswordMail(email: string) {
    try {
      await api.post('/v1/users/password/forgot', {
        email,
        platform: Platform.OS
      });
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function forgotPasswordPhone({ country_code, ddd, number }: Omit<UserClientPhoneDTO, 'user_id'>): Promise<ForgotPasswordPhoneResponse> {
    try {

      const { data: { token, countdown, user_id } } = await api.post('/v1/users/password/forgot/phone', { country_code, ddd, number });
      setToken({ token })
      setCountdown(Number(countdown))
      return { countdown: Number(countdown), userId: user_id }
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function resetPassword({ password, token }: ResetPasswordProps): Promise<void> {
    try {
      await api.post('/v1/users/password/reset', { password, token });
      setToken({})
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function updateDetails({ details }: UpdateDetailsProps): Promise<void> {
    setIsLoading(true)
    try {
      await api.put('/v1/users/clients/details', { details });
    } catch (err) {
      appErrorVerifyError(err);
    } finally {
      setIsLoading(false)
    }
  }

  async function registerAccountBank(data: RegisterAccountBankProps): Promise<Details> {
    setIsLoading(true)
    try {
      const { data: details } = await api.post('/v1/users/banks', data);
      return details
    } catch (err) {
      appErrorVerifyError(err);
    } finally{
      setIsLoading(false)
    }
  }

  async function removeAccountBank(bankAccountId:string): Promise<Details> {
    setIsLoading(true)
    try {
      const { data: details } = await api.delete('/v1/users/banks', {
        data: { bank_account_id: bankAccountId }
      });
      return details
    } catch (err) {
      appErrorVerifyError(err);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <ClientUserContext.Provider
      value={{
        registerClient,
        userIdResetPassword,
        resetPassword,
        phone,
        setPhone,
        registerAddressClient,
        uploadUserClientImageProfile,
        uploadUserClientImageDocument,
        registerPhoneClient,
        resendCodePhoneClient,
        confirmCodePhoneClient,
        forgotPasswordMail,
        token,
        forgotPasswordPhone,
        countdown,
        userClient,
        setUserClient,
        updateDetails,
        registerAccountBank,
        removeAccountBank
      }}
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
