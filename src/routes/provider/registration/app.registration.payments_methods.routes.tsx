import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsAvailabilitiesPaymentsMethodsProvider } from '../../../screens/Providers/Registrations/PaymentsMethods';
import { RegisterAccountBank } from '../../../screens/Providers/Registrations/PaymentsMethods/RegisterAccountBank';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationPaymentMethodsStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsAvailabilitiesPaymentsMethodsProviderStack"
    >
      <Screen
        name="RegistrationsAvailabilitiesPaymentsMethodsProviderStack"
        component={RegistrationsAvailabilitiesPaymentsMethodsProvider}
      />
      <Screen
        name="RegistrationsAccountBankProviderStack"
        component={RegisterAccountBank}
      />
    </Navigator>
  );
}
