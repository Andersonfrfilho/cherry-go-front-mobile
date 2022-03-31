import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AppClientAppointmentStagesStackRoutes } from './appointments/stages/app.client.appointment.stages.stack.routes';
import { AppClientTabRoutes } from './app.client.tab.routes';
import { AppErrorsScreenStackRoutes } from '../error.routes';

const { Navigator, Screen } = createStackNavigator();

export function AppClientStackRoutes() {
  return (
    <Navigator
      initialRouteName="AppClientTabRoutes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="AppClientTabRoutes" component={AppClientTabRoutes} />
      <Screen
        name="ClientAppointmentStackRoutes"
        component={AppClientAppointmentStagesStackRoutes}
      />
      <Screen
        name="ErrorsStacksScreens"
        component={AppErrorsScreenStackRoutes}
      />
    </Navigator>
  );
}
