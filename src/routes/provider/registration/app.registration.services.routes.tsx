import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsAvailabilitiesServicesProvider } from '../../../screens/Providers/Registrations/Services';
import { RegistrationsAvailabilitiesServicesAditionalProvider } from '../../../screens/Providers/Registrations/Services/RegisterServices';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationServicesStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsAvailabilitiesServicesProviderServiceStack"
    >
      <Screen
        name="RegistrationsAvailabilitiesServicesProviderServiceStack"
        component={RegistrationsAvailabilitiesServicesProvider}
      />
      <Screen
        name="RegistrationsAvailabilitiesServicesAditionalProviderServiceStack"
        component={RegistrationsAvailabilitiesServicesAditionalProvider}
      />
    </Navigator>
  );
}
