import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { SignUpThirdStep } from '../screens/SignUp/ThirdStep';
import { RootStackParamList } from '.';
import { SignUpFourthStep } from '../screens/SignUp/FourthStep';

const { Navigator, Screen } = createNativeStackNavigator();

export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="SignUpThirdStep"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="SignUpThirdStep" component={SignUpThirdStep} />
      <Screen name="SignUpFourthStep" component={SignUpFourthStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
