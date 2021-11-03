import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeProvider } from '../../screens/Providers/Home';
import { AppointmentsDetailsProvider } from '../../screens/Providers/Appointment/Details';
import { RegistrationsDetailsProvider } from '../../screens/Providers/Registrations/Details';
import { RegistrationsPhotosProvider } from '../../screens/Providers/Registrations/Photos';
import { RegistrationsAvailabilitiesProvider } from '../../screens/Providers/Registrations/Availabilities';
import { RegistrationsAvailabilitiesDaysProvider } from '../../screens/Providers/Registrations/Availabilities/Days';
import { RegistrationsAvailabilitiesHoursProvider } from '../../screens/Providers/Registrations/Availabilities/Hours';
import { RegistrationsAvailabilitiesPaymentsMethodsProvider } from '../../screens/Providers/Registrations/PaymentsMethods';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="HomeProviderStack"
    >
      <Screen name="HomeProviderStack" component={HomeProvider} />
      <Screen
        name="AppointmentsDetailsProvider"
        component={AppointmentsDetailsProvider}
      />
      <Screen
        name="RegistrationsDetailsProviderStack"
        component={RegistrationsDetailsProvider}
      />
      <Screen
        name="RegistrationsPhotosProviderStack"
        component={RegistrationsPhotosProvider}
      />
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
      <Screen
        name="RegistrationsAvailabilitiesPaymentsMethodsProviderStack"
        component={RegistrationsAvailabilitiesPaymentsMethodsProvider}
      />
    </Navigator>
  );
}
