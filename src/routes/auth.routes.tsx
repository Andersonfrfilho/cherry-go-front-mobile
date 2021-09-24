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
import { SignUpFifthStep } from '../screens/SignUp/FifthStep';
import { SignUpSixthStep } from '../screens/SignUp/SixthStep';
import { SignUpSevenStep } from '../screens/SignUp/SevenStep';
import { SignUpEighthStep } from '../screens/SignUp/EighthStep';
import { ForgotPassword } from '../screens/SignIn/ForgotPassword';
import { ResetPassword } from '../screens/SignIn/ResetPassword';
import { SelectArea } from '../screens/SelectArea';

const { Navigator, Screen } = createNativeStackNavigator();

export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SingIn'
>;

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
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="SignUpThirdStep" component={SignUpThirdStep} />
      <Screen name="SignUpFourthStep" component={SignUpFourthStep} />
      <Screen name="SignUpFifthStep" component={SignUpFifthStep} />
      <Screen name="SignUpSixthStep" component={SignUpSixthStep} />
      <Screen name="SignUpSevenStep" component={SignUpSevenStep} />
      <Screen name="SignUpEighthStep" component={SignUpEighthStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
