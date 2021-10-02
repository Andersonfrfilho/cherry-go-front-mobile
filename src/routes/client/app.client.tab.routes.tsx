import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { Profile } from '../../screens/Profile';
import { MyCars } from '../../screens/MyCars';

import CarSvg from '../../assets/car.svg';
import PeopleSvg from '../../assets/people.svg';
import HomeSvg from '../../assets/home.svg';
import { AppClientStackRoutes } from './app.client.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();
export function AppClientTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="HomeClientStack"
    >
      <Screen
        name="HomeClientStack"
        component={AppClientStackRoutes}
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
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
