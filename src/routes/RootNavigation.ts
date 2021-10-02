import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
  const navigationState = navigationRef.isReady();
  if (navigationState) {
    navigationRef.navigate(name, params);
  }
}
