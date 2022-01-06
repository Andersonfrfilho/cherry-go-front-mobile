import React, { useEffect, useState } from 'react';
import { StatusBar, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Body,
  AreaHeader,
  AreaNameDistanceIcon,
  AreaName,
  Name,
  AreaDistanceIcon,
  AreaDistance,
  Distance,
  AreaIconDistance,
  Icon,
  AreaRatingAge,
  AreaRating,
  AreaIconRating,
  AreaAge,
  Age,
  IconMaterialCommunityIcons,
  IconFontAwesome,
  AreaPhotosSlideList,
  SlidePhotosList,
  AreaPhoto,
  Photo,
  SeparatorPhoto,
  AreaButtons,
  AreaButtonServices,
  ButtonServices,
  TitleButtonService,
  AreaButtonBackNext,
  AreaButtonBack,
  TitleButtonBack,
  AreaButtonNext,
  TitleButtonNext,
} from './styles';

import { useAuth } from '../../../../hooks/auth';

import { useCommon } from '../../../../hooks/common';

import { useError } from '../../../../hooks/error';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { useClientUser } from '../../../../hooks/clientUser';
import { UserProvider } from '../../../../hooks/providerUser';
import { useTag } from '../../../../hooks/tag';
import { getOldest } from '../../../../utils/getOldest';
import { firstLetterUppercase } from '../../../../utils/firstLetterUppercase';
import {
  ModalServices,
  ServiceFormattedModalService,
} from '../../../../components/ModalServices';

export interface Focusable {
  focus(): void;
}

interface Params {
  providerSelect: UserProvider;
  servicesSelect: ServiceFormattedModalService[];
}

export function HourSelect() {
  const route = useRoute();
  const theme = useTheme();
  const [listServiceFormatted, setListServiceFormatted] = useState<
    ServiceFormattedModalService[]
  >([] as ServiceFormattedModalService[]);
  const [modalService, setModalService] = useState<boolean>(false);
  const [handleContinued, setHandleContinued] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const {
    userClient,
    providers,
    getProviders,
    setFavoriteProvider,
    setAppointmentStageClient,
  } = useClientUser();
  const { getTags, tags } = useTag();
  const { signIn, signOut } = useAuth();

  const navigation = useNavigation<ScreenNavigationProp>();
  const { providerSelect } = route.params as Params;
  const { images, services } = providerSelect;
  const { name, last_name: lastName, image_profile: imageProfile } = userClient;

  async function handleLogout() {
    await signOut();
  }

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (!!services?.length && services?.length > 0) {
        setListServiceFormatted(
          services?.map(service => ({
            ...service,
            select: false,
            expand: false,
          })),
        );
      }
    }
    return () => {
      unmounted = true;
      setListServiceFormatted([] as ServiceFormattedModalService[]);
    };
  }, [services]);
  function handleCloseServiceModal() {
    setModalService(false);
  }
  function handleOpenServiceModal() {
    setModalService(true);
  }
  function handleSaveListServices(
    serviceSelect: Array<ServiceFormattedModalService>,
  ) {
    setModalService(false);
    const servicesSelects = serviceSelect.filter(service => service.select);
    setListServiceFormatted(serviceSelect);
    if (servicesSelects.length > 0) {
      setHandleContinued(true);
      setAppointmentStageClient({
        provider: providerSelect,
        services: listServiceFormatted,
        stage: {
          route: 'ClientAppointmentStackRoutes',
          children: 'ClientAppointmentStagesProviderSelectServiceStack',
          params_name: 'providerSelect',
        },
      });
    }
  }

  function handleBackClientSelect() {
    navigation.goBack();
  }

  function handleSelectHours() {
    navigation.navigate('ClientAppointmentStagesProviderSelectHourStack', {
      providerSelect: provider,
      servicesSelect: listServiceFormatted,
    });
  }

  return (
    <Container>
      <ModalServices
        modalVisible={modalService}
        handleClosedModal={handleCloseServiceModal}
        services={listServiceFormatted}
        titleWithoutItens="Não ha serviços disponiveis"
        handleSaveChanges={handleSaveListServices}
      />
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
        <AreaButtons>
          <AreaButtonServices>
            <ButtonServices onPress={handleOpenServiceModal}>
              <TitleButtonService>Serviços</TitleButtonService>
            </ButtonServices>
          </AreaButtonServices>
          <AreaButtonBackNext>
            <AreaButtonBack onPress={handleBackClientSelect}>
              <TitleButtonBack>Voltar</TitleButtonBack>
            </AreaButtonBack>
            {handleContinued && (
              <AreaButtonNext onPress={handleSelectHours}>
                <TitleButtonNext>Avançar</TitleButtonNext>
              </AreaButtonNext>
            )}
          </AreaButtonBackNext>
        </AreaButtons>
      </Body>
    </Container>
  );
}
