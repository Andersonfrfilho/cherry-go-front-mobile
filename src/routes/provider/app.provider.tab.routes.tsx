import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Profile } from '../../screens/Profile';
import { MyCars } from '../../screens/MyCars';

import { AppProviderDrawerRoutes } from './app.provider.drawer.routes';
import { RegistrationsProvider } from '../../screens/Providers/Registrations';

const { Navigator, Screen } = createBottomTabNavigator();
export function AppProviderTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
        tabBarStyle: { backgroundColor: theme.colors.header },
      }}
      initialRouteName="HomeTabProvider"
    >
      <Screen
        name="HomeTabProvider"
        component={AppProviderDrawerRoutes}
        options={{
          tabBarLabel: 'Novidades',
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.background_primary,
          tabBarLabelStyle: {
            fontSize: RFValue(14),
            fontFamily: theme.fonts.primary_300,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="refresh-ccw" size={RFValue(24)} color={color} />
          ),
        }}
      />
      <Screen
        name="RegisterTabProvider"
        component={RegistrationsProvider}
        options={{
          tabBarLabel: 'Cadastros',
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.background_primary,
          tabBarLabelStyle: {
            fontSize: RFValue(14),
            fontFamily: theme.fonts.primary_300,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={RFValue(24)} color={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.background_primary,
          tabBarLabelStyle: {
            fontSize: RFValue(14),
            fontFamily: theme.fonts.primary_300,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={RFValue(24)} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
