import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsAvailabilitiesLocalsProvider } from '../../../screens/Providers/Registrations/Locals';
import { RegistrationsAvailabilitiesAddressesProvider } from '../../../screens/Providers/Registrations/Locals/Address';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationLocalsStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsAvailabilitiesLocalsProviderStack"
    >
      <Screen
        name="RegistrationsAvailabilitiesLocalsProviderStack"
        component={RegistrationsAvailabilitiesLocalsProvider}
      />
      <Screen
        name="RegistrationsAvailabilitiesAddressesProviderStack"
        component={RegistrationsAvailabilitiesAddressesProvider}
      />
    </Navigator>
  );
}
