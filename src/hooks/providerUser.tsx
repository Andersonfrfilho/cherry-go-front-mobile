import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
} from 'react';
import { Platform } from 'react-native';
import { string } from 'yup/lib/locale';
import { GENDER_ENUM } from '../enums/genderType.enum';
import { api } from '../services/api';
import { useCommon } from './common';
import { ClientAppointment, UserClient } from './clientUser';
import { UploadImagesProviderDTO, UserClientRegisterDTO } from './dtos/users';
import { useError } from './error';
import { userRepository } from '../databases/repository/user.repository';
import { AppError } from '../errors/AppError';
import { UpdateImagesPositionProviderDTO } from './dtos/users/UpdateImagesPositionProvider.dto';
import { DeleteImagesProviderDTO } from './dtos/users/DeleteImagesProvider.dto';
import { DAYS_WEEK_ENUM } from '../enums/DaysProviders.enum';
import { PAYMENT_TYPES_ENUM } from '../enums/PaymentTypes.enum';
import { STRIPE_PAYMENT_REQUIRES_ENUM } from '../enums/stripe.enums';
import { LOCALS_TYPES_ENUM } from '../enums/localsTypes.enum';
import { TransportTypeProviderEnum } from '../enums/transportTypeProvider';

interface RegisterServiceProviderDTO {
  amount: string;
  duration: number;
  name: string;
  tags: string[];
}

type ProviderUserContextData = {
  userProvider: UserProvider;
  setUserProvider: Dispatch<React.SetStateAction<UserProvider>>;
  requirementRegister: boolean;
  registerProvider: (userData: UserClientRegisterDTO) => Promise<void>;
  loadUserData(): Promise<void>;
  uploadImagesProvider(data: UploadImagesProviderDTO): Promise<void>;
  updateImagesPositionProvider(
    data: UpdateImagesPositionProviderDTO[],
  ): Promise<void>;
  deleteImagesProvider(data: DeleteImagesProviderDTO): Promise<void>;
  loadAvailableDaysToProviderWork(): Promise<void>;
  daysAvailable: ResponseGetAllAvailableDaysToProviderWorkService[];
  hoursAvailable: Array<string>;
  availableDaysToProviderWork(days: DAYS_WEEK_ENUM[]): Promise<void>;
  addHoursProviderWorkAvailable(
    data: HandleAddHoursAvailableParams,
  ): Promise<void>;
  removeHourProviderWorkAvailable(id: string): Promise<void>;
  paymentTypesAvailable: Payment[];
  getAllPaymentTypesAvailable(): Promise<void>;
  addPaymentTypesAvailableProvider(
    paymentsTypes: PAYMENT_TYPES_ENUM[],
  ): Promise<void>;
  getAllRequirementRegister(): Promise<void>;
  updatePaymentAccountPerson(): Promise<void>;
  getAllLocalsTypesAvailable(): Promise<void>;
  deleteLocalsTypesAvailable(localTypeIds: string[]): Promise<void>;
  createLocalsTypesAvailable(localsTypes: string[]): Promise<void>;
  addLocalSProvider(data: AddLocalsProviderDTO): Promise<void>;
  createUpdateTransportTypeByProvider(
    elements: TransportsSelects[],
  ): Promise<void>;
  registerServiceProvider(data: RegisterServiceProviderDTO): Promise<void>;
  deleteServiceProvider(service_id: string): Promise<void>;
};
type ProviderDaysAvailability = {
  id: string;
  day: DAYS_WEEK_ENUM;
  provider_id: string;
};
export type ProviderHoursAvailability = {
  id: string;
  start_time: string;
  end_time: string;
  provider_id: string;
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
  position: string;
  rating: string;
  created_at: string;
  image: Image;
};

