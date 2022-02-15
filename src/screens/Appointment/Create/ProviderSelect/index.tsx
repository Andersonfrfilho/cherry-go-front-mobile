import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
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

import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { useClientUser } from '../../../../hooks/clientUser';
import { UserProvider } from '../../../../hooks/providerUser';
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
}

export function ClientAppointmentCreateProviderSelect() {
  const route = useRoute();
  const theme = useTheme();
  const [listServiceFormatted, setListServiceFormatted] = useState<
    ServiceFormattedModalService[]
  >([] as ServiceFormattedModalService[]);
  const [modalService, setModalService] = useState<boolean>(false);
  const [handleContinued, setHandleContinued] = useState<boolean>(false);
  const [necessaryMilliseconds, setNecessaryMilliseconds] = useState<number>(0);

  const { userClient, setAppointmentStageClient } = useClientUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const { providerSelect } = route.params as Params;
  const { images, services } = providerSelect;
  const { name, last_name: lastName, image_profile: imageProfile } = userClient;

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
  async function handleSaveListServices(
    serviceSelect: Array<ServiceFormattedModalService>,
  ) {
    setModalService(false);
    const servicesSelects = serviceSelect.filter(service => service.select);

    setListServiceFormatted(serviceSelect);

    if (servicesSelects.length > 0) {
      setNecessaryMilliseconds(
        servicesSelects.reduce(
          (valueCurrent, service) => valueCurrent + Number(service.duration),
          0,
        ),
      );
      setHandleContinued(true);
      await setAppointmentStageClient({
        provider: providerSelect,
        services: listServiceFormatted,
        stage: {
          route: 'ClientAppointmentStackRoutes',
          children: 'ClientAppointmentStagesProviderSelectServiceStack',
          params_name: 'providerSelect',
        },
        necessaryMilliseconds,
      });
    }
  }

  function handleBackClientSelect() {
    navigation.goBack();
  }

  function handleSelectHours() {
    navigation.navigate('ClientAppointmentStagesProviderSelectHourStack', {
      providerSelect,
      servicesSelect: listServiceFormatted,
      necessaryMilliseconds,
    });
  }

  return (
    <Container>
      <ModalServices
        modalVisible={modalService}
        handleClosedModal={handleCloseServiceModal}
        services={listServiceFormatted}
        titleWithoutItens="Não ha serviços disponíveis"
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
        <AreaHeader>
          <AreaNameDistanceIcon>
            <AreaName>
              <Name>
                {providerSelect.details?.fantasy_name
                  ? firstLetterUppercase(providerSelect.details?.fantasy_name)
                  : `${firstLetterUppercase(
                      providerSelect.name,
                    )} ${firstLetterUppercase(providerSelect.last_name)}`}
              </Name>
            </AreaName>
            <AreaDistanceIcon>
              <AreaDistance>
                <Distance>30 m</Distance>
              </AreaDistance>
              <AreaIconDistance>
                <IconMaterialCommunityIcons
                  name="map-marker-radius"
                  size={RFValue(20)}
                  color={theme.colors.bon_jour_light_shade}
                />
              </AreaIconDistance>
            </AreaDistanceIcon>
          </AreaNameDistanceIcon>
          <AreaRatingAge>
            <AreaRating>
              {Array.from(Array(5).keys()).map((element, index) => (
                <AreaIconRating key={element.toString()}>
                  <IconFontAwesome
                    name={
                      index <= Number(providerSelect.ratings) - 1
                        ? 'star'
                        : 'star-o'
                    }
                    size={RFValue(25)}
                    color={
                      index <= Number(providerSelect.ratings) - 1
                        ? theme.colors.main_light
                        : theme.colors.bon_jour
                    }
                  />
                </AreaIconRating>
              ))}
            </AreaRating>
            <AreaAge>
              <Age>{getOldest(new Date(providerSelect.birth_date))}</Age>
            </AreaAge>
          </AreaRatingAge>
        </AreaHeader>
        <AreaPhotosSlideList>
          {!!images && images.length > 0 && (
            <SlidePhotosList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({ item }) => {
                return (
                  <AreaPhoto>
                    <Photo
                      source={{
                        // uri: item.image.link,
                        uri: 'https://www.playboy.com.mx/wp-content/uploads/2019/01/Lena-S%C3%B6derberg-imagen-completa.jpg',
                      }}
                      resizeMode="stretch"
                    />
                  </AreaPhoto>
                );
              }}
              ItemSeparatorComponent={() => <SeparatorPhoto />}
            />
          )}
        </AreaPhotosSlideList>
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
