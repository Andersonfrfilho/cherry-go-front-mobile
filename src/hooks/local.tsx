import React, { createContext, ReactNode, useContext, useState } from 'react';
import { LOCALS_TYPES_ENUM } from '../enums/localsTypes.enum';
import { api } from '../services/api';
import { useAddress } from './address';
import { useCommon } from './common';
import { useError } from './error';
import { useProviderUser } from './providerUser';

type LocalContextData = {
  getAllLocalsAvailable(): Promise<void>;
  registerLocalProvider(data: RegisterLocalProviderDTO): Promise<void>;
  deleteLocalProvider(locals_provider_ids: string[]): Promise<void>;
  localsTypes: Array<string>;
};

interface LocalProviderProps {
  children: ReactNode;
}
interface RegisterLocalProviderDTO {
  zipcode: string;
  street: string;
  number: string;
  district: string;
  state: string;
  complement: string;
  reference: string;
  country: string;
  amount: number;
  longitude?: string;
  latitude?: string;
}
const LocalContext = createContext<LocalContextData>({} as LocalContextData);

function LocalProvider({ children }: LocalProviderProps) {
  const { setIsLoading } = useCommon();
  const { appErrorVerifyError } = useError();
  const { userProvider, setUserProvider } = useProviderUser();

  const [localsTypes, setLocalsTypes] = useState<LOCALS_TYPES_ENUM[]>(
    [] as LOCALS_TYPES_ENUM[],
  );
  const [locals, setLocals] = useState<LOCALS_TYPES_ENUM[]>(
    [] as LOCALS_TYPES_ENUM[],
  );

  async function getAllLocalsAvailable() {
    setIsLoading(true);
    try {
      const {
        data: { locals_types, locals: locals_available },
      } = await api.get('/v1/users/locals/types');
      setUserProvider({
        ...userProvider,
        locals: locals_available,
        locals_types,
      });
      setLocalsTypes(locals_types);
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function registerLocalProvider(data: RegisterLocalProviderDTO) {
    setIsLoading(true);
    try {
      const { data: locals_available } = await api.post(
        '/v1/users/providers/locals',
        data,
      );
      setUserProvider({ ...userProvider, locals: locals_available });
      setLocals(locals_available);
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteLocalProvider(data: string[]) {
    setIsLoading(true);
    try {
      const { data: locals_available } = await api.delete(
        '/v1/users/providers/locals',
        {
          data: {
            provider_addresses_ids: data,
          },
        },
      );
      setUserProvider({ ...userProvider, locals: locals_available });
      setLocals(locals_available);
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LocalContext.Provider
      value={{
        getAllLocalsAvailable,
        localsTypes,
        registerLocalProvider,
        deleteLocalProvider,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}

function useLocal(): LocalContextData {
  const context = useContext(LocalContext);
  return context;
}

export { LocalProvider, useLocal };
