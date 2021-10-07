import React, { createContext, ReactNode, useContext } from 'react';
import { api } from '../services/api';
import { useCommon } from './common';
import { useError } from './error';

type AppointmentContextData = {
  confirmAppointmentProvider: (appointmentId: string) => Promise<void>;
  rejectedAppointmentProvider: (appointmentId: string) => Promise<void>;
};

interface AppointmentProviderProps {
  children: ReactNode;
}
const AppointmentContext = createContext<AppointmentContextData>(
  {} as AppointmentContextData,
);

function AppointmentProvider({ children }: AppointmentProviderProps) {
  const { setIsLoading } = useCommon();
  const { appErrorVerifyError } = useError();
  async function confirmAppointmentProvider(appointmentId: string) {
    setIsLoading(true);
    try {
      await api.patch('/v1/users/providers/appointment/confirm', {
        appointment_id: appointmentId,
      });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function rejectedAppointmentProvider(appointmentId: string) {
    setIsLoading(true);
    try {
      await api.patch('/v1/users/providers/appointment/reject', {
        appointment_id: appointmentId,
      });
    } catch (error) {
      appErrorVerifyError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppointmentContext.Provider
      value={{ confirmAppointmentProvider, rejectedAppointmentProvider }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

function useAppointment(): AppointmentContextData {
  const context = useContext(AppointmentContext);
  return context;
}

export { AppointmentProvider, useAppointment };
