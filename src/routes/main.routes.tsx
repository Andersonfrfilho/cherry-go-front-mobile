import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { SignUpFirstStep } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { SignUpThirdStep } from '../screens/SignUp/ThirdStep';
import { SignUpFourthStep } from '../screens/SignUp/FourthStep';
import { SignUpFifthStep } from '../screens/SignUp/FifthStep';
import { SignUpSixthStep } from '../screens/SignUp/SixthStep';
import { SignUpSevenStep } from '../screens/SignUp/SevenStep';
import { SignUpEighthStep } from '../screens/SignUp/EighthStep';
import { InternalServerErrorScreen } from '../screens/Errors/InternalErrors';
import { UnauthorizedErrorScreen } from '../screens/Errors/Unauthorized';
import { UnknownErrorScreen } from '../screens/Errors/UnknownErrors';
import { BadRequestErrorScreen } from '../screens/Errors/BadRequestErrors';
import { NotFoundErrorScreen } from '../screens/Errors/NotFoundErrors';
import { InitialRegister } from '../screens/SignUp/InitialRegister';
import { AuthRoutes } from './auth.routes';
import { RegisterRoutes } from './register.routes';
import { AppErrorsScreenStackRoutes } from './error.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function MainRoutes({ userClient }) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName={
        (userClient && !userClient.addresses) ||
        (userClient && !userClient.phones) ||
        (userClient && !userClient.documents)
          ? 'RegisterRoutes'
          : 'AuthRoutes'
      }
    >
      <Screen name="AuthRoutes" component={AuthRoutes} />
      <Screen name="RegisterRoutes" component={RegisterRoutes} />
      <Screen
        name="ErrorsStacksScreens"
        component={AppErrorsScreenStackRoutes}
      />
    </Navigator>
  );
}
