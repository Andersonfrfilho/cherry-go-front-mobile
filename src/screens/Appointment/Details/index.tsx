import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  Container,
  Body,
  AreaButtons,
  AreaButtonBack,
  TitleButtonBack,
  AreaButtonNext,
  TitleButtonNext,
  AreaIconSelect,
  AreaTransportType,
  AreaTitleTransportType,
  AreaAmountTransportType,
  TransportTypeTitle,
  AreaButtonTransportTypes,
  AreaTitleAmountTransportType,
  AreaTransportTypeTitle,
  TransportTypeTitleName,
  AreaTransportTypeExpand,
  AreaMapExpand,
  MapViewComponent,
} from './styles';

import { useAuth } from '../../../hooks/auth';

import { useCommon } from '../../../hooks/common';

import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';
import { HeaderProfile } from '../../../components/HeaderProfile';
import {
  Addresses,
  HourSelectInterface,
  HoursSelectedToAppointment,
  useClientUser,
} from '../../../hooks/clientUser';
import {
  Local,
  ProviderTransportTypes,
  TRANSPORT_TYPES_ENUM,
  TRANSPORT_TYPES_NAME_PT_BR_ENUM,
  UserProvider,
} from '../../../hooks/providerUser';
import { useTag } from '../../../hooks/tag';
import { ServiceFormattedModalService } from '../../../components/ModalServices';
import { formattedDateToCompare } from '../../../utils/formattedDateToCompare';
import { addMillisecondsToDate } from '../../../utils/addMil';
import { compareIfBetweenEqual } from '../../../utils/compareIfBetweenEqual';
import { LOCALS_TYPES_ENUM } from '../../../enums/localsTypes.enum';
import { getValueAmount } from '../../../utils/formatValueAmount';
import { transportDistanceToMeters } from '../../../utils/transportDistanceToMeters';
import { IconFeather, IconFontAwesome } from '../../../components/Icons/style';
import { calDeltaCoordinates } from '../../../utils/calDeltaCoordinates';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD0gMj0W2pDcNWGYmtRh5zU4mxMLdg6vLw';
export interface Focusable {
  focus(): void;
}
interface PriceTransportType {
  value: number;
  text: string;
}
export interface ProviderTransportTypesSelected extends ProviderTransportTypes {
  select: boolean;
  price?: PriceTransportType;
  expand?: boolean;
}

interface Params {
  providerSelect: UserProvider;
  servicesSelect: ServiceFormattedModalService[];
  necessaryMilliseconds: number;
  hours?: HoursSelectedToAppointment;
  local?: Addresses | Local;
  time?: string;
}
interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  accuracy: number;
}

const { width } = Dimensions.get('window');

// const ASPECT_RATIO = width / 420;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export function ClientAppointmentDetails() {
  const route = useRoute();
  const theme = useTheme();

  const [handleContinued, setHandleContinued] = useState<boolean>(false);
  const [transportTypesAvailable, setTransportTypesAvailable] = useState<
    ProviderTransportTypesSelected[]
  >([] as ProviderTransportTypesSelected[]);
  const [transportTypesAvailableOriginal, setTransportTypesAvailableOriginal] =
    useState<ProviderTransportTypesSelected[]>(
      [] as ProviderTransportTypesSelected[],
    );

  const [coordinates, setCoordinates] = useState<Coordinates[]>([
    {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
      accuracy: 0,
    },
    {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
      accuracy: 0,
    },
  ]);
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const {
    userClient,
    providers,
    getProviders,
    setFavoriteProvider,
    setAppointmentStageClient,
    getHoursProvidersSelect,
  } = useClientUser();
  const { getTags, tags } = useTag();
  const { signIn, signOut } = useAuth();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    providerSelect,
    necessaryMilliseconds,
    servicesSelect,
    hours,
    local,
  } = route.params as Params;
  const { id: providerId, transports_types: transportsTypes } = providerSelect;
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    addresses,
  } = userClient;

  function handleBackClientSelect() {
    navigation.goBack();
  }

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
        <AreaButtonTransportTypes>
          {transportTypesAvailable.length > 0 &&
            transportTypesAvailable.map((transportType, index) => {
              return (
                <AreaTransportTypeExpand
                  select={transportType.select}
                  expand={transportType.expand}
                  key={index.toString()}
                >
                  <AreaTransportType key={index.toString()}>
                    <AreaIconSelect
                      onPress={() =>
                        handleTransportTypeSelect(transportType.id)
                      }
                    >
                      <IconFontAwesome
                        name={
                          transportType.select ? 'dot-circle-o' : 'circle-o'
                        }
                        size={RFValue(25)}
                        color={
                          transportType.select
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaIconSelect>
                    <AreaTitleAmountTransportType>
                      <AreaTitleTransportType>
                        <AreaTransportTypeTitle>
                          <TransportTypeTitleName select={transportType.select}>
                            {
                              TRANSPORT_TYPES_NAME_PT_BR_ENUM[
                                transportType.transport_type.name
                              ]
                            }
                          </TransportTypeTitleName>
                        </AreaTransportTypeTitle>
                        <AreaTransportTypeTitle>
                          <TransportTypeTitle
                            numberOfLines={1}
                            select={transportType.select}
                          >
                            {transportType.distance}, {transportType.time}
                          </TransportTypeTitle>
                        </AreaTransportTypeTitle>
                      </AreaTitleTransportType>
                      <AreaAmountTransportType>
                        <AreaTransportTypeTitle>
                          <TransportTypeTitle select={transportType.select}>
                            {transportType.price.text
                              ? transportType.price.text
                              : ''}
                          </TransportTypeTitle>
                        </AreaTransportTypeTitle>
                        <AreaTransportTypeTitle />
                      </AreaAmountTransportType>
                    </AreaTitleAmountTransportType>
                    <AreaIconSelect
                      onPress={() =>
                        handleTransportTypeExpand(transportType.id)
                      }
                    >
                      <IconFeather
                        name={
                          transportType.expand ? 'chevron-up' : 'chevron-down'
                        }
                        size={RFValue(25)}
                        color={
                          transportType.select
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaIconSelect>
                  </AreaTransportType>
                  {transportType.expand && (
                    <AreaMapExpand>
                      <MapViewComponent
                        initialRegion={{
                          latitude: coordinates[0].latitude,
                          longitude: coordinates[0].longitude,
                          latitudeDelta: 0.0622,
                          longitudeDelta: 0.0121,
                        }}
                      >
                        <MapViewDirections
                          origin={coordinates[0]}
                          destination={coordinates[1]}
                          apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
                          strokeWidth={4}
                          strokeColor="#111111"
                        />
                        <Marker coordinate={coordinates[0]} />
                        <Marker coordinate={coordinates[1]} />
                      </MapViewComponent>
                    </AreaMapExpand>
                  )}
                </AreaTransportTypeExpand>
              );
            })}
        </AreaButtonTransportTypes>
        <AreaButtons>
          <AreaButtonBack onPress={handleBackClientSelect}>
            <TitleButtonBack>Voltar</TitleButtonBack>
          </AreaButtonBack>
          {handleContinued && (
            <AreaButtonNext onPress={handleSendTransportType}>
              <TitleButtonNext>Avançar</TitleButtonNext>
            </AreaButtonNext>
          )}
        </AreaButtons>
      </Body>
    </Container>
  );
}
