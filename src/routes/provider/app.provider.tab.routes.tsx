import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { Profile } from '../../screens/Profile';
import { MyCars } from '../../screens/MyCars';

import CarSvg from '../../assets/car.svg';
import PeopleSvg from '../../assets/people.svg';
import HomeSvg from '../../assets/home.svg';

import { AppProviderStackRoutes } from './app.provider.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();
export function AppProviderTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="HomeProviderStack"
    >
      <Screen
        name="HomeProviderStack"
        component={AppProviderStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" width={24} height={24} />
          ),
        }}
      />
    </Navigator>
  );
}
