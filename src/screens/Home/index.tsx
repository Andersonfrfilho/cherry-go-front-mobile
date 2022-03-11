import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Body,
  Footer,
  AreaSearch,
  AreaInput,
  Input,
  AreaIcon,
  Icon,
  AreaTagsFilter,
  AreaImageTag,
  TitleItemTag,
  TitleTag,
  ImageItemTag,
  AreaItemTag,
  List,
  AreaTagsTitleFilter,
  TagTitleFilter,
  AreaItemWithoutTag,
  TitleWithoutTag,
  AreaProvidersSelect,
  AreaProvidersTitle,
  ProviderTitle,
  AreaItemProvider,
  AreaImageProvider,
  ImageItemProvider,
  TitleItemProvider,
  TitleProvider,
  ListProviders,
  AreaIconRemoveTag,
  AreaRatingProvider,
  AreaIcons,
  IconFontAwesome,
  LoadingText,
  AreaTitleProvider,
  AreaLoadingListProvider,
  AreaButtonUpdate,
  ButtonUpdateTitle,
  TitleItemDateProvider,
  AreaFavIcon,
  IconMaterialCommunityIcons,
  ProviderDistanceTitle,
  AreaDistance,
  AreaDistanceIcon,
  ModalChangeDistance,
  AreaInputDistance,
  InputDistance,
  AreaButtons,
  ButtonTitle,
  AreaModalDistance,
  AreaContentModalDistance,
  AreaTitleInputDistance,
  TitleInputDistance,
  AreaButtonCancel,
  AreaButtonSave,
  AreaButtonFinalizerRegister,
  ButtonFinalizerRegisterTitle,
} from './styles';

import { useAuth } from '../../hooks/auth';

import { useCommon } from '../../hooks/common';

import { useError } from '../../hooks/error';
import { ScreenNavigationProp } from '../../routes';
import { HeaderProfile } from '../../components/HeaderProfile';
import { useClientUser } from '../../hooks/clientUser';
import { UserProvider } from '../../hooks/providerUser';
import { Tag, useTag } from '../../hooks/tag';
import {
  ItensListSelectTagInterface,
  ModalTagSelect,
} from '../../components/ModalTagsSelesct';
import { Load } from '../../components/Load';
import { Button } from '../../components/Button';
import { firstLetterUppercase } from '../../utils/firstLetterUppercase';
import { ButtonIcon } from '../../components/ButtonIcon';
import { GENDER_BR_ENUM } from '../../enums/genderType.enum';
import { getOldest } from '../../utils/getOldest';
import { MINIMAL_RADIUS_DISTANCE } from '../../enums/geolocation.enum';
import { navigate } from '../../routes/RootNavigation';

