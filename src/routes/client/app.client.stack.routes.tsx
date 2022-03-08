import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import { AppClientAppointmentStagesStackRoutes } from './appointments/stages/app.client.appointment.stages.stack.routes';
import { AppClientTabRoutes } from './app.client.tab.routes';
import { InternalServerErrorScreen } from '../../screens/Errors/InternalErrors';
import { UnauthorizedErrorScreen } from '../../screens/Errors/Unauthorized';
import { UnknownErrorScreen } from '../../screens/Errors/UnknownErrors';
import { BadRequestErrorScreen } from '../../screens/Errors/BadRequestErrors';
import { NotFoundErrorScreen } from '../../screens/Errors/NotFoundErrors';

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
      <Screen
        name="InternalServerErrorScreen"
        component={InternalServerErrorScreen}
      />
      <Screen
        name="UnauthorizedErrorScreen"
        component={UnauthorizedErrorScreen}
      />
      <Screen name="UnknownErrorScreen" component={UnknownErrorScreen} />
      <Screen name="BadRequestErrorScreen" component={BadRequestErrorScreen} />
      <Screen name="NotFoundErrorScreen" component={NotFoundErrorScreen} />
    </Navigator>
  );
}
