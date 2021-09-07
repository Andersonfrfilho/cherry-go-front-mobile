import React from 'react';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import {
  useFonts,
  AveriaSansLibre_300Light,
  AveriaSansLibre_400Regular,
  AveriaSansLibre_700Bold,
} from '@expo-google-fonts/averia-sans-libre';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { Routes } from './src/routes';
import { AppProvider } from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    AveriaSansLibre_300Light,
    AveriaSansLibre_400Regular,
    AveriaSansLibre_700Bold,
    'Painted-Paradise': require('./assets/fonts/Painted-Paradise.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
