import { RootStackParamList } from "../routes";

export function getRouteGoBack(routesNames: (keyof RootStackParamList)[]): [screen: keyof RootStackParamList] {
  let indexRoute = 0;

  if (routesNames.length > 2) {
    indexRoute = routesNames.length - 2;
  } else if (routesNames.length > 1 && routesNames.length < 2) {
    indexRoute = routesNames.length - 1;
  }
  return routesNames[indexRoute];
}
