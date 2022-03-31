import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { ClientAppointmentCreateProviderSelect } from '../../../../screens/Appointment/Create/ProviderSelect';
import { ClientAppointmentCreateHourSelect } from '../../../../screens/Appointment/Create/HourSelect';
import { ClientAppointmentCreateLocalSelect } from '../../../../screens/Appointment/Create/LocalSelect';
import { ClientAppointmentCreateTransportSelect } from '../../../../screens/Appointment/Create/TransportSelect';
import { ClientAppointmentCreatePaymentTypeSelect } from '../../../../screens/Appointment/Create/PaymentTypeSelect';
import { ClientAppointmentDetails } from '../../../../screens/Appointment/Details';
import { ClientAppointmentPaymentCard } from '../../../../screens/Appointment/Payment';
import { ClientAppointmentAnimationConfirm } from '../../../../screens/Appointment/ConfirmAnimation';

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
        component={ClientAppointmentCreateProviderSelect}
      />
      <Screen
        name="ClientAppointmentStagesProviderSelectHourStack"
        component={ClientAppointmentCreateHourSelect}
      />
      <Screen
        name="ClientAppointmentStagesProviderSelectLocalStack"
        component={ClientAppointmentCreateLocalSelect}
      />
      <Screen
        name="ClientAppointmentStagesProviderSelectTransportStack"
        component={ClientAppointmentCreateTransportSelect}
      />
      <Screen
        name="ClientAppointmentCreatePaymentTypeStack"
        component={ClientAppointmentCreatePaymentTypeSelect}
      />
      <Screen
        name="ClientAppointmentDetailsStack"
        component={ClientAppointmentDetails}
      />
      <Screen
        name="ClientAppointmentPaymentCardStack"
        component={ClientAppointmentPaymentCard}
      />
      <Screen
        name="ClientAppointmentAnimationConfirmStack"
        component={ClientAppointmentAnimationConfirm}
      />
    </Navigator>
  );
}
