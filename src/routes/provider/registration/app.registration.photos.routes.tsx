import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationsPhotosProvider } from '../../../screens/Providers/Registrations/Photos';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeRegistrationPhotosStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="RegistrationsPhotosProviderStack"
    >
      <Screen
        name="RegistrationsPhotosProviderStack"
        component={RegistrationsPhotosProvider}
      />
    </Navigator>
  );
}
