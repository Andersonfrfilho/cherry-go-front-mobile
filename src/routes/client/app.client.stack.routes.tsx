import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Home } from '../../screens/Home';
import { CarDetails } from '../../screens/CarDetails';
import { Scheduling } from '../../screens/Scheduling';
import { SchedulingDetails } from '../../screens/SchedulingDetails';
import { Confirmation } from '../../screens/Confirmation';
import { MyCars } from '../../screens/MyCars';
import { SelectArea } from '../screens/SelectArea';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppClientStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="HomeClient"
    >
      <Screen name="HomeClient" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
