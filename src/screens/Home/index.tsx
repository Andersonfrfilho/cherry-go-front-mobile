import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Body,
  Footer,
  AreaSearch,
  AreaInput,
  Input,
  AreaIcon,
  Icon,
} from './styles';
import { useAuth } from '../../hooks/auth';

import { useCommon } from '../../hooks/common';

import { useError } from '../../hooks/error';
import { ScreenNavigationProp } from '../../routes';
import { HeaderProfile } from '../../components/HeaderProfile';
import { useClientUser } from '../../hooks/clientUser';

export interface Focusable {
  focus(): void;
}
export function HomeClient() {
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [getCurrentLocation, setGetCurrentLocation] = useState(false);
  const [findText, setFindText] = useState('');

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { userClient, providers, getProviders } = useClientUser();
  const { signIn, signOut } = useAuth();

  const navigation = useNavigation<ScreenNavigationProp>();

  const { name, last_name: lastName, image_profile: imageProfile } = userClient;

  async function handleLogout() {
    await signOut();
  }

  async function getLocation() {
    setIsLoading(true);
    try {
      const position = await new Promise<Geolocation.GeoPosition>(
        (resolve, reject) => {
          Geolocation.getCurrentPosition(
            positionCurrent => {
              resolve(positionCurrent);
            },
            error => {
              reject(error);
            },
            {
              accuracy: {
                android: 'high',
                ios: 'best',
              },
              enableHighAccuracy: highAccuracy,
              timeout: 15000,
              maximumAge: 10000,
              distanceFilter: 0,
              forceRequestLocation: forceLocation,
              forceLocationManager: useLocationManager,
              showLocationDialog: locationDialog,
            },
          );
        },
      );

      const {
        coords: { longitude, latitude },
      } = position;
      setLocation({ longitude, latitude });

      setGetCurrentLocation(true);
    } catch (err) {
      setGetCurrentLocation(false);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setIsLoading(false);
    setAppError({});
    let unmounted = false;
    if (!unmounted) {
      getLocation();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getProviders({
        distance: String(300000),
        latitude: String(location.latitude),
        longitude: String(location.longitude),
      });
    }
  }, [location]);
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
        image={imageProfile && imageProfile.link}
      />
      <Body>
        <AreaSearch>
          <AreaInput>
            <Input
              placeholder="digite o nome:"
              onChangeText={setFindText}
              value={findText}
              maxLength={30}
            />
          </AreaInput>
          <AreaIcon>
            <Icon
              name="search"
              size={RFValue(25)}
              color={theme.colors.bon_jour_light_shade}
            />
          </AreaIcon>
        </AreaSearch>
      </Body>
      <Footer />
    </Container>
  );
}
