import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  Container,
  Modal,
  AreaInputSearch,
  AreaInputText,
  TextInput,
  AreaButtonIcon,
  Icon,
  AreaMapView,
  AreaHeader,
  AreaButtonIconBack,
  AreaWithoutHeader,
  MapViewComponent,
  AreaMarker,
  MaterialCommunityIcon,
  AreaPositionMarker,
  AreaButtonSaved,
  Title,
  AreaTitleAddress,
  TitleLocal,
} from './styles';
import { Load } from '../Load';
import { useCommon } from '../../hooks/common';
import { useAddress } from '../../hooks/address';

interface ParamsCalDelta {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: () => void;
}

export function ModalMapView({
  modalVisible = true,
  handleClosedModal,
}: Props) {
  const [value, setValueText] = useState('');
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [getCurrentLocation, setGetCurrentLocation] = useState(false);
  const [loadingMoveMap, setLoadingMoveMap] = useState(false);
  const [location, setLocation] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
      accuracy: 0,
    },
  });

  const theme = useTheme();

  const { setIsLoading, isLoading } = useCommon();
  const {
    getGeolocationReverse,
    address,
    getGeolocationByAddress,
    setLoadingAddress,
  } = useAddress();

  function calDelta({ latitude, longitude, accuracy }: ParamsCalDelta) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));

    setLocation({
      region: {
        latitude,
        longitude,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
        accuracy,
      },
    });
  }
  async function getReverseLocation({
    longitude: longitudeParam,
    latitude: latitudeParam,
  }: Region) {
    setLoadingAddress(true);
    setLoadingMoveMap(true);
    try {
      await getGeolocationReverse({
        longitude: String(longitudeParam),
        latitude: String(latitudeParam),
      });
    } catch (err) {
      setGetCurrentLocation(false);
    } finally {
      setLoadingMoveMap(false);
      setLoadingAddress(false);
    }
  }

  async function getLocation() {
    setIsLoading(true);
    setLoadingAddress(true);
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
        coords: { accuracy, longitude, latitude },
      } = position;

      calDelta({ accuracy, latitude, longitude });

      await getGeolocationReverse({
        longitude: String(longitude),
        latitude: String(latitude),
      });
      setGetCurrentLocation(true);
    } catch (err) {
      console.log(err);
      setGetCurrentLocation(false);
    } finally {
      setIsLoading(false);
      setLoadingAddress(false);
    }
  }

  async function getLocationByAddress(addressParam: string) {
    setLoadingMoveMap(true);
    setLoadingAddress(true);
    try {
      await getGeolocationByAddress(addressParam);
    } catch (err) {
      setGetCurrentLocation(false);
    } finally {
      setLoadingMoveMap(false);
      setLoadingAddress(false);
    }
  }

  useEffect(() => {
    getLocation();
    return () => {
      setValueText('');
      setForceLocation(true);
      setHighAccuracy(true);
      setLocationDialog(true);
      setUseLocationManager(false);
      setGetCurrentLocation(false);
      setLoadingMoveMap(false);
      setLocation({
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
          accuracy: 0,
        },
      });
    };
  }, []);

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <Container>
        <AreaHeader>
          <AreaButtonIconBack onPress={handleClosedModal}>
            <Icon
              name="chevron-left"
              size={RFValue(25)}
              color={theme.colors.white_medium}
            />
          </AreaButtonIconBack>
          <AreaWithoutHeader />
        </AreaHeader>
        <AreaInputSearch>
          <AreaInputText>
            <TextInput
              onChangeText={(valueParam: string) => setValueText(valueParam)}
              value={value}
              placeholder="Digite seu endereço"
            />
          </AreaInputText>
          <AreaButtonIcon
            onPress={() => getLocationByAddress(value)}
            disabled={loadingMoveMap}
          >
            <Icon
              name="search"
              size={RFValue(25)}
              color={theme.colors.background_primary}
            />
          </AreaButtonIcon>
        </AreaInputSearch>
        <AreaMapView>
          {location.region.latitude ? (
            <>
              <MapViewComponent
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: location.region.latitude,
                  longitude: location.region.longitude,
                  latitudeDelta: location.region.latitudeDelta,
                  longitudeDelta: location.region.longitudeDelta,
                }}
                onRegionChangeComplete={position =>
                  getReverseLocation(position)
                }
              />
              <AreaMarker>
                <MaterialCommunityIcon
                  name="map-marker"
                  size={RFValue(48)}
                  color={theme.colors.background_primary}
                />
              </AreaMarker>
              {address && address.street && (
                <AreaTitleAddress>
                  {loadingMoveMap ? (
                    <Load />
                  ) : (
                    <TitleLocal>{`${address?.street || ''}, ${
                      address?.number || ''
                    } - ${address?.district || ''} \n ${address?.city || ''}/${
                      address?.state || ''
                    } - ${address.country || ''} \n ${
                      address.zipcode || ''
                    }`}</TitleLocal>
                  )}
                </AreaTitleAddress>
              )}
              <AreaPositionMarker>
                <MaterialCommunityIcon
                  name={getCurrentLocation ? 'crosshairs-gps' : 'crosshairs'}
                  size={RFValue(30)}
                  color={theme.colors.background_primary}
                />
              </AreaPositionMarker>
              <AreaButtonSaved onPress={handleClosedModal}>
                <Title color={theme.colors.main_light}>
                  Confirmar endereço
                </Title>
              </AreaButtonSaved>
            </>
          ) : (
            <Load />
          )}
        </AreaMapView>
      </Container>
    </Modal>
  );
}
