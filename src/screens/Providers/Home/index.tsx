import React, { createRef, useEffect } from 'react';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import LogoTitleSvg from '../../../assets/logo_title.svg';
import {
  Container,
  AreaAppointmentTitle,
  AreaAppointments,
  AreaAppointmentContent,
  AreaLogoTitle,
  AreaTitle,
  Title,
  Form,
  Footer,
  Icon,
  SubTitle,
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
  AreaSymbolAmount,
  AreaValueAmount,
  AreaInfoDate,
} from './styles';

import { useAuth } from '../../../hooks/auth';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import {
  appErrorVerifyError,
  VerifyErrorDTO,
} from '../../../errors/appErrorVerify';
import { WarningText } from '../../../components/WarningText';
import { ScreenNavigationProp } from '../../../routes';
import { HeaderProfile } from '../../../components/HeaderProfile';
import { useProviderUser } from '../../../hooks/providerUser';
import { getPlatformDate } from '../../../utils/getPlatformDate';

export interface Focusable {
  focus(): void;
}
export function HomeProvider() {
  const theme = useTheme();
  const { isLoading, setIsLoading, appError, setAppError } = useCommon();
  const { userProvider } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;

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
        <AreaAppointments>
          <AreaAppointmentTitle>
            <AreaTitle>
              <Title>Agendamentos pendentes de aprovação</Title>
            </AreaTitle>
            <AreaIcon>
              <Icon
                name="calendar"
                size={RFValue(25)}
                color={theme.colors.white_medium}
              />
            </AreaIcon>
          </AreaAppointmentTitle>
          <AreaAppointmentContent>
            <List
              keyExtractor={(item, index) => index.toString()}
              data={userProvider.appointments?.opens}
              renderItem={({ item }) => {
                return (
                  <AreaAppointmentButton>
                    <AreaPhoto>
                      <PhotoClientAppointment
                        source={{
                          uri:
                            item.clients &&
                            item.clients[0].image_profile &&
                            item.clients[0].image_profile[0].image.link,
                        }}
                      />
                    </AreaPhoto>
                    <AreaInfoLocalDate>
                      <AreaInfoLocal
                        color={theme.colors.success_chateau_green}
                        style={{ marginBottom: 5 }}
                      >
                        <IconInfoLocal>
                          <Icon
                            name="map-pin"
                            size={RFValue(25)}
                            color={theme.colors.shape}
                          />
                        </IconInfoLocal>
                        <AreaTextInfoLocal>
                          <TextInfoLocal numberOfLines={1}>
                            {item.addresses[0].address.street}
                            {' ,'}
                            {item.addresses[0].address.number}
                          </TextInfoLocal>
                        </AreaTextInfoLocal>
                      </AreaInfoLocal>
                      <AreaInfoDate color="transparent">
                        <IconInfoDateLocal
                          style={{
                            backgroundColor:
                              theme.colors.blue_catalina_dark_shade,
                            borderRadius: 6,
                          }}
                        >
                          <Icon
                            name="calendar"
                            size={RFValue(25)}
                            color={theme.colors.shape}
                          />
                        </IconInfoDateLocal>
                        <AreaTextInfoDateLocal>
                          <TextInfoLocal size={14} numberOfLines={1}>
                            {format(
                              getPlatformDate(new Date(item.initial_date)),
                              'dd/MM - HH:mm',
                            )}
                          </TextInfoLocal>
                        </AreaTextInfoDateLocal>
                        <AreaTextInfoDateLocal>
                          <TextInfoLocal size={14} numberOfLines={1}>
                            {format(
                              getPlatformDate(new Date(item.final_date)),
                              'dd/MM - HH:mm',
                            )}
                          </TextInfoLocal>
                        </AreaTextInfoDateLocal>
                      </AreaInfoDate>
                    </AreaInfoLocalDate>
                    <AreaAmount>
                      <AreaSymbolAmount>
                        <ValueAmount size={22}>R$</ValueAmount>
                      </AreaSymbolAmount>
                      <AreaValueAmount>
                        <ValueAmount size={22}>1234</ValueAmount>
                        <ValueAmount style={{ top: -10, left: -15 }} size={14}>
                          ,12
                        </ValueAmount>
                      </AreaValueAmount>
                    </AreaAmount>
                  </AreaAppointmentButton>
                );
              }}
            />
          </AreaAppointmentContent>
        </AreaAppointments>
      </Form>
      <Footer />
    </Container>
  );
}
