import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsDetailsProvider } from '../../../screens/Providers/Registrations/Details';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationDetailsRoutesStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsDetailsProviderStack"
    >
      <Screen
        name="RegistrationsDetailsProviderStack"
        component={RegistrationsDetailsProvider}
      />
    </Navigator>
  );
}
