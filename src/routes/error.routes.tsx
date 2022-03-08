import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { InternalServerErrorScreen } from '../screens/Errors/InternalErrors';
import { UnauthorizedErrorScreen } from '../screens/Errors/Unauthorized';
import { UnknownErrorScreen } from '../screens/Errors/UnknownErrors';
import { BadRequestErrorScreen } from '../screens/Errors/BadRequestErrors';
import { NotFoundErrorScreen } from '../screens/Errors/NotFoundErrors';
import { AppClientStackRoutes } from './client/app.client.stack.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppErrorStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="InternalServerErrorScreen"
    >
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
