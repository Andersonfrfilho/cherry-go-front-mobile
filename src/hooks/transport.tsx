import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { TransportTypeProviderEnum } from '../enums/transportTypeProvider';
import { api } from '../services/api';

type TransportTypes = {
  id: string;
  name: TransportTypeProviderEnum;
  description: null;
  active: boolean;
  amount?: string;
};

type TransportContextData = {
  isTransportLoading: boolean;
  setIsTransportLoading: Dispatch<SetStateAction<boolean>>;
  transportTypes: TransportTypes[];
  setTransportTypes: Dispatch<SetStateAction<TransportTypes[]>>;
  getAllTransportTypes: () => Promise<void>;
};

interface TransportProviderProps {
  children: ReactNode;
}

const TransportContext = createContext<TransportContextData>(
  {} as TransportContextData,
);

function TransportProvider({ children }: TransportProviderProps) {
  const [isTransportLoading, setIsTransportLoading] = useState<boolean>(false);
  const [transportTypes, setTransportTypes] = useState<TransportTypes[]>(
    [] as TransportTypes[],
  );

  async function getAllTransportTypes() {
    const { data: transport_types } = await api.get(
      '/v1/users/transports/types',
    );
    setTransportTypes(transport_types);
  }

  return (
    <TransportContext.Provider
      value={{
        getAllTransportTypes,
        isTransportLoading,
        setIsTransportLoading,
        transportTypes,
        setTransportTypes,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
}

function useTransport(): TransportContextData {
  const context = useContext(TransportContext);
  return context;
}

export { TransportProvider, useTransport };
