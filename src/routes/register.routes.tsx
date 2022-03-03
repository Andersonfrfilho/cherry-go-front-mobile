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

const { Navigator, Screen } = createNativeStackNavigator();

export function RegisterRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="InitialRegister"
    >
      <Screen name="InitialRegister" component={InitialRegister} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="SignUpThirdStep" component={SignUpThirdStep} />
      <Screen name="SignUpFourthStep" component={SignUpFourthStep} />
      <Screen name="SignUpFifthStep" component={SignUpFifthStep} />
      <Screen name="SignUpSixthStep" component={SignUpSixthStep} />
      <Screen name="SignUpSevenStep" component={SignUpSevenStep} />
      <Screen name="SignUpEighthStep" component={SignUpEighthStep} />
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
