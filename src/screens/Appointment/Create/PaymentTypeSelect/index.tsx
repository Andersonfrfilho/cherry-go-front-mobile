import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getValueAmount } from '../../../../utils/formatValueAmount';
import {
  Container,
  Body,
  AreaButtons,
  AreaButtonBack,
  TitleButtonBack,
  AreaButtonNext,
  TitleButtonNext,
  AreaIconSelect,
  AreaPaymentType,
  AreaTitlePaymentType,
  AreaAmountPaymentType,
  PaymentTypeTitle,
  AreaButtonPaymentTypes,
  AreaTitleAmountPaymentType,
  AreaPaymentTypeTitle,
  PaymentTypeTitleName,
} from './styles';

import { useAuth } from '../../../../hooks/auth';

import { useCommon } from '../../../../hooks/common';

import { useError } from '../../../../hooks/error';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import {
  Addresses,
  HourSelectInterface,
  HoursSelectedToAppointment,
  useClientUser,
} from '../../../../hooks/clientUser';
import {
  Local,
  PAYMENTS_TYPES_NAME_PT_BR_ENUM,
  PaymentTypeProvider,
  UserProvider,
} from '../../../../hooks/providerUser';
import { useTag } from '../../../../hooks/tag';
import { ServiceFormattedModalService } from '../../../../components/ModalServices';

import {
  IconFeather,
  IconFontAwesome,
} from '../../../../components/Icons/style';
import { ProviderTransportTypesSelected } from '../TransportSelect';
import { STATUS_PROVIDERS_APPOINTMENT } from '../../../../enums/statusProvidersAppointment.enum';

export interface Focusable {
  focus(): void;
}
export interface ProviderPaymentsTypesSelected extends PaymentTypeProvider {
  select: boolean;
}

interface Params {
  providerSelect: UserProvider;
  servicesSelect: ServiceFormattedModalService[];
  necessaryMilliseconds: number;
  hours?: HoursSelectedToAppointment;
  local?: Addresses | Local;
  time?: string;
  transportType?: ProviderTransportTypesSelected;
}

