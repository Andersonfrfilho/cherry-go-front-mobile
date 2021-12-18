import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProviderNativeRegistrationDetailsRoutesStackRoutes } from './app.registration.details.routes';
import { AppProviderNativeRegistrationPhotosStackRoutes } from './app.registration.photos.routes';
import { AppProviderNativeRegistrationAvailabilitiesStackRoutes } from './app.registration.availabilities.routes';
import { AppProviderNativeRegistrationPaymentMethodsStackRoutes } from './app.registration.payments_methods.routes';
import { AppProviderNativeRegistrationLocalsStackRoutes } from './app.registration.locals.routes';
import { AppProviderNativeRegistrationTransportTypesStackRoutes } from './app.registration.transports.routes';
import { AppProviderNativeRegistrationServicesStackRoutes } from './app.registration.services.routes';
import { RegistrationsProvider } from '../../../screens/Providers/Registrations';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationIndexStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsProviderRoutesProviderStack"
    >
      <Screen
        name="RegistrationsProviderRoutesProviderStack"
        component={RegistrationsProvider}
      />
      <Screen
        name="RegistrationsDetailsRoutesProviderStack"
        component={AppProviderNativeRegistrationDetailsRoutesStackRoutes}
      />
      <Screen
        name="RegistrationsPhotosRoutesProviderStack"
        component={AppProviderNativeRegistrationPhotosStackRoutes}
      />
      <Screen
        name="RegistrationsAvailabilitiesRoutesProviderStack"
        component={AppProviderNativeRegistrationAvailabilitiesStackRoutes}
      />
      <Screen
        name="AppProviderNativeRegistrationPaymentMethodsRoutesProviderStack"
        component={AppProviderNativeRegistrationPaymentMethodsStackRoutes}
      />
      <Screen
        name="RegistrationsAvailabilitiesLocalsRoutesProviderStack"
        component={AppProviderNativeRegistrationLocalsStackRoutes}
      />
      <Screen
        name="RegistrationsAvailabilitiesTransportTypesRoutesProviderStack"
        component={AppProviderNativeRegistrationTransportTypesStackRoutes}
      />
      <Screen
        name="RegistrationsAvailabilitiesServicesRoutesProviderStack"
        component={AppProviderNativeRegistrationServicesStackRoutes}
      />
    </Navigator>
  );
}
