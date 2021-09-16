import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { LoadAnimation } from '../components/LoadAnimation';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Scheduling: undefined;
  SchedulingComplete: undefined;
  SchedulingDetails: undefined;
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: undefined;
  SignUpThirdStep: undefined;
  SignUpFourthStep: undefined;
  SignUpFifthStep: undefined;
  SignUpSixthStep: undefined;
  SignUpSevenStep: undefined;
};

export function Routes() {
  const { user, loading } = useAuth();
  return loading ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer independent>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
