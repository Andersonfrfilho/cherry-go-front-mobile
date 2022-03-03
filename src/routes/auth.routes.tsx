import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';

import { ForgotPassword } from '../screens/SignIn/ForgotPassword';
import { ResetPassword } from '../screens/SignIn/ResetPassword';
import { InternalServerErrorScreen } from '../screens/Errors/InternalErrors';
import { UnauthorizedErrorScreen } from '../screens/Errors/Unauthorized';
import { UnknownErrorScreen } from '../screens/Errors/UnknownErrors';
import { BadRequestErrorScreen } from '../screens/Errors/BadRequestErrors';
import { NotFoundErrorScreen } from '../screens/Errors/NotFoundErrors';
import { ResendEmailActive } from '../screens/SignIn/ResendEmailActive';
import { RegisterRoutes } from './register.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="ResetPassword" component={ResetPassword} />
      <Screen name="Confirmation" component={Confirmation} />
      {/* <Screen name="SignUpFirstStepStack" component={RegisterRoutes} /> */}
      <Screen name="ResendEmailActiveStack" component={ResendEmailActive} />
      <Screen
        name="InternalServerErrorScreen"
        component={InternalServerErrorScreen}
      />
      <Screen
        name="UnauthorizedErrorScreen"
        component={UnauthorizedErrorScreen}
      />
      <Screen name="UnknownErrorScreen" component={UnknownErrorScreen} />
      <Screen name="BadRequestErrorScreen" component={BadRequestErrorScreen} />
      <Screen name="NotFoundErrorScreen" component={NotFoundErrorScreen} />
    </Navigator>
  );
}
