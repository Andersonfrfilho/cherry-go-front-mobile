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

const { Navigator, Screen } = createNativeStackNavigator();

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
};

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
      initialRouteName="SignUpFirstStep"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
