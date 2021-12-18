import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsAvailabilitiesTransportTypesProvider } from '../../../screens/Providers/Registrations/TransportTypes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationTransportTypesStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsAvailabilitiesTransportTypesProviderStack"
    >
      <Screen
        name="RegistrationsAvailabilitiesTransportTypesProviderStack"
        component={RegistrationsAvailabilitiesTransportTypesProvider}
      />
    </Navigator>
  );
}
