import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
} from 'react';
import { GENDER_ENUM } from '../enums/genderType.enum';
import { api } from '../services/api';
import { useCommon } from './common';
import { UserClient } from './clientUser';
import { UserClientRegisterDTO } from './dtos/users';
import { useError } from './error';
import { userRepository } from '../databases/repository/user.repository';
import { AppError } from '../errors/AppError';

type ProviderUserContextData = {
  userProvider: UserProvider;
  setUserProvider: Dispatch<React.SetStateAction<UserProvider>>;
  registerProvider: (userData: UserClientRegisterDTO) => Promise<void>;
  loadUserData(): Promise<void>;
};

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
};

type Image_Profile = {
  id: string;
  user_id: string;
  image_id: string;
  created_at: string;
  image: Image;
};

export type Phone = {
  country_code: string;
  ddd: string;
  number: string;
  id: string;
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
};
type AddressesAppointment = {
  id: string;
  appointment_id: string;
  address_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  address: Addresses;
};
type TransportTypes = {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  created_at: string;
};

type Transport = {
  id: string;
  provider_id: string;
  appointment_id: string;
  amount: string;
  transport_type_id: string;
  origin_address_id: string;
  destination_address_id: string;
  confirm: true;
  initial_hour: string;
  departure_time: string;
  arrival_time_destination: string;
  arrival_time_return: string;
  return_time: string;
  created_at: string;
  transport_type: TransportTypes[];
  origin_address: Addresses;
  destination_address: Addresses;
};
type Service = {
  id: string;
  provider_id: string;
  appointment_id: string;
  service_id: string;
  created_at: string;
};

type ElementTransactionItem = {
  id: string;
  service: Service;
  created_at: string;
  service_id: string;
  updated_at: string;
  provider_id: string;
  appointment_id: string;
};

type TransactionItem = {
  id: string;
  transaction_id: string;
  elements: ElementTransactionItem;
  reference_key: string;
  type: string;
  increment_amount: number;
  discount_amount: number;
  amount: number;
  created_at: string;
};

type Transaction = {
  id: string;
  current_amount: string;
  original_amount: string;
  discount_amount: string;
  increment_amount: string;
  status: string;
  client_id: string;
  appointment_id: string;
  created_at: string;
  updated_at: string;
  itens: TransactionItem[];
};

export type Appointment = {
  id: string;
  initial_date: string;
  final_date: string;
  confirm: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  providers?: UserProvider[];
  clients: UserClient[];
  transports: Transport[];
  services?: Service[];
  addresses: AddressesAppointment[];
  transactions: Transaction[];
};
export type AppointmentsMode = {
  opens: Appointment[];
  rejected: Appointment[];
  confirmed: Appointment[];
};
export type UserProvider = {
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
  image_profile?: Image_Profile[];
  transactions?: Transaction[];
  token?: string;
  appointments?: AppointmentsMode;
  refresh_token?: string;
};

export type Token = {
  id?: string;
  token?: string;
  refresh_token?: string;
  user_id?: string;
};

interface ProviderUserProviderProps {
  children: ReactNode;
}
const ProviderUserContext = createContext<ProviderUserContextData>(
  {} as ProviderUserContextData,
);

function ProviderUserProvider({ children }: ProviderUserProviderProps) {
  const [userProvider, setUserProvider] = useState<UserProvider>(
    {} as UserProvider,
  );
  const { setIsLoading } = useCommon();
  const { appErrorVerifyError } = useError();

  async function loadUserData() {
    setIsLoading(true);
    try {
      const user = await userRepository.getUser();

      if (!user) {
        throw new AppError({
          message: 'Usuario não encontrado',
          status_code: 401,
          code: '1001',
        });
      }

      const headers = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {
        data: { provider, token, refresh_token },
      } = await api.get('/v1/users/providers/me', headers);

      if (token && provider) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserProvider({ ...provider, token, refresh_token });
      }
    } catch (err) {
      await appErrorVerifyError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function registerProvider(userData: UserClientRegisterDTO) {
    try {
      const { data } = await api.post('/v1/users/providers', userData);
      setUserProvider(data);
    } catch (err) {
      await appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  return (
    <ProviderUserContext.Provider
      value={{ registerProvider, loadUserData, userProvider, setUserProvider }}
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
