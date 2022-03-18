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
  AreaTitleAddressMoved,
  AddressTitleMoved,
} from './styles';
import { Load } from '../Load';
import { useCommon } from '../../hooks/common';
import { useAddress } from '../../hooks/address';
import { calDeltaCoordinates } from '../../utils/calDeltaCoordinates';

interface ParamsCalDelta {
  latitude: number;
  longitude: number;
  accuracy: number;
}
export interface ModalLocationLocationDTO {
  location?: {
    region: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
      accuracy: number;
    };
  };
  address?: {
    city: string;
    country: string;
    district: string;
    formatted_address: string;
    latitude: number;
    longitude: number;
    number: string;
    state: string;
    street: string;
    zipcode: string;
  };
}
interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: (data: ModalLocationLocationDTO) => void;
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
      latitude: -20.558020016068888,
      longitude: -47.37069373950362,
      latitudeDelta: 0,
      longitudeDelta: 0,
      accuracy: 10,
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
    const { latitudeDelta, longitudeDelta } = calDeltaCoordinates({
      distance: 25,
      latitude,
      longitude,
    });

    setLocation({
      region: {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
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

      const data = await getGeolocationReverse({
        longitude: String(longitude),
        latitude: String(latitude),
      });
      if (data && data.latitude && data.longitude) {
        const { longitude: longitudeResult, latitude: latitudeResult } = data;
        calDelta({
          longitude: longitudeResult,
          latitude: latitudeResult,
          accuracy: 10,
        });
      }
      setGetCurrentLocation(true);
    } catch (err) {
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
      const data = await getGeolocationByAddress(addressParam);
      if (data && data.latitude && data.longitude) {
        const { longitude, latitude } = data;
        calDelta({ longitude, latitude, accuracy: 10 });
      }
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
    };
  }, []);
  function handleConfirmLocation() {
    handleClosedModal({ location, address });
  }

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
                region={{
                  latitude: location.region.latitude,
                  longitude: location.region.longitude,
                  latitudeDelta: location.region.latitudeDelta,
                  longitudeDelta: location.region.longitudeDelta,
                }}
                onRegionChangeComplete={position => {
                  setLocation({ region: { ...position, accuracy: 50 } });
                  getReverseLocation(position);
                }}
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
              {!!address && !!address.formatted_address && (
                <AreaTitleAddressMoved>
                  <AddressTitleMoved>
                    {address.formatted_address}
                  </AddressTitleMoved>
                </AreaTitleAddressMoved>
              )}
              <AreaButtonSaved onPress={handleConfirmLocation}>
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
