import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Profile } from '../../screens/Profile';
import { MyCars } from '../../screens/MyCars';

import CarSvg from '../../assets/car.svg';
import PeopleSvg from '../../assets/people.svg';
import HomeSvg from '../../assets/home.svg';
import { HomeClient } from '../../screens/Home';
import { InternalServerErrorScreen } from '../../screens/Errors/InternalErrors';
import { UnauthorizedErrorScreen } from '../../screens/Errors/Unauthorized';
import { UnknownErrorScreen } from '../../screens/Errors/UnknownErrors';
import { BadRequestErrorScreen } from '../../screens/Errors/BadRequestErrors';
import { NotFoundErrorScreen } from '../../screens/Errors/NotFoundErrors';

const { Navigator, Screen } = createBottomTabNavigator();
export function AppClientTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
        tabBarStyle: { backgroundColor: theme.colors.header },
      }}
      initialRouteName="HomeClientTab"
    >
      <Screen
        name="HomeClientTab"
        component={HomeClient}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.background_primary,
          tabBarLabelStyle: {
            fontSize: RFValue(14),
            fontFamily: theme.fonts.primary_300,
          },
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="AppointmentClientTab"
        component={MyCars}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.background_primary,
          tabBarLabelStyle: {
            fontSize: RFValue(14),
            fontFamily: theme.fonts.primary_300,
          },
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="AppointmentProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.background_primary,
          tabBarLabelStyle: {
            fontSize: RFValue(14),
            fontFamily: theme.fonts.primary_300,
          },
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
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