export function ClientAppointmentCreatePaymentTypeSelect() {
  const route = useRoute();
  const theme = useTheme();

  const [handleContinued, setHandleContinued] = useState<boolean>(false);
  const [paymentTypesAvailable, setPaymentTypesAvailable] = useState<
    ProviderPaymentsTypesSelected[]
  >([] as ProviderPaymentsTypesSelected[]);
  const [paymentTypesAvailableOriginal, setPaymentTypesAvailableOriginal] =
    useState<ProviderPaymentsTypesSelected[]>(
      [] as ProviderPaymentsTypesSelected[],
    );
  const [amountTotal, setAmountTotal] = useState<number>(0);
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const {
    userClient,

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
    transportType,
    localType,
  } = route.params as Params;
  const { id: providerId, payments_types: paymentTypes } = providerSelect;
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    addresses,
  } = userClient;

  function handleBackClientSelect() {
    navigation.goBack();
  }

  useEffect(() => {
    let unmounted = false;

    const servicesAmount = servicesSelect.reduce(
      (previousService, currentService) =>
        previousService + Number(currentService.amount),
      0,
    );
    const localAmount = local?.amount ? local?.amount : 0;
    const transportTypeAmount = transportType?.price.value
      ? transportType?.price.value
      : 0;

    setAmountTotal(
      Number(servicesAmount) +
        Number(localAmount) +
        Number(transportTypeAmount),
    );
    if (!!paymentTypes?.length && paymentTypes?.length > 0) {
      const newList = paymentTypes
        ?.filter(paymentTypesParam => paymentTypesParam.active)
        .map(paymentTypeParam => ({
          ...paymentTypeParam,
          select: false,
        }));
      setPaymentTypesAvailable(newList);
      setPaymentTypesAvailableOriginal(newList);
    }
    return () => {
      unmounted = true;
    };
  }, []);

  function handlePaymentsTypesSelect(paymentTypeId: string) {
    const newList = paymentTypesAvailable.map(paymentTypeParam => {
      const transportSelected = paymentTypeParam.id === paymentTypeId;
      return {
        ...paymentTypeParam,
        select: transportSelected ? !paymentTypeParam.select : false,
      };
    });
    setPaymentTypesAvailable(newList);
    setHandleContinued(
      !newList.every(paymentTypeParam =>
        paymentTypesAvailableOriginal.some(
          paymentTypeParamParamSome =>
            paymentTypeParam.id === paymentTypeParamParamSome.id &&
            paymentTypeParam.select === paymentTypeParamParamSome.select,
        ),
      ),
    );
  }

  function handleSendPaymentType() {
    setHandleContinued(false);
    const paymentTypeSelected = paymentTypesAvailable.find(
      transportTypeParam => transportTypeParam.select,
    );
    if (transportType) {
      setAppointmentStageClient({
        provider: providerSelect,
        services: servicesSelect,
        stage: {
          route: 'ClientAppointmentStackRoutes',
          children: 'ClientAppointmentDetailsStack',
          params_name: 'providerSelect',
        },
        necessaryMilliseconds,
        hours,
        local,
        transportType,
        localType,
        paymentType: paymentTypeSelected,
        amountTotal,
        status: STATUS_PROVIDERS_APPOINTMENT.OPEN,
      });

      navigation.navigate('ClientAppointmentDetailsStack', {
        providerSelect,
        servicesSelect,
        necessaryMilliseconds,
        hours,
        local,
        transportType,
        paymentType: paymentTypeSelected,
        amountTotal,
        notConfirmed: true,
        localType,
        status: STATUS_PROVIDERS_APPOINTMENT.OPEN,
      });
    }
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
        <AreaButtonPaymentTypes>
          {paymentTypesAvailable.length > 0 &&
            paymentTypesAvailable.map((paymentTypeParam, index) => {
              return (
                <AreaPaymentType
                  key={index.toString()}
                  select={paymentTypeParam.select}
                >
                  <AreaIconSelect
                    onPress={() =>
                      handlePaymentsTypesSelect(paymentTypeParam.id)
                    }
                  >
                    <IconFontAwesome
                      name={
                        paymentTypeParam.select ? 'dot-circle-o' : 'circle-o'
                      }
                      size={RFValue(25)}
                      color={
                        paymentTypeParam.select
                          ? theme.colors.main_light
                          : theme.colors.background_primary
                      }
                    />
                  </AreaIconSelect>
                  <AreaTitleAmountPaymentType>
                    <AreaPaymentTypeTitle>
                      <PaymentTypeTitleName
                        numberOfLines={2}
                        select={paymentTypeParam.select}
                      >
                        {
                          PAYMENTS_TYPES_NAME_PT_BR_ENUM[
                            paymentTypeParam.payment_type.name
                          ]
                        }
                      </PaymentTypeTitleName>
                    </AreaPaymentTypeTitle>
                    <AreaAmountPaymentType>
                      <PaymentTypeTitle select={paymentTypeParam.select}>
                        {getValueAmount(amountTotal.toString())}
                      </PaymentTypeTitle>
                    </AreaAmountPaymentType>
                  </AreaTitleAmountPaymentType>
                </AreaPaymentType>
              );
            })}
        </AreaButtonPaymentTypes>
        <AreaButtons>
          <AreaButtonBack onPress={handleBackClientSelect}>
            <TitleButtonBack>Voltar</TitleButtonBack>
          </AreaButtonBack>
          {handleContinued && (
            <AreaButtonNext onPress={handleSendPaymentType}>
              <TitleButtonNext>Enviar</TitleButtonNext>
            </AreaButtonNext>
          )}
        </AreaButtons>
      </Body>
    </Container>
  );
}
