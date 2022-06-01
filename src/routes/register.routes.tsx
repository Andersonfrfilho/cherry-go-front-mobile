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

import { InitialRegister } from '../screens/SignUp/InitialRegister';
import { PhoneConfirmation } from '../screens/SignUp/PhoneConfirmation';
import { AppErrorsScreenStackRoutes } from './error.routes';

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
      <Screen name="PhoneConfirmation" component={PhoneConfirmation} />
      <Screen
        name="ErrorsStacksScreens"
        component={AppErrorsScreenStackRoutes}
      />
    </Navigator>
  );
}
