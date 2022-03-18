import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { api } from '../services/api';
import { useCommon } from './common';
import { STATE_SIGLA_ENUM } from './enums/address.enum';
import { useError } from './error';
import { Addresses } from './clientUser';

interface AddressGeolocationResult {
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
}
type AddressContextData = {
  address: Addresses;
  states: State[];
  setStates: Dispatch<SetStateAction<State[]>>;
  loadingAddress: boolean;
  setLoadingAddress: Dispatch<SetStateAction<boolean>>;
  cities: string[];
  setCities: Dispatch<SetStateAction<string[]>>;
  getAllStates(): Promise<void>;
  getCitiesByState(state: string): Promise<string[]>;
  getGeolocationReverse(
    state: GetGeolocationReverseDTO,
  ): Promise<AddressGeolocationResult>;
  getGeolocationByAddress(address: string): Promise<AddressGeolocationResult>;
};

interface GetGeolocationReverseDTO {
  latitude: string;
  longitude: string;
}
interface Region {
  id: number;
  sigla: string;
  nome: string;
}

export interface State {
  id: number;
  sigla: STATE_SIGLA_ENUM;
  nome: string;
  regiao: Region;
}

interface AddressProviderProps {
  children: ReactNode;
}

const AddressContext = createContext<AddressContextData>(
  {} as AddressContextData,
);

function AddressProvider({ children }: AddressProviderProps) {
  const [states, setStates] = useState<State[]>([] as State[]);
  const [cities, setCities] = useState<string[]>([] as string[]);
  const [address, setAddress] = useState<Addresses>({} as Addresses);
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const { appErrorVerifyError } = useError();

  async function getAllStates() {
    setLoadingAddress(true);
    try {
      const { data: statesResponse } = await api.get(
        '/v1/users/addresses/states',
      );
      setStates(statesResponse);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setLoadingAddress(false);
    }
  }

  async function getCitiesByState(state: string) {
    setLoadingAddress(true);
    try {
      const { data: citiesResponse } = await api.get(
        `/v1/users/addresses/states/${state}/cities`,
      );
      setCities(citiesResponse);
      return citiesResponse;
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setLoadingAddress(false);
    }
  }

  async function getGeolocationReverse({
    longitude,
    latitude,
  }: GetGeolocationReverseDTO) {
    setLoadingAddress(true);
    try {
      const { data: addressResult } = await api.post(
        '/v1/users/locals/geolocation/reverse',
        {
          longitude,
          latitude,
        },
      );
      setAddress(addressResult);
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setLoadingAddress(false);
    }
  }

  async function getGeolocationByAddress(addressParam: string) {
    setLoadingAddress(true);
    try {
      const { data: addressResult } = await api.post(
        '/v1/users/locals/geolocation/address',
        {
          address: addressParam,
        },
      );
      setAddress(addressResult);
      return addressResult;
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setLoadingAddress(false);
    }
  }
  return (
    <AddressContext.Provider
      value={{
        address,
        states,
        setStates,
        cities,
        setCities,
        loadingAddress,
        setLoadingAddress,
        getAllStates,
        getCitiesByState,
        getGeolocationReverse,
        getGeolocationByAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

function useAddress(): AddressContextData {
  const context = useContext(AddressContext);
  return context;
}

export { AddressProvider, useAddress };
