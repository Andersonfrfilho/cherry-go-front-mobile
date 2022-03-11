import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { TransitionPresets } from '@react-navigation/stack';

import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { HomeClient } from '../../screens/Home';
import { AppClientDrawerComponent } from './components/drawerClientHome';

const { Navigator, Screen } = createDrawerNavigator();

export function AppClientDrawerRoutes() {
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
      initialRouteName="HomeClientDrawer"
      drawerContent={props => <AppClientDrawerComponent {...props} />}
    >
      <Screen
        name="HomeClientDrawer"
        component={HomeClient}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: {
            fontSize: RFValue(24),
            fontFamily: theme.fonts.primary_300,
          },
        }}
      />
    </Navigator>
  );
}
