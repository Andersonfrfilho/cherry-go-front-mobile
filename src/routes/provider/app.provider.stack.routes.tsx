import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/core';
import { Home } from '../../screens/Home';
import { CarDetails } from '../../screens/CarDetails';
import { Scheduling } from '../../screens/Scheduling';
import { SchedulingDetails } from '../../screens/SchedulingDetails';
import { Confirmation } from '../../screens/Confirmation';
import { MyCars } from '../../screens/MyCars';
import { SelectArea } from '../../screens/SelectArea';
import { HomeProvider } from '../../screens/Providers/Home';
import { AppointmentsDetailsProvider } from '../../screens/Providers/Appointment/Details';
import { Appointment } from '../../hooks/providerUser';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppProviderNativeStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="HomeProviderStack"
    >
      <Screen name="HomeProviderStack" component={HomeProvider} />
      <Screen
        name="AppointmentsDetailsProvider"
        component={AppointmentsDetailsProvider}
      />
    </Navigator>
  );
}
