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
  AreaCheckBox,
  TitleLocalType,
  AreaLocalOwn,
  AreaLocalOwners,
  AreaLocalOwnLocals,
  AreaLocalOwnLocal,
  IconMaterialCommunity,
  AreaCheckBoxAddAddress,
  AreaServices,
  AreaServiceTitle,
  AreaServicesContent,
  AreaTitleServiceType,
  TitleAddService,
  AreaServicesAvailable,
  AreaCheckBoxService,
  AreaIconRemoveService,
  TitleService,
  AreaButtonAddService,
} from './styles';
import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { useProviderUser } from '../../../../hooks/providerUser';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { useLocal } from '../../../../hooks/local';
import { LOCALS_TYPES_ENUM } from '../../../../enums/localsTypes.enum';
import { getValueAmount } from '../../../../utils/formatValueAmount';

export interface Focusable {
  focus(): void;
}
interface HandleCrateTypeClientLocalParamsDTO {
  selected?: boolean;
  id?: string;
}

export function RegistrationsAvailabilitiesServicesProvider() {
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

    deleteServiceProvider,
  } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    services,
  } = userProvider;

  useEffect(() => {
    loadUserData();
    getAllLocalsAvailable();
    return () => {
      setLocalClientAvailable(false);
      setLocalOwnAvailable(false);
    };
  }, []);

  async function handleDeleteService(service_id: string) {
    await deleteServiceProvider(service_id);
  }

  function handleAddServicePage() {
    navigation.push(
      'RegistrationsAvailabilitiesServicesAditionalProviderServiceStack',
    );
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
          <AreaServices>
            <AreaServiceTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Serviços cadastrados</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <Icon
                      name="briefcase"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaServiceTitle>
            <AreaServicesContent>
              <AreaButtonAddService onPress={handleAddServicePage}>
                <AreaIcon>
                  <IconMaterialCommunity
                    name="plus-circle"
                    size={RFValue(30)}
                    color={theme.colors.main_light}
                  />
                </AreaIcon>
                <AreaTitleServiceType>
                  <TitleAddService>Adicionar serviço</TitleAddService>
                </AreaTitleServiceType>
              </AreaButtonAddService>
              <AreaServicesAvailable>
                {services &&
                  services?.map((service, index) => (
                    <AreaCheckBoxService key={index.toString()}>
                      <AreaIcon>
                        <Icon
                          name="tag"
                          size={RFValue(25)}
                          color={theme.colors.background_primary}
                        />
                      </AreaIcon>
                      <AreaTitleServiceType>
                        <TitleService numberOfLines={3}>
                          {service.name}
                        </TitleService>
                      </AreaTitleServiceType>
                      <AreaIconRemoveService
                        onPress={() => handleDeleteService(service.id)}
                      >
                        <Icon
                          name="x-circle"
                          size={RFValue(25)}
                          color={theme.colors.red_ku_crimson}
                        />
                      </AreaIconRemoveService>
                    </AreaCheckBoxService>
                  ))}
              </AreaServicesAvailable>
            </AreaServicesContent>
          </AreaServices>
        )}
      </Form>
    </Container>
  );
}