export type Phone = {
  country_code: string;
  ddd: string;
  number: string;
  id: string;
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
type AddressesAppointment = {
  id: string;
  appointment_id: string;
  address_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  address: Addresses;
};
export enum TRANSPORT_TYPES_ENUM {
  UBER = 'uber',
  CLIENT = 'client',
  PROVIDER = 'provider',
}

export const TRANSPORT_TYPES_NAME_PT_BR_ENUM = {
  uber: 'Uber',
  client: 'Próprio',
  provider: 'Provedor(a)',
};

export const PAYMENTS_TYPES_NAME_PT_BR_ENUM = {
  pix: 'Pix',
  money: 'Dinheiro',
  debit: 'Cartão de Débito',
  credit: 'Cartão de Crédito',
};

export type TransportType = {
  id: string;
  name: TRANSPORT_TYPES_ENUM;
  description?: any;
  active: boolean;
};
export type ProviderTransportTypes = {
  id: string;
  provider_id: string;
  transport_type_id: string;
  details?: any;
  name: TransportTypeProviderEnum;
  description?: string;
  amount?: number;
  active: boolean;
  created_at: string;
  transport_type: TransportType;
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
  transport_type: TransportType;
  origin_address: Addresses;
  destination_address: Addresses;
};
type Service = {
  id: string;
  provider_id: string;
  appointment_id: string;
  name: string;
  service_id: string;
  created_at: string;
  active: boolean;
  amount: string;
  duration: string;
};

type ElementTransactionItem = {
  id: string;
  provider_id: string;
  name: string;
  service_id: string;
  created_at: string;
  active: boolean;
  amount: string;
  duration: string;
};

type TransactionItem = {
  id: string;
  transaction_id: string;
  elements: ElementTransactionItem;
  reference_key: string;
  type: string;
  increment_amount: string;
  discount_amount: string;
  amount: string;
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
  providers: UserProvider[];
  clients: ClientAppointment[];
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
export type Image_Provider = {
  id: string;
  provider_id: string;
  image_id: string;
  position: string;
  rating: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  image: Image;
};
type Payment = {
  id: string;
  name: PAYMENT_TYPES_ENUM;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: null;
  deleted_at: null;
};

export type PaymentType = {
  id: string;
  provider_id: string;
  payment_type_id: string;
  active: boolean;
  payment: Payment;
};
interface DataBank {
  name: string;
  id: string;
}

interface StripeAccount {
  id: string;
  bank_accounts: Array<DataBank>;
}
interface Stripe {
  account: StripeAccount;
  customer: StripeAccount;
}

interface BankAccount {
  name: string;
}

export interface Details {
  stripe?: Stripe;
  fantasy_name?: string;
  color_hair?: string;
  nuance_hair?: string;
  style_hair?: string;
  height?: number;
  weight?: number;
  description?: string;
  ethnicity?: string;
  color_eye?: string;
}
export type LocalType = {
  id: string;
  provider_id: string;
  local_type: LOCALS_TYPES_ENUM;
  active: boolean;
};
export type Local = {
  id: string;
  provider_id: string;
  address_id: string;
  active: boolean;
  amount: string;
  details: any;
  address: Addresses;
};
type Tag = {
  id: string;
  name: string;
  description?: null;
  image: Image;
};
export type Services = {
  id: string;
  name: string;
  amount: number;
  duration: number;
  active: boolean;
  details?: null | any;
  provider_id: string;
  tags: Tag[];
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
  status: string;
  gender: GENDER_ENUM;
  details?: Details;
  phones?: Phone[];
  addresses?: Addresses[];
  types?: User_Type[];
  term?: Term[];
  locals?: Local[];
  locals_types: LocalType[];
  transports_types?: ProviderTransportTypes[];
  image_profile?: Image_Profile[];
  transactions?: Transaction[];
  token?: string;
  appointments?: AppointmentsMode;
  refresh_token?: string;
  images?: Image_Provider[];
  days?: ProviderDaysAvailability[];
  hours?: ProviderHoursAvailability[];
  payments_types?: PaymentType[];
  services?: Services[];
  ratings?: number;
  favorite?: boolean;
};

interface HandleAddHoursAvailableParams {
  startHour: string;
  endHour: string;
}

interface AddLocalsProviderDTO {
  zipcode: string;
  address: string;
  number: string;
  district: string;
  state: string;
  complement: string;
  reference: string;
  country: string;
  amount: string;
}

export type Token = {
  id?: string;
  token?: string;
  refresh_token?: string;
  user_id?: string;
};

type TransportsSelects = {
  transport_type_id: string;
  amount: string | undefined;
};
interface ProviderUserProviderProps {
  children: ReactNode;
}
const ProviderUserContext = createContext<ProviderUserContextData>(
  {} as ProviderUserContextData,
);

export interface ResponseGetAllAvailableDaysToProviderWorkService {
  day: DAYS_WEEK_ENUM;
}

function ProviderUserProvider({ children }: ProviderUserProviderProps) {
  const [userProvider, setUserProvider] = useState<UserProvider>(
    {} as UserProvider,
  );
  const [daysAvailable, setDaysAvailable] = useState<
    ResponseGetAllAvailableDaysToProviderWorkService[]
  >([] as ResponseGetAllAvailableDaysToProviderWorkService[]);
  const [hoursAvailable, setHoursAvailable] = useState<Array<string>>(
    [] as Array<string>,
  );
  const [paymentTypesAvailable, setPaymentTypesAvailable] = useState<Payment[]>(
    [] as Payment[],
  );
  const [requirementRegister, setRequirementRegister] = useState<boolean>(true);
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
      appErrorVerifyError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function registerProvider(userData: UserClientRegisterDTO) {
    try {
      const { data } = await api.post('/v1/users/providers', userData);
      setUserProvider(data);
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function uploadImagesProvider({
    imagesUri,
    token,
  }: UploadImagesProviderDTO) {
    setIsLoading(true);
    try {
      const formData = new FormData();

      imagesUri.forEach(imageUri => {
        const fileName = imageUri.split('/').pop();

        if (!fileName) {
          throw new AppError({
            message: '',
            status_code: 600,
            code: '0004',
          });
        }

        const match = /\.(\w+)$/.exec(fileName);

        const type = match ? `image/${match[1]}` : `image`;

        formData.append('photos', {
          uri:
            Platform.OS === 'android'
              ? imageUri
              : imageUri.replace('file://', ''),
          name: fileName,
          type,
        });
      });

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      };
      await api.post('/v1/users/providers/photos', formData, config);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateImagesPositionProvider(
    data: UpdateImagesPositionProviderDTO[],
  ) {
    setIsLoading(true);
    try {
      await api.patch('/v1/users/providers/photos', data);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteImagesProvider({
    images,
    token,
  }: DeleteImagesProviderDTO) {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          images,
        },
      };
      await api.delete('/v1/users/providers/photos', config);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAvailableDaysToProviderWork() {
    setIsLoading(true);
    try {
      const { data: availabilities } = await api.get(
        '/v1/users/providers/availabilities',
      );
      setDaysAvailable(availabilities.days);
      setHoursAvailable(availabilities.hours);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function availableDaysToProviderWork(days: DAYS_WEEK_ENUM[]) {
    setIsLoading(true);
    try {
      await api.patch('/v1/users/providers/days', {
        days,
      });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addHoursProviderWorkAvailable({
    startHour,
    endHour,
  }: HandleAddHoursAvailableParams): Promise<void> {
    setIsLoading(true);
    try {
      const { data } = await api.patch('/v1/users/providers/hours', {
        start_hour: startHour,
        end_hour: endHour,
      });
      setUserProvider({ ...userProvider, hours: data });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeHourProviderWorkAvailable(
    idHour: string,
  ): Promise<void> {
    setIsLoading(true);
    try {
      const { data } = await api.delete('/v1/users/providers/hours', {
        data: { hour_id: idHour },
      });
      setUserProvider({ ...userProvider, hours: data });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllPaymentTypesAvailable(): Promise<void> {
    setIsLoading(true);
    try {
      const { data } = await api.get('/v1/users/providers/payments_types');
      setPaymentTypesAvailable(data);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addPaymentTypesAvailableProvider(
    paymentsTypes: PAYMENT_TYPES_ENUM[],
  ): Promise<void> {
    setIsLoading(true);
    try {
      const { data } = await api.patch('/v1/users/providers/payment_type', {
        payments_types: paymentsTypes,
      });
      setUserProvider({ ...userProvider, payments_types: data });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllLocalsTypesAvailable(): Promise<void> {
    setIsLoading(true);
    try {
      const {
        data: { locals, locals_types },
      } = await api.get('/v1/users/providers/locals/types');
      setUserProvider({ ...userProvider, locals, locals_types });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createLocalsTypesAvailable(
    localsTypes: string[],
  ): Promise<void> {
    setIsLoading(true);
    try {
      const data = {
        locals_types: localsTypes,
      };
      const {
        data: { locals, locals_types },
      } = await api.post('/v1/users/providers/locals/types', data);
      setUserProvider({ ...userProvider, locals, locals_types });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteLocalsTypesAvailable(
    localTypeIds: string[],
  ): Promise<void> {
    setIsLoading(true);
    try {
      const data = {
        provider_locals_types_ids: localTypeIds,
      };

      const {
        data: { locals, locals_types },
      } = await api.delete('/v1/users/providers/locals/types', { data });

      setUserProvider({ ...userProvider, locals, locals_types });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllRequirementRegister(): Promise<void> {
    setIsLoading(true);
    try {
      const { data } = await api.get<Array<string>>(
        '/v1/users/providers/verify/payment/infos',
      );

      setRequirementRegister(
        !data.every(
          requirement =>
            requirement === STRIPE_PAYMENT_REQUIRES_ENUM.EXTERNAL_ACCOUNT,
        ),
      );
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updatePaymentAccountPerson(): Promise<void> {
    setIsLoading(true);
    try {
      await api.put('/v1/users/providers/update/payment/person');
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addLocalSProvider(data: AddLocalsProviderDTO): Promise<void> {
    setIsLoading(true);
    try {
      await api.put('/v1/users/providers/update/payment/person');
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getTranportTypesProvider(): Promise<void> {
    setIsLoading(true);
    try {
      await api.get('/v1/users/providers/update/payment/person');
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createUpdateTransportTypeByProvider(
    elements: TransportsSelects[],
  ) {
    setIsLoading(true);
    try {
      const { data: transport_types } = await api.patch(
        '/v1/users/providers/transports/types',
        {
          transports_types: elements,
        },
      );
      setUserProvider({ ...userProvider, transports_types: transport_types });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function registerServiceProvider({
    amount,
    duration,
    name,
    tags,
  }: RegisterServiceProviderDTO) {
    setIsLoading(true);
    try {
      await api.post('/v1/users/providers/services', {
        amount,
        duration,
        name,
        tags_id: tags,
      });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteServiceProvider(service_id: string) {
    setIsLoading(true);
    try {
      const { data: services } = await api.delete(
        '/v1/users/providers/services',
        {
          data: {
            service_id,
          },
        },
      );
      setUserProvider({ ...userProvider, services });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProviderUserContext.Provider
      value={{
        registerProvider,
        loadUserData,
        userProvider,
        setUserProvider,
        uploadImagesProvider,
        updateImagesPositionProvider,
        deleteImagesProvider,
        loadAvailableDaysToProviderWork,
        daysAvailable,
        hoursAvailable,
        availableDaysToProviderWork,
        addHoursProviderWorkAvailable,
        removeHourProviderWorkAvailable,
        paymentTypesAvailable,
        getAllPaymentTypesAvailable,
        addPaymentTypesAvailableProvider,
        getAllRequirementRegister,
        requirementRegister,
        updatePaymentAccountPerson,
        getAllLocalsTypesAvailable,
        deleteLocalsTypesAvailable,
        createLocalsTypesAvailable,
        addLocalSProvider,
        createUpdateTransportTypeByProvider,
        registerServiceProvider,
        deleteServiceProvider,
      }}
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
