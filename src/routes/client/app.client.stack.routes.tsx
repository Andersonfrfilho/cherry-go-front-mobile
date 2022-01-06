import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import { AppClientAppointmentStagesStackRoutes } from './appointments/stages/app.client.appointment.stages.stack.routes';
import { AppClientTabRoutes } from './app.client.tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppClientStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="AppClientTabRoutes"
    >
      <Screen name="AppClientTabRoutes" component={AppClientTabRoutes} />
      <Screen
        name="ClientAppointmentStackRoutes"
        component={AppClientAppointmentStagesStackRoutes}
      />
    </Navigator>
  );
}
