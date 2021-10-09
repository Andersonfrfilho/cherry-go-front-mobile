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

import { useCommon } from '../../../hooks/common';
import { WarningText } from '../../../components/WarningText';
import { ScreenNavigationProp } from '../../../routes';
import { HeaderProfile } from '../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../hooks/providerUser';
import { getPlatformDate } from '../../../utils/getPlatformDate';
import { getValueAmount } from '../../../utils/formatValueAmount';
import { Load } from '../../../components/Load';
import { useError } from '../../../hooks/error';

export interface Focusable {
  focus(): void;
}
export function HomeProvider() {
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
          <>
            <AreaAppointments>
              <AreaAppointmentTitle>
                {appError && appError.message ? (
                  <AreaTitle>
                    <WarningText title={appError.message} />
                  </AreaTitle>
                ) : (
                  <>
                    <AreaTitle>
                      <Title>Agendamentos pendentes</Title>
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
              </AreaAppointmentTitle>
              <AreaAppointmentContent>
                <List
                  keyExtractor={(item, index) => index.toString()}
                  data={userProvider.appointments?.opens}
                  ListEmptyComponent={() => (
                    <AreaTitle>
                      <Title>Sem agendamentos no momento</Title>
                    </AreaTitle>
                  )}
                  renderItem={({ item }) => {
                    return (
                      <AreaAppointmentButton
                        onPress={() => handleSelectedAppointment(item)}
                      >
                        <AreaPhoto>
                          <PhotoClientAppointment
                            source={{
                              uri:
                                item.clients &&
                                item.clients[0].client.image_profile &&
                                item.clients[0].client.image_profile[0].image
                                  .link,
                            }}
                          />
                        </AreaPhoto>
                        <AreaInfoLocalDate>
                          <AreaInfoLocal
                            color="transparent"
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
                            <AreaAmount>
                              <ValueAmount size={12}>
                                {getValueAmount(
                                  item.transactions[0].current_amount,
                                )}
                              </ValueAmount>
                            </AreaAmount>
                          </AreaInfoLocal>
                          <AreaInfoDate color="transparent">
                            <IconInfoDateLocal>
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
                                  'dd/MMM - HH:mm',
                                  { locale: brazilLocale },
                                )}
                              </TextInfoLocal>
                            </AreaTextInfoDateLocal>
                            <AreaTextInfoDateLocal>
                              <TextInfoLocal size={14} numberOfLines={1}>
                                {format(
                                  getPlatformDate(new Date(item.final_date)),
                                  'dd/MMM - HH:mm',
                                  { locale: brazilLocale },
                                )}
                              </TextInfoLocal>
                            </AreaTextInfoDateLocal>
                          </AreaInfoDate>
                        </AreaInfoLocalDate>
                      </AreaAppointmentButton>
                    );
                  }}
                />
              </AreaAppointmentContent>
            </AreaAppointments>
            <AreaAppointments>
              <AreaAppointmentTitle
                style={{ backgroundColor: theme.colors.success }}
              >
                <AreaTitle>
                  <Title>Agendamentos Confirmados</Title>
                </AreaTitle>
                <AreaIcon>
                  <Icon
                    name="calendar"
                    size={RFValue(25)}
                    color={theme.colors.white_medium}
                  />
                </AreaIcon>
              </AreaAppointmentTitle>
              <AreaAppointmentContent
                style={{ borderColor: theme.colors.success }}
              >
                <List
                  keyExtractor={(item, index) => index.toString()}
                  data={userProvider.appointments?.confirmed}
                  ListEmptyComponent={() => (
                    <AreaTitle>
                      <Title>Sem agendamentos no momento</Title>
                    </AreaTitle>
                  )}
                  renderItem={({ item }) => {
                    return (
                      <AreaAppointmentButton
                        color={theme.colors.success}
                        onPress={() => handleSelectedAppointment(item)}
                      >
                        <AreaPhoto>
                          <PhotoClientAppointment
                            source={{
                              uri:
                                item.clients &&
                                item.clients[0].client.image_profile &&
                                item.clients[0].client.image_profile[0].image
                                  .link,
                            }}
                          />
                        </AreaPhoto>
                        <AreaInfoLocalDate>
                          <AreaInfoLocal
                            color="transparent"
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
                            <AreaAmount>
                              <ValueAmount size={12}>
                                {getValueAmount(
                                  item.transactions[0].current_amount,
                                )}
                              </ValueAmount>
                            </AreaAmount>
                          </AreaInfoLocal>
                          <AreaInfoDate color="transparent">
                            <IconInfoDateLocal>
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
                                  'dd/MMM - HH:mm',
                                  { locale: brazilLocale },
                                )}
                              </TextInfoLocal>
                            </AreaTextInfoDateLocal>
                            <AreaTextInfoDateLocal>
                              <TextInfoLocal size={14} numberOfLines={1}>
                                {format(
                                  getPlatformDate(new Date(item.final_date)),
                                  'dd/MMM - HH:mm',
                                  { locale: brazilLocale },
                                )}
                              </TextInfoLocal>
                            </AreaTextInfoDateLocal>
                          </AreaInfoDate>
                        </AreaInfoLocalDate>
                      </AreaAppointmentButton>
                    );
                  }}
                />
              </AreaAppointmentContent>
            </AreaAppointments>
          </>
        )}
      </Form>
    </Container>
  );
}
