import { RootStackParamList } from "../routes";

export function getRouteGoBack(routesNames: (keyof RootStackParamList)[]): [screen: keyof RootStackParamList] | RootStackParamList['SignIn'] {
  let indexRoute = 0;

  if (routesNames.length > 2) {
    if (routesNames[routesNames.length - 1] === 'SignIn') {
      return 'UnauthorizedErrorScreen';
    }

    indexRoute = routesNames.length - 2;

  } else if (routesNames.length > 1 && routesNames.length < 2) {
    if (routesNames[routesNames.length - 1] === 'SignIn') {
      return 'UnauthorizedErrorScreen';
    }

    indexRoute = routesNames.length - 1;
  }

  if (routesNames[indexRoute].includes("Error")) {
    return 'UnauthorizedErrorScreen';
  }

  return routesNames[indexRoute];
}
