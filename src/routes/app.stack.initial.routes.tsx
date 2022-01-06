import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { SelectArea } from '../screens/SelectArea';
import { AppProviderTabRoutes } from './provider/app.provider.tab.routes';
import { InternalServerErrorScreen } from '../screens/Errors/InternalErrors';
import { UnauthorizedErrorScreen } from '../screens/Errors/Unauthorized';
import { UnknownErrorScreen } from '../screens/Errors/UnknownErrors';
import { BadRequestErrorScreen } from '../screens/Errors/BadRequestErrors';
import { NotFoundErrorScreen } from '../screens/Errors/NotFoundErrors';
import { AppClientStackRoutes } from './client/app.client.stack.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackInitialRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="SelectArea"
    >
      <Screen name="SelectArea" component={SelectArea} />
      <Screen name="HomeClient" component={AppClientStackRoutes} />
      <Screen name="HomeProvider" component={AppProviderTabRoutes} />
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
