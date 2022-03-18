import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../../../hooks/auth';
import { TextName } from './styles';

export function AppProviderDrawerComponent(props) {
  const theme = useTheme();
  const { signOut } = useAuth();
  async function handleSingOut() {
    await signOut();
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList
        {...props}
        label={({ focused, color, label }) => (
          <TextName style={{ color }}>{label}</TextName>
        )}
        labelStyle={{
          fontSize: RFValue(24),
          fontFamily: theme.fonts.primary_300,
        }}
        activeBackgroundColor={theme.colors.background_primary}
        activeTintColor={theme.colors.main_light}
        inactiveTintColor={theme.colors.background_primary}
      />
      <DrawerItem
        label="Sair"
        onPress={handleSingOut}
        labelStyle={{
          fontSize: RFValue(24),
          fontFamily: theme.fonts.primary_300,
        }}
      />
    </DrawerContentScrollView>
  );
}
