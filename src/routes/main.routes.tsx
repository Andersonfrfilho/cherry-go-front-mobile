import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { AuthRoutes } from './auth.routes';
import { RegisterRoutes } from './register.routes';
import { AppErrorsScreenStackRoutes } from './error.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function MainRoutes({ userClient }) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName={
        (userClient && !userClient.addresses) ||
        (userClient && !userClient.phones) ||
        (userClient && !userClient.documents)
          ? 'RegisterRoutes'
          : 'AuthRoutes'
      }
    >
      <Screen name="AuthRoutes" component={AuthRoutes} />
      <Screen name="RegisterRoutes" component={RegisterRoutes} />
      <Screen
        name="ErrorsStacksScreens"
        component={AppErrorsScreenStackRoutes}
      />
    </Navigator>
  );
}
