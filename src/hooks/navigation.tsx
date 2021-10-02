import React, { createContext, ReactNode, useContext } from 'react';

import {
  NavigationContainer,
  NavigationContext,
} from '@react-navigation/native';

type NavigationContextData = {};
interface NavigationProviderProps {
  children: ReactNode;
}
const NavigationContextComponent = createContext<NavigationContextData>(
  {} as NavigationContextData,
);

function NavigationProvider({ children }: NavigationProviderProps) {
  return (
    <NavigationContextComponent.Provider value={{}}>
      {children}
    </NavigationContextComponent.Provider>
  );
}

function useNavigation(): NavigationContextData {
  const context = useContext(NavigationContextComponent);
  return context;
}

export { NavigationProvider, useNavigation };
