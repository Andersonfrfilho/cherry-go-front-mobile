import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { CommonProvider } from './common';
import { ClientUserProvider } from './clientUser';
import { ProviderUserProvider } from './providerUser';
import { UserProvider } from './user';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <CommonProvider>
      <UserProvider>
        <ClientUserProvider>
          <ProviderUserProvider>
            <AuthProvider>{children}</AuthProvider>
          </ProviderUserProvider>
        </ClientUserProvider>
      </UserProvider>
    </CommonProvider>
  );
}

export { AppProvider };
