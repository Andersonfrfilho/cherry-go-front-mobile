import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from 'styled-components';
import { AppProviderNativeStackRoutes } from './app.provider.stack.routes';
import { AppProviderDrawerComponent } from './components/drawerProviderHome';

const { Navigator, Screen } = createDrawerNavigator();

export function AppProviderDrawerRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: theme.colors.header,
        },
        drawerActiveBackgroundColor: theme.colors.background_primary,
        drawerActiveTintColor: theme.colors.main_light,
      }}
      initialRouteName="HomeProviderDrawer"
      drawerContent={props => <AppProviderDrawerComponent {...props} />}
    >
      <Screen
        name="HomeProviderDrawer"
        component={AppProviderNativeStackRoutes}
        options={{ drawerLabel: 'Home' }}
      />
    </Navigator>
  );
}
