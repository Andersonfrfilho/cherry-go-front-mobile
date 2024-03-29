import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeProvider } from '../../screens/Providers/Home';
import { AppointmentsDetailsProvider } from '../../screens/Providers/Appointment/Details';

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
    </Navigator>
  );
}
