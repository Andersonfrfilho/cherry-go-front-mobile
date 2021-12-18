import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsAvailabilitiesProvider } from '../../../screens/Providers/Registrations/Availabilities';
import { RegistrationsAvailabilitiesDaysProvider } from '../../../screens/Providers/Registrations/Availabilities/Days';
import { RegistrationsAvailabilitiesHoursProvider } from '../../../screens/Providers/Registrations/Availabilities/Hours';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationAvailabilitiesStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsAvailabilitiesProviderStack"
    >
      <Screen
        name="RegistrationsAvailabilitiesProviderStack"
        component={RegistrationsAvailabilitiesProvider}
      />
      <Screen
        name="RegistrationsAvailabilitiesDaysProviderStack"
        component={RegistrationsAvailabilitiesDaysProvider}
      />
      <Screen
        name="RegistrationsAvailabilitiesHoursProviderStack"
        component={RegistrationsAvailabilitiesHoursProvider}
      />
    </Navigator>
  );
}
