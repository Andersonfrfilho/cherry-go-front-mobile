import React, { ReactNode, useContext } from 'react';

import {
  NavigationContainer,
  NavigationContext,
} from '@react-navigation/native';
import { AuthProvider } from './auth';
import { CommonProvider } from './common';
import { ClientUserProvider } from './clientUser';
import { ProviderUserProvider } from './providerUser';
import { UserProvider } from './user';
import { TagProvider } from './tag';
import { ErrorProvider } from './error';
import { NavigationProvider } from './navigation';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <CommonProvider>
      <ErrorProvider>
        <UserProvider>
          <ClientUserProvider>
            <ProviderUserProvider>
              <TagProvider>
                <AuthProvider>{children}</AuthProvider>
              </TagProvider>
            </ProviderUserProvider>
          </ClientUserProvider>
        </UserProvider>
      </ErrorProvider>
    </CommonProvider>
  );
}

export { AppProvider };
