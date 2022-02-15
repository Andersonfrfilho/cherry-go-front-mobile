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
  AreaSelectButton,
  AreaLocalTitleClient,
  AreaButtonLocalClient,
  AreaLocalTitleProvider,
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
  local?: Addresses | Local;
}

export function ClientAppointmentCreateTransportSelect() {
  const route = useRoute();
  const theme = useTheme();

  const [handleLocalClient, setHandleLocalClient] = useState<boolean>(false);
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
  const { providerSelect, necessaryMilliseconds, servicesSelect, hours } =
    route.params as Params;
  const { id: providerId, transports_types } = providerSelect;
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    addresses,
  } = userClient;

  function handleBackClientSelect() {
    navigation.goBack();
  }
  function handleSelectTransport() {}
  console.log(transports_types);
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
        {/* handleLocalProvider &&
          listLocalsFormatted &&
          listLocalsFormatted.length > 0 &&
          listLocalsFormatted.map((local, index) => (
            <AreaLocalProvider
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
                <LocalTitleProvider select={local.select}>{`${getValueAmount(
                  local.amount,
                )}`}</LocalTitleProvider>
              </AreaAmountLocalProvider>
            </AreaLocalProvider>
                )) */}
        <AreaButtons>
          <AreaButtonBack onPress={handleBackClientSelect}>
            <TitleButtonBack>Voltar</TitleButtonBack>
          </AreaButtonBack>
          {handleContinued && (
            <AreaButtonNext onPress={handleSelectTransport}>
              <TitleButtonNext>Avançar</TitleButtonNext>
            </AreaButtonNext>
          )}
        </AreaButtons>
      </Body>
    </Container>
  );
}
