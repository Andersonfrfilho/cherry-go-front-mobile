import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AppProviderNativeStackRoutes } from './app.provider.stack.routes';

const { Navigator, Screen } = createDrawerNavigator();

export function AppProviderDrawerRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
        drawerPosition: 'right',
      }}
      initialRouteName="HomeProviderDrawer"
    >
      <Screen
        name="HomeProviderDrawer"
        component={AppProviderNativeStackRoutes}
        options={{ drawerLabel: 'Home' }}
      />
    </Navigator>
  );
}
