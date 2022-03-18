import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/auth';
import { AuthRoutes } from './auth.routes';
import { LoadAnimation } from '../components/LoadAnimation';
import { linking } from './linking';
import { useClientUser } from '../hooks/clientUser';
import { useCommon } from '../hooks/common';
import { AppStackInitialRoutes } from './app.stack.initial.routes';
import { AppClientTabRoutes } from './client/app.client.tab.routes';
import { AppProvider } from '../hooks';
import { navigationRef } from './RootNavigation';
import { AppProviderTabRoutes } from './provider/app.provider.tab.routes';
import { RegisterRoutes } from './register.routes';
import { MainRoutes } from './main.routes';
import { AppClientStackRoutes } from './client/app.client.stack.routes';
import { USER_TYPES_ENUM } from '../enums/usersType.enum';

export type RootStackClientParamList = {
  HomeClientStack: undefined;
};

export type ScreenNavigationClientProp = NativeStackNavigationProp<
  RootStackClientParamList,
  'HomeClientStack'
>;

export type RootStackParamList = {
  Home: undefined;
  HomeTab: undefined;
  HomeTwo: undefined;
  SelectArea: undefined;
  CarDetails: undefined;
  Scheduling: undefined;
  SchedulingComplete: undefined;
  SchedulingDetails: undefined;
  Splash: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: undefined;
  SignUpThirdStep: undefined;
  SignUpFourthStep: undefined;
  SignUpFifthStep: undefined;
  SignUpSixthStep: undefined;
  SignUpSevenStep: undefined;
};
export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export function Routes() {
  const { isLoadingRouter } = useCommon();
  const { userClient } = useClientUser();
  if (isLoadingRouter) {
    return <LoadAnimation />;
  }

  return (
    <NavigationContainer linking={linking} independent ref={navigationRef}>
      {(() => {
        if (userClient.id) {
          if (
            userClient &&
            !!userClient.addresses &&
            !!userClient.phones &&
            !!userClient.documents &&
            userClient.documents.front &&
            userClient.documents.back &&
            userClient.types &&
            userClient.types.some(
              type => type.name === USER_TYPES_ENUM.PROVIDER,
            )
          ) {
            return <AppStackInitialRoutes />;
          }

          if (
            userClient &&
            !!userClient.addresses &&
            !!userClient.phones &&
            !!userClient.phones.active &&
            !!userClient.documents &&
            userClient.documents.front &&
            userClient.documents.back
          ) {
            return <AppClientStackRoutes />;
          }
        }

        return <MainRoutes userClient={userClient} />;
      })()}
    </NavigationContainer>
  );
}
