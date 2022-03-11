import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { SelectArea } from '../screens/SelectArea';
import { AppProviderTabRoutes } from './provider/app.provider.tab.routes';

import { AppClientStackRoutes } from './client/app.client.stack.routes';
import { AppErrorsScreenStackRoutes } from './error.routes';

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
        name="ErrorsStacksScreens"
        component={AppErrorsScreenStackRoutes}
      />
    </Navigator>
  );
}
