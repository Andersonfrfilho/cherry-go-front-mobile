import React, { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';
import { useCommon } from './common';
import { useError } from './error';

export interface Bank {
  ispb: string;
  name: string;
  code: number | null;
  fullName: string;
}

type BankContextData = {
  getAllBanks(): Promise<void>;
  banks: Array<Bank>;
};

interface BankProviderProps {
  children: ReactNode;
}

const BankContext = createContext<BankContextData>({} as BankContextData);

function BankProvider({ children }: BankProviderProps) {
  const { setIsLoading } = useCommon();
  const { appErrorVerifyError } = useError();
  const [banks, setBanks] = useState<Array<Bank>>([] as Array<Bank>);

  async function getAllBanks() {
    setIsLoading(true);
    try {
      const { data: banks_request } = await api.get('/v1/users/banks');

      setBanks(banks_request);
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
    <BankContext.Provider value={{ getAllBanks, banks }}>
      {children}
    </BankContext.Provider>
  );
}

function useBank(): BankContextData {
  const context = useContext(BankContext);
  return context;
}

export { BankProvider, useBank };
