import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { SelectArea } from '../screens/SelectArea';
import { AppClientTabRoutes } from './client/app.client.tab.routes';
import { AppProviderTabRoutes } from './provider/app.provider.tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackInitialRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="HomeProvider"
    >
      <Screen name="SelectArea" component={SelectArea} />
      <Screen name="HomeClient" component={AppClientTabRoutes} />
      <Screen name="HomeProvider" component={AppProviderTabRoutes} />
    </Navigator>
  );
}
