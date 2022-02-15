import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Body,
  AreaLocalClient,
  AreaLocalProvider,
  AreaLocalTitleClient,
  AreaButtons,
  AreaButtonBack,
  TitleButtonBack,
  AreaButtonNext,
  TitleButtonNext,
  LocalTitleClient,
  Icon,
  AreaIconSelect,
  LocalTitleProvider,
  AreaTitleLocalProvider,
  AreaAmountLocalProvider,
  AreaTitle,
  Title,
  AreaLocalClientButton,
  AreaLocalTitleProvider,
  AreaLocalButtonProvider,
  AreaListProviderLocals,
  AreaLocalTitle,
  AreaProviderLocalTitle,
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
import { Local, UserProvider } from '../../../../hooks/providerUser';
import { useTag } from '../../../../hooks/tag';
import { ServiceFormattedModalService } from '../../../../components/ModalServices';
import { formattedDateToCompare } from '../../../../utils/formattedDateToCompare';
import { addMillisecondsToDate } from '../../../../utils/addMil';
import { compareIfBetweenEqual } from '../../../../utils/compareIfBetweenEqual';
import { LOCALS_TYPES_ENUM } from '../../../../enums/localsTypes.enum';
import { getValueAmount } from '../../../../utils/formatValueAmount';
import { GetDistanceLocalSelectResponse } from '../../../../hooks/dtos/locas.dto';
import { Load } from '../../../../components/Load';

export interface Focusable {
  focus(): void;
}

interface LocalSelect extends Local {
  select: boolean;
}

interface Params {
  providerSelect: UserProvider;
  servicesSelect: ServiceFormattedModalService[];
  necessaryMilliseconds: number;
  hours?: HoursSelectedToAppointment;
}

