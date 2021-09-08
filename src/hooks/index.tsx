import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { CommonProvider } from './common';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <CommonProvider>
      <AuthProvider>{children}</AuthProvider>
    </CommonProvider>
  );
}

export { AppProvider };
