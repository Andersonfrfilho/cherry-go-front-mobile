import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { CommonProvider } from './common';
import { ClientUserProvider } from './clientUser';
import { ProviderUserProvider } from './providerUser';
import { UserProvider } from './user';
import { TagProvider } from './tag';
import { ErrorProvider } from './error';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <CommonProvider>
      <ErrorProvider>
        <ClientUserProvider>
          <TagProvider>
            <UserProvider>
              <ProviderUserProvider>
                <AuthProvider>{children}</AuthProvider>
              </ProviderUserProvider>
            </UserProvider>
          </TagProvider>
        </ClientUserProvider>
      </ErrorProvider>
    </CommonProvider>
  );
}

export { AppProvider };
