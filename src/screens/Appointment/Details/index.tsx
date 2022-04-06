import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getOldest } from '../../../utils/getOldest';
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
  AreaCircleName,
  InitialLetterName,
  HEIGHT_MAP_VIEW_COMPONENT,
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
  PAYMENTS_TYPES_NAME_PT_BR_ENUM,
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
import { firstLetterUppercase } from '../../../utils/firstLetterUppercase';
import { getHour } from '../../../utils/getHour';
import { getNumberDay } from '../../../utils/getNumberDay';
import { getWeekDay } from '../../../utils/getWeekDay';
import { getMinutes } from '../../../utils/getMinutes';
import { formatarCEP } from '../../../utils/formatCep';
import { TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM } from '../../../enums/transportTypeProvider.enum';
import { PAYMENT_TYPES_ENUM } from '../../../enums/PaymentTypes.enum';
import { navigate } from '../../../routes/RootNavigation';

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
  transportType?: ProviderTransportTypesSelected;
  paymentType?: ProviderPaymentsTypesSelected;
  amountTotal?: number;
  notConfirmed?: boolean;
  status: STATUS_PROVIDERS_APPOINTMENT;
  pageAppointments?: boolean;
}
interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  accuracy?: number;
}

export function ClientAppointmentDetails() {
  const route = useRoute();
  const theme = useTheme();

  const [coordinateLocal, setCoordinateLocal] = useState<Coordinates>({
    latitude: -20.558,
    longitude: -47.3707,
    latitudeDelta: 0.00014474667624865252,
    longitudeDelta: 0.003813711165479383,
  });
  const [coordinates, setCoordinates] = useState<Coordinates[]>([
    {
      latitude: -20.558,
      longitude: -47.3707,
      latitudeDelta: 0.00013474667624865252,
      longitudeDelta: 0.003513711165479383,
    },
    {
      latitude: -20.55953,
      longitude: -47.4346,
      latitudeDelta: 0.00016474667624865252,
      longitudeDelta: 0.003713711165479383,
    },
  ]);
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { userClient, invalidateAppointmentStageClient, createAppointment } =
    useClientUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    providerSelect,
    servicesSelect,
    necessaryMilliseconds,
    hours,
    local,
    transportType,
    paymentType,
    notConfirmed,
    amountTotal,
    status,
    pageAppointments,
  } = route.params as Params;
  const {
    id: providerId,
    name: nameProvider,
    last_name: lastNameProvider,
    image_profile: imageProfileProvider,
    transports_types: transportsTypes,
    birth_date: birthDateProvider,
  } = providerSelect;
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    addresses,
  } = userClient;

  useEffect(() => {
    if (
      local &&
      local.address &&
      local.address.latitude &&
      local.address.longitude &&
      local.details &&
      local.details.distance_between &&
      local.details.distance_between.routes &&
      local.details.distance_between.routes.length > 0 &&
      local.details.distance_between.routes[0].legs &&
      local.details.distance_between.routes[0].legs[0] &&
      local.details.distance_between.routes[0].legs[0].distance
    ) {
      const coordinatesResult = calDeltaCoordinates({
        distance:
          local.details.distance_between.routes[0].legs[0].distance.value,
        latitude: local.address.latitude,
        longitude: local.address.longitude,
        percent:
          HEIGHT_MAP_VIEW_COMPONENT /
          local.details.distance_between.routes[0].legs[0].distance.value,
      });

      setCoordinateLocal(coordinatesResult);
    }
    if (
      local &&
      local.details &&
      local.details.distance_between &&
      local.details.distance_between.routes &&
      local.details.distance_between.routes.length > 0 &&
      local.details.distance_between.routes[0].legs &&
      local.details.distance_between.routes[0].legs[0] &&
      local.details.distance_between.routes[0].legs[0].distance &&
      local.details.distance_between.routes[0].legs[0].start_location &&
      local.details.distance_between.routes[0].legs[0].start_location.lat &&
      local.details.distance_between.routes[0].legs[0].start_location.lng &&
      local.details.distance_between.routes[0].legs[0].end_location.lat &&
      local.details.distance_between.routes[0].legs[0].end_location.lng
    ) {
      setCoordinates([
        calDeltaCoordinates({
          distance:
            local.details.distance_between.routes[0].legs[0].distance.value,
          latitude:
            local.details.distance_between.routes[0].legs[0].start_location.lat,
          longitude:
            local.details.distance_between.routes[0].legs[0].start_location.lng,
          percent:
            HEIGHT_MAP_VIEW_COMPONENT /
            local.details.distance_between.routes[0].legs[0].distance.value,
        }),
        calDeltaCoordinates({
          distance:
            local.details.distance_between.routes[0].legs[0].distance.value,
          latitude:
            local.details.distance_between.routes[0].legs[0].end_location.lat,
          longitude:
            local.details.distance_between.routes[0].legs[0].end_location.lng,
          percent:
            HEIGHT_MAP_VIEW_COMPONENT /
            local.details.distance_between.routes[0].legs[0].distance.value,
        }),
      ]);
    }
  }, []);

  async function handleCancelAppointment() {
    await invalidateAppointmentStageClient();
    navigation.navigate('ClientAppointmentStagesProviderSelectServiceStack');
  }

  async function handleCreateAppointment() {
    const statusResponse = await createAppointment();
    route.params.status = statusResponse;
    navigation.navigate('ClientAppointmentAnimationConfirmStack');
  }

  function handleCanBack() {
    navigation.navigate('AppointmentClientTab', {});
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
        <AreaProvider>
          <AreaPhotoProvider>
            {imageProfileProvider.length > 0 ? (
              <PhotoProvider
                source={{
                  // uri: item.image.link,
                  uri: imageProfileProvider[0].image.link,
                }}
                resizeMode="stretch"
              />
            ) : (
              <AreaCircleName>
                <InitialLetterName>
                  {`${nameProvider
                    .substring(0, 1)
                    .toUpperCase()}${lastNameProvider
                    .substring(0, 1)
                    .toUpperCase()}`}
                </InitialLetterName>
              </AreaCircleName>
            )}
          </AreaPhotoProvider>
          <AreaNameOldProvider>
            <AreaNameProvider>
              <NameProvider>
                {`${firstLetterUppercase(nameProvider)} ${firstLetterUppercase(
                  lastNameProvider,
                )}, ${getOldest(new Date(birthDateProvider))}`}
              </NameProvider>
            </AreaNameProvider>
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
              {!!hours && !!hours.start && !!hours?.start.date && (
                <DateText>{`Dia ${getNumberDay(
                  hours?.start.date,
                )} - ${getWeekDay(hours?.start.date)}`}</DateText>
              )}
            </AreaDate>
            <AreaHourText>
              {!!hours &&
                !!hours.start &&
                !!hours.end &&
                !!hours.start.hour &&
                !!hours?.end.hour && (
                  <HourText>
                    {`${hours.start.hour} até as ${hours.end.hour}`}
                  </HourText>
                )}
            </AreaHourText>
          </AreaDateHour>
        </AreaHour>
        <AreaServicesTitle>
          <ServicesTitle>Serviços</ServicesTitle>
        </AreaServicesTitle>
        <AreaServices>
          {servicesSelect.length > 0 &&
            servicesSelect.map((service, indexParam) => (
              <AreaService key={indexParam.toString()}>
                <AreaServiceNameHour>
                  <AreaServiceName>
                    <ServiceName numberOfLines={1}>{service.name}</ServiceName>
                  </AreaServiceName>
                  <AreaServiceDuration>
                    <ServiceDuration>{`${getMinutes(
                      service.duration.toString(),
                    )}`}</ServiceDuration>
                  </AreaServiceDuration>
                </AreaServiceNameHour>
                <AreaServicePrice>
                  <ServicePrice>{`${getValueAmount(
                    service.amount.toString(),
                  )}`}</ServicePrice>
                </AreaServicePrice>
              </AreaService>
            ))}
        </AreaServices>
        <AreaServiceTotal>
          <AreaServiceTotalTitle>
            <ServiceTotalTitle>Total</ServiceTotalTitle>
          </AreaServiceTotalTitle>
          <AreaServiceTotalAmount>
            {amountTotal && (
              <ServiceTotal>{`${getValueAmount(
                amountTotal.toString(),
              )}`}</ServiceTotal>
            )}
          </AreaServiceTotalAmount>
        </AreaServiceTotal>
        <AreaLocal>
          <AreaAddressNumber>
            <AddressNumber>{`${local.address.street}, ${local.address.number}`}</AddressNumber>
          </AreaAddressNumber>
          <AreaDistrictCityState>
            <DistrictCityState>{`${local.address.district} - ${local.address.city}/${local.address.state}`}</DistrictCityState>
          </AreaDistrictCityState>
          <AreaCep>
            <Cep>{`CEP: ${formatarCEP(local.address.zipcode)}`}</Cep>
          </AreaCep>
          <AreaAmount>
            <AreaTitleAmount>
              <TitleAmount>Valor total</TitleAmount>
            </AreaTitleAmount>
            <AreaValueAmount>
              <Amount>{`${getValueAmount(local.amount.toString())}`}</Amount>
            </AreaValueAmount>
          </AreaAmount>
          <AreaMapExpand>
            <MapViewComponent
              initialRegion={{
                latitude: Number(coordinateLocal.latitude),
                longitude: Number(coordinateLocal.longitude),
                latitudeDelta: Number(coordinateLocal.latitudeDelta),
                longitudeDelta: Number(coordinateLocal.longitudeDelta),
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: Number(coordinateLocal.latitude),
                  longitude: Number(coordinateLocal.longitude),
                }}
              />
            </MapViewComponent>
          </AreaMapExpand>
        </AreaLocal>
        <AreaTransportType>
          <AreaTitleTransportType>
            <TransportTypeTitleName>
              {
                TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM[
                  transportType?.transport_type.name
                ]
              }
            </TransportTypeTitleName>
          </AreaTitleTransportType>
          <AreaTransportTypeTitle>
            {transportType &&
              transportType.amount &&
              !!transportType &&
              !!transportType.distance &&
              !!transportType.price &&
              !!transportType.price?.text && (
                <TransportTypeTitle numberOfLines={1}>
                  {`${transportType.distance} - ${transportType.price?.text}`}
                </TransportTypeTitle>
              )}
          </AreaTransportTypeTitle>
          <AreaMapExpand>
            <MapViewComponent
              initialRegion={coordinates[0]}
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
            {paymentType &&
              paymentType.payment_type &&
              paymentType.payment_type.name && (
                <PaymentTypeTitle>
                  Pagamento -{' '}
                  {`${
                    PAYMENTS_TYPES_NAME_PT_BR_ENUM[
                      paymentType?.payment_type.name
                    ]
                  }`}
                </PaymentTypeTitle>
              )}
          </AreaPaymentTypeTitle>
          <AreaPaymentTypeAmount>
            <PaymentTitleAmount>
              <PaymentTypeTitle>Total</PaymentTypeTitle>
            </PaymentTitleAmount>
            <PaymentValueAmount>
              {amountTotal && (
                <PaymentTypeValue>
                  {getValueAmount(amountTotal?.toString())}
                </PaymentTypeValue>
              )}
            </PaymentValueAmount>
          </AreaPaymentTypeAmount>
        </AreaPaymentType>
        <AreaButtons>
          {notConfirmed && (
            <>
              <AreaButtonBack onPress={handleCancelAppointment}>
                <TitleButtonBack>Cancelar</TitleButtonBack>
              </AreaButtonBack>

              <AreaButtonNext onPress={handleCreateAppointment}>
                <TitleButtonNext>Confirmar</TitleButtonNext>
              </AreaButtonNext>
            </>
          )}
          {(pageAppointments ||
            status === STATUS_PROVIDERS_APPOINTMENT.OPEN ||
            status === STATUS_PROVIDERS_APPOINTMENT.ACCEPTED ||
            status === STATUS_PROVIDERS_APPOINTMENT.REJECTED) && (
            <AreaButtonBack onPress={handleCanBack}>
              <TitleButtonBack>Voltar</TitleButtonBack>
            </AreaButtonBack>
          )}
        </AreaButtons>
      </Body>
    </Container>
  );
}
