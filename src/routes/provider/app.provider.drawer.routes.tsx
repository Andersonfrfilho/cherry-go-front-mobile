import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { Home } from '../../screens/Home';
import { CarDetails } from '../../screens/CarDetails';
import { Scheduling } from '../../screens/Scheduling';
import { SchedulingDetails } from '../../screens/SchedulingDetails';
import { Confirmation } from '../../screens/Confirmation';
import { MyCars } from '../../screens/MyCars';
import { SelectArea } from '../../screens/SelectArea';
import { HomeProvider } from '../../screens/Providers/Home';
import { AppointmentsDetailsProvider } from '../../screens/Providers/Appointment/Details';
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
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
