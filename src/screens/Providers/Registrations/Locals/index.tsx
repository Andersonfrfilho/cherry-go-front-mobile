import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaLocalClient,
  AreaTextInfoDateLocal,
  AreaAppointmentButton,
  AreaIcon,
  List,
  AreaPhoto,
  PhotoClientAppointment,
  IconInfoDateLocal,
  AreaInfoLocalDate,
  AreaInfoLocal,
  IconInfoLocal,
  AreaTextInfoLocal,
  TextInfoLocal,
  AreaAmount,
  ValueAmount,
  AreaInfoDate,
  AreaLocals,
  AreaLocalTitle,
  AreaLocalsContent,
  AreaCheckBox,
  AreaTitleLocalType,
  TitleLocalType,
  AreaLocalOwn,
  AreaLocalOwners,
  AreaLocalOwnLocals,
  AreaLocalOwnLocal,
  IconMaterialCommunity,
  AreaCheckBoxAddAddress,
  AreaCheckBoxLocal,
  AreaLocalsAvailable,
  AreaIconRemoveLocal,
  TitleLocal,
  TitleAddLocal,
} from './styles';
import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../../hooks/providerUser';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { useLocal } from '../../../../hooks/local';
import { LOCALS_TYPES_ENUM } from '../../../../enums/localsTypes.enum';
import { useClientUser } from '../../../../hooks/clientUser';
import { getValueAmount } from '../../../../utils/formatValueAmount';

export interface Focusable {
  focus(): void;
}
interface HandleCrateTypeClientLocalParamsDTO {
  selected?: boolean;
  id?: string;
}

