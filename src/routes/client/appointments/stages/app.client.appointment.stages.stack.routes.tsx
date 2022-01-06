import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { ProviderSelect } from '../../../../screens/Appointment/Create/ProviderSelect';
import { HourSelect } from '../../../../screens/Appointment/Create/HourSelect';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppClientAppointmentStagesStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="ClientAppointmentStagesProviderSelectServiceStack"
    >
      <Screen
        name="ClientAppointmentStagesProviderSelectServiceStack"
        component={ProviderSelect}
      />
      <Screen
        name="ClientAppointmentStagesProviderSelectHourStack"
        component={HourSelect}
      />
    </Navigator>
  );
}
