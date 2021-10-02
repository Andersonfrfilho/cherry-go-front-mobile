import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { SelectArea } from '../screens/SelectArea';
import { AppClientTabRoutes } from './client/app.client.tab.routes';
import { AppProviderTabRoutes } from './provider/app.provider.tab.routes';
import { InternalServerErrorScreen } from '../screens/Errors/InternalErrors';

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
      <Screen name="HomeClient" component={AppClientTabRoutes} />
      <Screen name="HomeProvider" component={AppProviderTabRoutes} />
      <Screen
        name="InternalServerErrorScreenProvider"
        component={InternalServerErrorScreen}
      />
    </Navigator>
  );
}
