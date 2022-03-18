import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  AreaOptions,
  AreaPageTitle,
  AreaOptionsContent,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaOptionLine,
  AreaOptionButton,
  AreaIcon,
  List,
  SubTitle,
  AreaOptionImage,
  AreaOptionSubTitle,
} from './styles';

import { useCommon } from '../../../hooks/common';
import { WarningText } from '../../../components/WarningText';
import { ScreenNavigationProp } from '../../../routes';
import { HeaderProfile } from '../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../hooks/providerUser';
import { Load } from '../../../components/Load';
import { useError } from '../../../hooks/error';
import { navigate } from '../../../routes/RootNavigation';

export interface OptionRegister {
  name: string;
}

export interface Focusable {
  focus(): void;
}
export function RegistrationsProvider() {
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { userProvider, loadUserData } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    payments_types,
    days,
    hours,
  } = userProvider;

  useEffect(() => {
    loadUserData();
    return () => {};
  }, []);

  function handlePageOptionRegister(routeName: string) {
    navigation.navigate(routeName);
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
          <>
            <AreaOptions>
              <AreaPageTitle>
                {appError && appError.message ? (
                  <AreaTitle>
                    <WarningText title={appError.message} />
                  </AreaTitle>
                ) : (
                  <>
                    <AreaTitle>
                      <Title color={theme.colors.background_primary}>
                        Cadastros
                      </Title>
                    </AreaTitle>
                    <AreaIcon>
                      <Icon
                        name="grid"
                        size={RFValue(25)}
                        color={theme.colors.background_primary}
                      />
                    </AreaIcon>
                  </>
                )}
              </AreaPageTitle>
              <AreaOptionsContent>
                <AreaOptionLine>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'RegistrationsDetailsRoutesProviderStack',
                      )
                    }
                  >
                    <AreaOptionImage>
                      <Icon
                        name="menu"
                        size={RFValue(40)}
                        color={theme.colors.background_primary}
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle color={theme.colors.background_primary}>
                        Detalhes
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'RegistrationsPhotosRoutesProviderStack',
                      )
                    }
                  >
                    <AreaOptionImage>
                      <Icon
                        name="image"
                        size={RFValue(40)}
                        color={theme.colors.background_primary}
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle color={theme.colors.background_primary}>
                        Fotos
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                </AreaOptionLine>
                <AreaOptionLine>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'RegistrationsAvailabilitiesRoutesProviderStack',
                      )
                    }
                  >
                    <AreaOptionImage>
                      <Icon
                        name="calendar"
                        size={RFValue(40)}
                        color={theme.colors.background_primary}
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle color={theme.colors.background_primary}>
                        Disponibilidades
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'AppProviderNativeRegistrationPaymentMethodsRoutesProviderStack',
                      )
                    }
                    disabled={days?.length === 0 || hours?.length === 0}
                  >
                    <AreaOptionImage>
                      <Icon
                        name="dollar-sign"
                        size={RFValue(40)}
                        color={
                          days?.length === 0 || hours?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle
                        color={
                          days?.length === 0 || hours?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      >
                        Pagamentos
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                </AreaOptionLine>
                <AreaOptionLine>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'RegistrationsAvailabilitiesLocalsRoutesProviderStack',
                      )
                    }
                    disabled={payments_types?.length === 0}
                  >
                    <AreaOptionImage>
                      <Icon
                        name="map-pin"
                        size={RFValue(40)}
                        color={
                          payments_types?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle
                        color={
                          payments_types?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      >
                        Locais
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'RegistrationsAvailabilitiesTransportTypesRoutesProviderStack',
                      )
                    }
                    disabled={payments_types?.length === 0}
                  >
                    <AreaOptionImage>
                      <Icon
                        name="navigation"
                        size={RFValue(40)}
                        color={
                          payments_types?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle
                        color={
                          payments_types?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      >
                        Transportes
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                </AreaOptionLine>
                <AreaOptionLine>
                  <AreaOptionButton
                    onPress={() =>
                      handlePageOptionRegister(
                        'RegistrationsAvailabilitiesServicesRoutesProviderStack',
                      )
                    }
                    disabled={payments_types?.length === 0}
                  >
                    <AreaOptionImage>
                      <Icon
                        name="layers"
                        size={RFValue(40)}
                        color={
                          payments_types?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle
                        color={
                          payments_types?.length === 0
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      >
                        Serviços
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton>
                  {/* <AreaOptionButton onPress={() => {}}>
                    <AreaOptionImage>
                      <Icon
                        name="settings"
                        size={RFValue(40)}
                        color={theme.colors.background_primary}
                      />
                    </AreaOptionImage>
                    <AreaOptionSubTitle>
                      <SubTitle color={theme.colors.background_primary}>
                        Configurações
                      </SubTitle>
                    </AreaOptionSubTitle>
                  </AreaOptionButton> */}
                </AreaOptionLine>
              </AreaOptionsContent>
            </AreaOptions>
          </>
        )}
      </Form>
    </Container>
  );
}
