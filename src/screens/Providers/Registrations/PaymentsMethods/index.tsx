import React, { useEffect } from 'react';
import brazilLocale from 'date-fns/locale/pt-BR';
import { Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import {
  Container,
  AreaAppointmentTitle,
  AreaAppointments,
  AreaAppointmentContent,
  AreaTitle,
  Title,
  Form,
  Icon,
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
} from './styles';

import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../../hooks/providerUser';
import { getPlatformDate } from '../../../../utils/getPlatformDate';
import { getValueAmount } from '../../../../utils/formatValueAmount';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';

export interface Focusable {
  focus(): void;
}
export function RegistrationsAvailabilitiesPaymentsMethodsProvider() {
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { userProvider, loadUserData } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;

  async function handleSelectedAppointment(appointment: Appointment) {
    navigation.navigate('AppointmentsDetailsProvider', { appointment });
  }

  useEffect(() => {
    loadUserData();
  }, []);

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
          imageProfile && imageProfile[0].image && imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaAppointments>
            <AreaAppointmentTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Metodos de pagamentos</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <Icon
                      name="dollar-sign"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaAppointmentTitle>
          </AreaAppointments>
        )}
      </Form>
    </Container>
  );
}
