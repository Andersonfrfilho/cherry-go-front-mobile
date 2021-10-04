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

  return isLoadingRouter ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer linking={linking} independent ref={navigationRef}>
      {userClient.id ? (
        userClient && userClient.types && userClient.types.length > 1 ? (
          <AppStackInitialRoutes />
        ) : (
          <AppClientTabRoutes />
        )
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
}