export function RegistrationsAvailabilitiesLocalsProvider() {
  const [localClientAvailable, setLocalClientAvailable] =
    useState<boolean>(false);
  const [localOwnAvailable, setLocalOwnAvailable] = useState<boolean>(false);
  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError } = useError();
  const { getAllLocalsAvailable, deleteLocalProvider } = useLocal();
  const {
    userProvider,
    loadUserData,
    deleteLocalsTypesAvailable,
    createLocalsTypesAvailable,
  } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    locals_types,
    locals,
  } = userProvider;

  async function handleSetClientTypeLocal({
    selected,
    id,
  }: HandleCrateTypeClientLocalParamsDTO) {
    if (selected && id) {
      deleteLocalsTypesAvailable([id]);
      return;
    }
    await createLocalsTypesAvailable(['client']);
  }

  async function handleSetOwnTypeLocal({
    selected,
    id,
  }: HandleCrateTypeClientLocalParamsDTO) {
    if (selected && id) {
      deleteLocalsTypesAvailable([id]);
      return;
    }
    await createLocalsTypesAvailable(['provider']);
  }

  useEffect(() => {
    loadUserData();
    getAllLocalsAvailable();
    return () => {
      setLocalClientAvailable(false);
      setLocalOwnAvailable(false);
    };
  }, []);

  useEffect(() => {
    if (!!locals_types && !!locals_types.length) {
      setLocalClientAvailable(
        locals_types.some(
          local => local.local_type === LOCALS_TYPES_ENUM.CLIENT,
        ),
      );
      setLocalOwnAvailable(
        locals_types.some(
          local => local.local_type === LOCALS_TYPES_ENUM.PROVIDER,
        ),
      );
    } else {
      setLocalClientAvailable(false);
      setLocalOwnAvailable(false);
    }
  }, [locals_types]);

  function handlePageAddAddress() {
    navigation.push('RegistrationsAvailabilitiesAddressesProviderStack');
  }

  async function handleDeleteLocal(local_id: string) {
    await deleteLocalProvider([local_id]);
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
        image={
          imageProfile &&
          imageProfile.length > 0 &&
          imageProfile[0].image &&
          imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaLocals>
            <AreaLocalTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Locais cadastrados</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <Icon
                      name="calendar"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaLocalTitle>
            <AreaLocalsContent>
              <AreaLocalClient>
                <AreaCheckBox
                  selected={localClientAvailable}
                  onPress={() =>
                    localClientAvailable
                      ? handleSetClientTypeLocal({
                          id: locals_types.find(
                            local =>
                              local.local_type === LOCALS_TYPES_ENUM.CLIENT,
                          )?.id,
                          selected: localClientAvailable,
                        })
                      : handleSetClientTypeLocal({
                          id: '',
                          selected: localClientAvailable,
                        })
                  }
                >
                  <AreaIcon>
                    <Icon
                      name={localClientAvailable ? 'check-square' : 'square'}
                      size={RFValue(25)}
                      color={
                        localClientAvailable
                          ? theme.colors.main_light
                          : theme.colors.background_primary
                      }
                    />
                  </AreaIcon>
                  <AreaTitleLocalType>
                    <TitleLocalType selected={localClientAvailable}>
                      Cliente
                    </TitleLocalType>
                  </AreaTitleLocalType>
                </AreaCheckBox>
              </AreaLocalClient>
              <AreaLocalOwners>
                <AreaLocalOwn>
                  <AreaCheckBox
                    selected={localOwnAvailable}
                    onPress={() =>
                      localOwnAvailable
                        ? handleSetOwnTypeLocal({
                            id: locals_types.find(
                              local =>
                                local.local_type === LOCALS_TYPES_ENUM.PROVIDER,
                            )?.id,
                            selected: localOwnAvailable,
                          })
                        : handleSetOwnTypeLocal({
                            id: '',
                            selected: localOwnAvailable,
                          })
                    }
                  >
                    <AreaIcon>
                      <Icon
                        name={localOwnAvailable ? 'check-square' : 'square'}
                        size={RFValue(25)}
                        color={
                          localOwnAvailable
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaIcon>
                    <AreaTitleLocalType>
                      <TitleLocalType selected={localOwnAvailable}>
                        Próprios
                      </TitleLocalType>
                    </AreaTitleLocalType>
                  </AreaCheckBox>
                </AreaLocalOwn>
                <AreaLocalOwnLocals>
                  <AreaLocalOwnLocal>
                    {localOwnAvailable && (
                      <AreaCheckBoxAddAddress
                        selected={localOwnAvailable}
                        onPress={handlePageAddAddress}
                      >
                        <AreaIcon>
                          <IconMaterialCommunity
                            name="map-marker-plus"
                            size={RFValue(30)}
                            color={theme.colors.background_primary}
                          />
                        </AreaIcon>
                        <AreaTitleLocalType>
                          <TitleAddLocal>Adicionar local</TitleAddLocal>
                        </AreaTitleLocalType>
                      </AreaCheckBoxAddAddress>
                    )}
                    <AreaLocalsAvailable>
                      {locals &&
                        locals?.map((local, index) => (
                          <AreaCheckBoxLocal key={index.toString()}>
                            <AreaIcon>
                              <Icon
                                name="home"
                                size={RFValue(25)}
                                color={theme.colors.background_primary}
                              />
                            </AreaIcon>
                            <AreaTitleLocalType>
                              <TitleLocal numberOfLines={3}>
                                {`${local.address.street}, ${
                                  local.address.number
                                } - ${local.address.district} ${
                                  local.address.city
                                }/${local.address.state} - ${
                                  local.address.zipcode
                                } ${getValueAmount(local.amount)}`}
                              </TitleLocal>
                            </AreaTitleLocalType>
                            <AreaIconRemoveLocal
                              onPress={() => handleDeleteLocal(local.id)}
                            >
                              <Icon
                                name="x-circle"
                                size={RFValue(25)}
                                color={theme.colors.red_ku_crimson}
                              />
                            </AreaIconRemoveLocal>
                          </AreaCheckBoxLocal>
                        ))}
                    </AreaLocalsAvailable>
                  </AreaLocalOwnLocal>
                </AreaLocalOwnLocals>
              </AreaLocalOwners>
            </AreaLocalsContent>
          </AreaLocals>
        )}
      </Form>
    </Container>
  );
}