export function ClientAppointmentCreateLocalSelect() {
  const route = useRoute();
  const theme = useTheme();

  const [handleLocalClient, setHandleLocalClient] = useState<boolean>(false);
  const [localDistanceLoading, setLocalDistanceLoading] =
    useState<boolean>(false);
  const [handleLocalProvider, setHandleLocalProvider] =
    useState<boolean>(false);
  const [listLocalsFormatted, setListLocalsFormatted] = useState<LocalSelect[]>(
    [] as LocalSelect[],
  );
  const [localSelected, setLocalSelected] = useState<
    Addresses | Local | undefined
  >(undefined);
  const [handleLocalClientSelected, setHandleLocalClientSelected] =
    useState<boolean>(false);
  const [handleContinued, setHandleContinued] = useState<boolean>(false);
  const [distanceLocal, setDistanceLocal] =
    useState<GetDistanceLocalSelectResponse>(
      {} as GetDistanceLocalSelectResponse,
    );
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const {
    userClient,
    providers,
    getProviders,
    setFavoriteProvider,
    setAppointmentStageClient,
    getDistanceLocalSelect,
  } = useClientUser();
  const { getTags, tags } = useTag();
  const { signIn, signOut } = useAuth();

  const navigation = useNavigation<ScreenNavigationProp>();
  const { providerSelect, necessaryMilliseconds, servicesSelect, hours } =
    route.params as Params;
  const {
    id: providerId,
    locals,
    locals_types,
    transports_types,
  } = providerSelect;
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    addresses,
  } = userClient;

  function handleSelectLocal() {
    setHandleContinued(false);
    if (localSelected) {
      setAppointmentStageClient({
        provider: providerSelect,
        services: servicesSelect,
        stage: {
          route: 'ClientAppointmentStackRoutes',
          children: 'ClientAppointmentStagesProviderSelectServiceStack',
          params_name: 'providerSelect',
        },
        necessaryMilliseconds,
        hours,
        local: localSelected,
      });

      navigation.navigate(
        'ClientAppointmentStagesProviderSelectTransportStack',
        {
          providerSelect,
          servicesSelect,
          necessaryMilliseconds,
          hours,
          local: localSelected,
        },
      );
    }
  }
  function handleClientLocalSelect() {
    setHandleLocalClientSelected(true);
    if (!!locals && locals?.length > 0) {
      const newList =
        !!locals && locals.map(local => ({ ...local, select: false }));
      setListLocalsFormatted(newList);
    }
    setLocalSelected({
      ...addresses,
      details:
        distanceLocal &&
        distanceLocal.distance_client_local &&
        distanceLocal.distance_client_local,
    });
    setHandleContinued(true);
  }

  function handleProviderLocalSelect(localParam: Local) {
    setHandleLocalClientSelected(false);
    const newList =
      !!listLocalsFormatted &&
      listLocalsFormatted.map(local => ({
        ...local,
        select: localParam.id === local.id,
      }));
    setListLocalsFormatted(newList);

    const localDistanceFormatted =
      !!distanceLocal &&
      !!distanceLocal.distance_provider_locals.length &&
      distanceLocal.distance_provider_locals.find(
        local => local.local_destination_identification === localParam.id,
      );

    setLocalSelected({
      ...localParam,
      details: localDistanceFormatted,
    });

    setHandleContinued(true);
  }

  useEffect(() => {
    let unmounted = false;
    async function getDistanceBetween() {
      if (!unmounted) {
        setLocalDistanceLoading(true);

        const result = await getDistanceLocalSelect({
          // departureTime: hours?.initial
          //   ? new Date(hours.initial).getTime()
          //   : new Date().getTime(),
          departureTime: new Date().getTime(),
          providerId,
        });

        setDistanceLocal(result);

        setHandleLocalClient(
          locals_types.some(
            local_type => local_type.local_type === LOCALS_TYPES_ENUM.CLIENT,
          ),
        );
        setHandleLocalProvider(
          locals_types.some(
            local_type => local_type.local_type === LOCALS_TYPES_ENUM.OWN,
          ),
        );
        if (!!locals && locals?.length > 0) {
          const newList =
            !!locals && locals.map(local => ({ ...local, select: false }));
          setListLocalsFormatted(newList);
        }

        setLocalDistanceLoading(false);
      }
    }
    getDistanceBetween();

    return () => {
      unmounted = true;
    };
  }, []);

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
        {!!isLoading && <Load />}
        {!isLoading && handleLocalClient && (
          <AreaLocalClient>
            <AreaLocalTitle>
              <Title>Meu local</Title>
            </AreaLocalTitle>
            <AreaLocalClientButton
              select={handleLocalClientSelected}
              onPress={handleClientLocalSelect}
            >
              <AreaIconSelect>
                <Icon
                  name="home"
                  size={RFValue(32)}
                  color={theme.colors.main_light}
                />
              </AreaIconSelect>

              <AreaLocalTitleClient>
                <LocalTitleClient>{`${addresses.street}, ${addresses.number}`}</LocalTitleClient>

                {distanceLocal.distance_client_local.distance_between.routes[0]
                  .legs[0].distance.text ? (
                  <LocalTitleClient>{`${distanceLocal.distance_client_local.distance_between.routes[0].legs[0].distance.text} - ${distanceLocal.distance_client_local.distance_between.routes[0].legs[0].duration.text}`}</LocalTitleClient>
                ) : (
                  <LocalTitleClient>Loading...</LocalTitleClient>
                )}
              </AreaLocalTitleClient>
            </AreaLocalClientButton>
          </AreaLocalClient>
        )}
        {!isLoading && (
          <AreaLocalTitleProvider>
            <AreaProviderLocalTitle>
              <Title>Outros locais</Title>
            </AreaProviderLocalTitle>
            <AreaListProviderLocals>
              {handleLocalProvider &&
                listLocalsFormatted &&
                listLocalsFormatted.length > 0 &&
                listLocalsFormatted.map((local, index) => (
                  <AreaLocalButtonProvider
                    key={index.toString()}
                    onPress={() => handleProviderLocalSelect(local)}
                    select={local.select}
                  >
                    <AreaIconSelect>
                      <Icon
                        name="map"
                        size={RFValue(25)}
                        color={
                          local.select
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaIconSelect>
                    <AreaTitleLocalProvider>
                      <LocalTitleProvider
                        select={local.select}
                      >{`${local.address.street}, ${local.address.number}`}</LocalTitleProvider>
                    </AreaTitleLocalProvider>
                    <AreaAmountLocalProvider>
                      <LocalTitleProvider
                        select={local.select}
                      >{`${getValueAmount(local.amount)}`}</LocalTitleProvider>
                    </AreaAmountLocalProvider>
                  </AreaLocalButtonProvider>
                ))}
            </AreaListProviderLocals>
          </AreaLocalTitleProvider>
        )}
        <AreaButtons>
          {!isLoading && (
            <AreaButtonBack onPress={handleBackClientSelect}>
              <TitleButtonBack>Voltar</TitleButtonBack>
            </AreaButtonBack>
          )}
          {!isLoading && handleContinued && (
            <AreaButtonNext onPress={handleSelectLocal}>
              <TitleButtonNext>Avançar</TitleButtonNext>
            </AreaButtonNext>
          )}
        </AreaButtons>
      </Body>
    </Container>
  );
}
