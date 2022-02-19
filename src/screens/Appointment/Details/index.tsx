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
  AreaProvider,
  AreaPhotoProvider,
  PhotoProvider,
  AreaNameOldProvider,
  AreaNameProvider,
  NameProvider,
  AreaOldProvider,
  OldProvider,
  AreaHour,
  AreaIconHour,
  AreaHourText,
  HourText,
  AreaServices,
  AreaService,
  AreaServiceName,
  ServiceName,
  AreaServicePrice,
  ServicePrice,
  AreaServiceTotal,
  ServiceTotal,
  AreaLocal,
  AreaAddressNumber,
  AreaDistrictCityState,
  AreaCep,
  Cep,
  AreaAmount,
  AreaTitleAmount,
  Amount,
  AreaValueAmount,
  AreaPaymentType,
  AreaPaymentTypeTitle,
  PaymentTitle,
  PaymentTitleAmount,
  PaymentTypeTitle,
  PaymentTypeValue,
  AreaPaymentTypeAmount,
  PaymentValueAmount,
  TitleAmount,
  AreaDateHour,
  AreaDate,
  DateText,
  AreaServiceNameHour,
  AreaServiceDuration,
  ServiceDuration,
  AreaServicesTitle,
  ServicesTitle,
  AreaServiceTotalTitle,
  ServiceTotalTitle,
  AreaServiceTotalAmount,
  AddressNumber,
  DistrictCityState,
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
import { STATUS_PROVIDERS_APPOINTMENT } from '../../../enums/statusProvidersAppointment.enum';
import { ProviderPaymentsTypesSelected } from '../Create/PaymentTypeSelect';

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
  transporType?: ProviderTransportTypesSelected;
  paymentType?: ProviderPaymentsTypesSelected;
  amountTotal?: number;
  confirmed: boolean;
  status: STATUS_PROVIDERS_APPOINTMENT;
}
interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  accuracy: number;
}

const { width } = Dimensions.get('window');

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
    servicesSelect,
    necessaryMilliseconds,
    hours,
    local,
    transporType,
    paymentType,
    confirmed,
    amountTotal,
    status,
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
  function handleCreateAppointment() {}
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
        <AreaProvider>
          <AreaPhotoProvider>
            <PhotoProvider
              source={{
                // uri: item.image.link,
                uri: 'https://www.playboy.com.mx/wp-content/uploads/2019/01/Lena-S%C3%B6derberg-imagen-completa.jpg',
              }}
              resizeMode="stretch"
            />
          </AreaPhotoProvider>
          <AreaNameOldProvider>
            <AreaNameProvider>
              <NameProvider>Agatha Cristie, 18</NameProvider>
            </AreaNameProvider>
            {/* <AreaOldProvider>
              <OldProvider></OldProvider>
            </AreaOldProvider> */}
          </AreaNameOldProvider>
        </AreaProvider>
        <AreaHour>
          <AreaIconHour>
            <IconFeather
              name="clock"
              size={RFValue(30)}
              color={theme.colors.background_primary}
            />
          </AreaIconHour>
          <AreaDateHour>
            <AreaDate>
              <DateText>Dia 12 - segunda-feira</DateText>
            </AreaDate>
            <AreaHourText>
              <HourText>12:00 até as 13:00</HourText>
            </AreaHourText>
          </AreaDateHour>
        </AreaHour>
        <AreaServicesTitle>
          <ServicesTitle>Serviços</ServicesTitle>
        </AreaServicesTitle>
        <AreaServices>
          {[1, 2].map((service, indexParam) => (
            <AreaService key={indexParam.toString()}>
              <AreaServiceNameHour>
                <AreaServiceName>
                  <ServiceName>Nome do servico</ServiceName>
                </AreaServiceName>
                <AreaServiceDuration>
                  <ServiceDuration>40 minutos</ServiceDuration>
                </AreaServiceDuration>
              </AreaServiceNameHour>
              <AreaServicePrice>
                <ServicePrice>R$ 120,00</ServicePrice>
              </AreaServicePrice>
            </AreaService>
          ))}
        </AreaServices>
        <AreaServiceTotal>
          <AreaServiceTotalTitle>
            <ServiceTotalTitle>Total</ServiceTotalTitle>
          </AreaServiceTotalTitle>
          <AreaServiceTotalAmount>
            <ServiceTotal>R$ 250,00</ServiceTotal>
          </AreaServiceTotalAmount>
        </AreaServiceTotal>
        <AreaLocal>
          <AreaAddressNumber>
            <AddressNumber>Rua Ambrosina veloso ribeiro, 4631</AddressNumber>
          </AreaAddressNumber>
          <AreaDistrictCityState>
            <DistrictCityState>Jardim noemia - Franca/SP</DistrictCityState>
          </AreaDistrictCityState>
          <AreaCep>
            <Cep>14403772</Cep>
          </AreaCep>
          <AreaAmount>
            <AreaTitleAmount>
              <TitleAmount>Valor total</TitleAmount>
            </AreaTitleAmount>
            <AreaValueAmount>
              <Amount>R$ 12,30</Amount>
            </AreaValueAmount>
          </AreaAmount>
          <AreaMapExpand>
            <MapViewComponent
              initialRegion={{
                latitude: coordinates[0].latitude,
                longitude: coordinates[0].longitude,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
            >
              <Marker coordinate={coordinates[0]} />
            </MapViewComponent>
          </AreaMapExpand>
        </AreaLocal>
        <AreaTransportType>
          <AreaTitleTransportType>
            <TransportTypeTitleName>Provedora</TransportTypeTitleName>
          </AreaTitleTransportType>
          <AreaTransportTypeTitle>
            <TransportTypeTitle numberOfLines={1}>
              3,7km - 7 minutos - R$ 12,00
            </TransportTypeTitle>
          </AreaTransportTypeTitle>
          <AreaMapExpand>
            <MapViewComponent
              initialRegion={{
                latitude: coordinates[0].latitude,
                longitude: coordinates[0].longitude,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
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
        </AreaTransportType>
        <AreaPaymentType>
          <AreaPaymentTypeTitle>
            <PaymentTypeTitle>Pagamento - Cartão de crédito</PaymentTypeTitle>
          </AreaPaymentTypeTitle>
          <AreaPaymentTypeAmount>
            <PaymentTitleAmount>
              <PaymentTypeTitle>Total</PaymentTypeTitle>
            </PaymentTitleAmount>
            <PaymentValueAmount>
              <PaymentTypeValue>R$ 1325,05</PaymentTypeValue>
            </PaymentValueAmount>
          </AreaPaymentTypeAmount>
        </AreaPaymentType>
        <AreaButtons>
          <AreaButtonBack onPress={handleBackClientSelect}>
            <TitleButtonBack>Voltar</TitleButtonBack>
          </AreaButtonBack>
          {handleContinued && (
            <AreaButtonNext onPress={handleCreateAppointment}>
              <TitleButtonNext>Confirmar</TitleButtonNext>
            </AreaButtonNext>
          )}
        </AreaButtons>
      </Body>
    </Container>
  );
}