export interface Focusable {
  focus(): void;
}
export function HomeClient({ navigation: { openDrawer, closeDrawer } }) {
  const [distanceRadius, setDistanceRadius] = useState<number>(3000);
  const [forceLocation, setForceLocation] = useState<boolean>(true);
  const [highAccuracy, setHighAccuracy] = useState<boolean>(true);
  const [locationDialog, setLocationDialog] = useState<boolean>(true);
  const [useLocationManager, setUseLocationManager] = useState<boolean>(false);
  const [getCurrentLocation, setGetCurrentLocation] = useState<boolean>(false);
  const [findProviderText, setFindProviderText] = useState<string>('');
  const [listFilteredProviders, setListFilteredProviders] = useState<
    UserProvider[]
  >([] as UserProvider[]);
  const [listFilteredOriginalProviders, setListFilteredOriginalProviders] =
    useState<UserProvider[]>([] as UserProvider[]);
  const [listTagFormatted, setListTagFormatted] = useState<
    ItensListSelectTagInterface[]
  >([] as ItensListSelectTagInterface[]);
  const [listTagSelectFormatted, setListTagSelectFormatted] = useState<
    ItensListSelectTagInterface[]
  >([] as ItensListSelectTagInterface[]);
  const [modalTagSelectVisible, setModalTagSelectVisible] =
    useState<boolean>(false);
  const [openModalDistanceRadius, setOpenModalDistanceRadius] =
    useState<boolean>(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { userClient, providers, getProviders, setFavoriteProvider } =
    useClientUser();
  const { getTags, tags } = useTag();
  const { signIn, signOut } = useAuth();

  const navigation = useNavigation<ScreenNavigationProp>();

  const { name, last_name: lastName, image_profile: imageProfile } = userClient;

  async function handleLogout() {
    await signOut();
  }

  async function getLocation() {
    setIsLoading(true);
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
        coords: { longitude, latitude },
      } = position;
      setLocation({ longitude, latitude });

      setGetCurrentLocation(true);
    } catch (err) {
      setGetCurrentLocation(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(false);
    setAppError({});
    let unmounted = false;
    if (!unmounted) {
      getLocation();
      getTags({});
    }
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getProviders({
        distance: String(distanceRadius),
        latitude: '',
        longitude: '',
      });
    }
  }, [location]);

  useEffect(() => {
    if (!!providers.length && providers.length > 0) {
      setListFilteredProviders(providers);
      setListFilteredOriginalProviders(providers);
    }
  }, [providers]);

  useEffect(() => {
    if (!!providers.length && providers.length > 0) {
      const newList = listFilteredOriginalProviders.filter(provider =>
        provider.name.toLowerCase().includes(findProviderText.toLowerCase()),
      );
      setListFilteredProviders(newList);
    } else {
      setListFilteredProviders(listFilteredOriginalProviders);
    }
  }, [findProviderText]);

  useEffect(() => {
    if (!!tags.length && tags.length > 0) {
      setListTagFormatted(tags.map(tag => ({ ...tag, select: false })));
    }
  }, [tags]);

  function handleCloseModal() {
    setModalTagSelectVisible(false);
  }

  function handleOpenModal() {
    setModalTagSelectVisible(true);
  }

  function handleSaveTagFilter(list: ItensListSelectTagInterface[]) {
    setListTagSelectFormatted(list.filter(tag => tag.select));
    setListTagFormatted(list);
    setModalTagSelectVisible(false);
  }

  function removeTagFilter(tag: Tag) {
    const newList = listTagSelectFormatted.filter(
      tagSelect => tagSelect.id !== tag.id,
    );
    const newListFormatted = listTagFormatted.map(tagSelect => {
      if (tagSelect.id === tag.id) {
        return {
          ...tagSelect,
          select: false,
        };
      }
      return tagSelect;
    });
    setListTagSelectFormatted(newList);
    setListTagFormatted(newListFormatted);
  }

  async function handleUpdateProviders() {
    await getProviders({
      distance: String(distanceRadius),
      latitude: '',
      longitude: '',
    });
  }

  async function handleFavoriteProvider(id: string) {
    await setFavoriteProvider({
      distance: String(distanceRadius),
      provider_id: id,
      latitude: String(location.latitude) || '',
      longitude: String(location.longitude) || '',
    });
  }

  function handleOpenModalDistance() {
    setOpenModalDistanceRadius(true);
  }

  function handleSetDistanceRadius(value: number) {
    setOpenModalDistanceRadius(false);
  }

  function handleRegisterFinalizer() {
    if (!userClient.phones.number) {
      navigation.navigate('SignUpThirdStep');
    }
    if (!userClient.addresses.street) {
      navigation.navigate('SignUpSecondStep');
    }
    // adicionar documentos
  }
  useEffect(() => {
    if (distanceRadius >= MINIMAL_RADIUS_DISTANCE) {
      getProviders({
        distance: String(distanceRadius),
        // latitude: String(location.latitude) || '',
        // longitude: String(location.longitude) || '',
        latitude: '',
        longitude: '',
      });
    }
  }, [distanceRadius]);
  function handleSelectProvider(provider: UserProvider) {
    navigation.navigate('ClientAppointmentStackRoutes', {
      screen: 'ClientAppointmentStagesProviderSelectServiceStack',
      params: { providerSelect: provider },
    });
  }

  function handleOpenDrawer() {
    openDrawer();
  }

  return (
    <Container>
      <ModalTagSelect
        modalVisible={modalTagSelectVisible}
        titleWithoutItens="não temos nenhum item"
        itens={listTagFormatted}
        handleSaveChanges={handleSaveTagFilter}
        handleClosedModal={handleCloseModal}
      />
      <ModalChangeDistance
        animationType="slide"
        transparent
        visible={openModalDistanceRadius}
      >
        <AreaContentModalDistance>
          <AreaModalDistance>
            <AreaTitleInputDistance>
              <TitleInputDistance>
                Digite um raio de distancia:
              </TitleInputDistance>
            </AreaTitleInputDistance>
            <AreaInputDistance>
              <InputDistance
                precision={0}
                prefix=""
                delimiter=""
                separator=""
                suffix=" (m)"
                value={distanceRadius}
                onChangeValue={setDistanceRadius}
              />
            </AreaInputDistance>
            <AreaButtons>
              <AreaButtonCancel onPress={handleSetDistanceRadius}>
                <ButtonTitle>Fechar</ButtonTitle>
              </AreaButtonCancel>
            </AreaButtons>
          </AreaModalDistance>
        </AreaContentModalDistance>
      </ModalChangeDistance>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
        image={imageProfile && imageProfile.link}
        handleToggleMenu={handleOpenDrawer}
      />
      <Body>
        <AreaSearch>
          <AreaInput>
            <Input
              placeholder="Digite o nome:"
              onChangeText={setFindProviderText}
              value={findProviderText}
              maxLength={30}
            />
          </AreaInput>
          <AreaIcon>
            <Icon
              name="search"
              size={RFValue(25)}
              color={theme.colors.bon_jour_light_shade}
            />
          </AreaIcon>
        </AreaSearch>

        {listTagSelectFormatted.length > 0 ? (
          <AreaTagsFilter>
            <AreaTagsTitleFilter onPress={handleOpenModal}>
              <TagTitleFilter>Tags</TagTitleFilter>
            </AreaTagsTitleFilter>
            {!!tags && listTagSelectFormatted.length > 0 && (
              <List
                data={listTagSelectFormatted}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <AreaItemTag>
                      <AreaIconRemoveTag onPress={() => removeTagFilter(item)}>
                        <Icon
                          name="x-circle"
                          size={RFValue(32)}
                          color={theme.colors.red_closed}
                        />
                      </AreaIconRemoveTag>
                      <AreaImageTag>
                        <ImageItemTag
                          source={{
                            uri: item.image.link,
                          }}
                        />
                      </AreaImageTag>

                      <TitleItemTag>
                        <TitleTag numberOfLines={1}>{item.name}</TitleTag>
                      </TitleItemTag>
                    </AreaItemTag>
                  );
                }}
                horizontal
              />
            )}
          </AreaTagsFilter>
        ) : (
          <AreaTagsTitleFilter onPress={handleOpenModal}>
            <TagTitleFilter>Selecione uma tag</TagTitleFilter>
          </AreaTagsTitleFilter>
        )}
        <AreaProvidersSelect>
          <AreaProvidersTitle>
            <AreaTitleProvider>
              <ProviderTitle numberOfLines={1}>{`${
                listFilteredProviders.length > 0
                  ? 'Selecione uma provedora'
                  : isLoading
                  ? 'estamos buscando provedoras...'
                  : 'sem provedoras disponíveis'
              }`}</ProviderTitle>
            </AreaTitleProvider>
            <AreaLoadingListProvider>
              {isLoading && <LoadingText size="small" color="white" />}
              {!!providers && !isLoading && (
                <AreaDistance onPress={handleOpenModalDistance}>
                  <ProviderDistanceTitle numberOfLines={1}>
                    {`${distanceRadius} m`}
                  </ProviderDistanceTitle>
                  <AreaDistanceIcon>
                    <IconMaterialCommunityIcons
                      name="map-marker-radius"
                      size={
                        listTagSelectFormatted.length > 0
                          ? RFValue(15)
                          : RFValue(20)
                      }
                      color={theme.colors.bon_jour_light_shade}
                    />
                  </AreaDistanceIcon>
                </AreaDistance>
              )}
            </AreaLoadingListProvider>
          </AreaProvidersTitle>
          {!!providers && !isLoading && providers.length === 0 && (
            <AreaButtonUpdate>
              <ButtonUpdateTitle onPress={handleUpdateProviders}>
                Atualizar
              </ButtonUpdateTitle>
            </AreaButtonUpdate>
          )}
          {!!providers && providers.length > 0 && (
            <ListProviders
              data={providers}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                return (
                  <AreaItemProvider
                    disabled={
                      !userClient.phones.number && !userClient.addresses.street
                    }
                    onPress={() => handleSelectProvider(item)}
                  >
                    <AreaImageProvider>
                      <ImageItemProvider
                        source={{
                          uri: item?.images[0]?.image?.link,
                        }}
                        resizeMode="stretch"
                      />
                    </AreaImageProvider>
                    <AreaFavIcon
                      tagsSelected={listTagSelectFormatted.length > 0}
                      onPress={() => handleFavoriteProvider(item.id)}
                      favProvider={item.favorite}
                    >
                      <Icon
                        name="heart"
                        size={
                          listTagSelectFormatted.length > 0
                            ? RFValue(20)
                            : RFValue(25)
                        }
                        color={theme.colors.bon_jour_light_shade}
                      />
                    </AreaFavIcon>
                    <TitleItemProvider>
                      <TitleProvider
                        numberOfLines={1}
                        tagsSelected={listTagSelectFormatted.length > 0}
                      >
                        {item.details?.fantasy_name
                          ? item.details?.fantasy_name
                          : `${firstLetterUppercase(
                              item.name,
                            )} ${firstLetterUppercase(item.last_name)}`}
                      </TitleProvider>
                    </TitleItemProvider>
                    <TitleItemDateProvider>
                      <TitleProvider
                        numberOfLines={1}
                        tagsSelected={listTagSelectFormatted.length > 0}
                      >
                        {`${GENDER_BR_ENUM[item.gender]}`}
                      </TitleProvider>
                      <TitleProvider
                        numberOfLines={1}
                        tagsSelected={listTagSelectFormatted.length > 0}
                      >{` - `}</TitleProvider>
                      <TitleProvider
                        numberOfLines={1}
                        tagsSelected={listTagSelectFormatted.length > 0}
                      >
                        {`${getOldest(new Date(item.birth_date))}`}
                      </TitleProvider>
                    </TitleItemDateProvider>
                    <AreaRatingProvider>
                      {Array.from(Array(5).keys()).map((element, index) => (
                        <AreaIcon key={element.toString()}>
                          <IconFontAwesome
                            name={
                              index <= Number(item?.ratings) - 1
                                ? 'star'
                                : 'star-o'
                            }
                            size={
                              listTagSelectFormatted.length > 0
                                ? RFValue(20)
                                : RFValue(25)
                            }
                            color={theme.colors.desative_shade}
                          />
                        </AreaIcon>
                      ))}
                    </AreaRatingProvider>
                  </AreaItemProvider>
                );
              }}
              horizontal
            />
          )}
          {!userClient.phones.number && !userClient.addresses.street && (
            <AreaButtonFinalizerRegister onPress={handleRegisterFinalizer}>
              <ButtonFinalizerRegisterTitle>
                Completar cadastro
              </ButtonFinalizerRegisterTitle>
            </AreaButtonFinalizerRegister>
          )}
        </AreaProvidersSelect>
      </Body>
    </Container>
  );
}
