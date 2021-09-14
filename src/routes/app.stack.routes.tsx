import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { RootStackParamList } from '.';

const { Navigator, Screen } = createNativeStackNavigator();

export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{}} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
