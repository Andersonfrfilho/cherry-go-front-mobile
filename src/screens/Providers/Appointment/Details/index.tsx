import React, { createRef, useEffect } from 'react';
import * as Yup from 'yup';
import brazilLocale from 'date-fns/locale/pt-BR';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import {
  Container,
  Body,
  AreaAppointments,
  AreaAppointmentDateTitle,
  AreaTitle,
  Title,
  AreaIcon,
  Icon,
  AreaAppointmentClientUser,
  AreaAppointmentClientTitleIcon,
  AreaAppointmentClientsList,
  AreaAppointmentClient,
  AreaPhoto,
  PhotoClientAppointment,
  AreaAppointmentAddressInformation,
  AreaAppointmentAddress,
  AreaAppointmentAddressTitleIcon,
  AreaStreetNumber,
  AreaTextStreet,
  TextStreet,
  AreaTextNumber,
  TextNumber,
  AreaDistrictComplement,
  AreaTextDistrict,
  TextDistrict,
  AreaTextComplement,
  TextComplement,
  AreaTextCityStateReference,
  AreaTextCityState,
  TextCityState,
  AreaTextReference,
  TextReference,
  AreaAppointmentTransport,
  AreaAppointmentTransportTitleIcon,
  AreaAppointmentTransportInformation,
  AreaTransportOriginAddress,
  AreaTitleTransportItem,
  AreaTransportDestinationAddress,
  AreaTitleTransportItemInformation,
  AreaAppointmentServicesList,
  AreaAppointmentServices,
} from './styles';

import { useCommon } from '../../../../hooks/common';

import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../../hooks/providerUser';

import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { getOldest } from '../../../../utils/getOldest';
import { getValueAmount } from '../../../../utils/formatValueAmount';
import { getHour } from '../../../../utils/getHour';

export interface Focusable {
  focus(): void;
}

interface Params {
  appointment: Appointment;
}

export function AppointmentsDetailsProvider() {
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { userProvider } = useProviderUser();
  const route = useRoute();
  const { appointment } = route.params as { appointment: Appointment };
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;
  function handleSelectedAppointment(appointment: Appointment) {
    console.log(appointment);
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
          imageProfile && imageProfile[0].image && imageProfile[0].image.link
        }
      />
      <Body>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaAppointments>
            <AreaAppointmentDateTitle>
              <AreaTitle>
                <Title>
                  {format(
                    new Date(appointment.initial_date),
                    " dd MMM, 'de' yyyy - HH:mm",
                    { locale: brazilLocale },
                  )}
                </Title>
                {appError && appError.message && (
                  <WarningText title={appError.message} />
                )}
              </AreaTitle>
              <AreaIcon>
                <Icon
                  name="calendar"
                  size={RFValue(25)}
                  color={theme.colors.white_medium}
                />
              </AreaIcon>
            </AreaAppointmentDateTitle>

            <AreaAppointmentClientUser>
              <AreaAppointmentClientTitleIcon>
                <AreaTitle>
                  <Title>
                    {appointment.clients && appointment.clients.length > 1
                      ? 'Clientes'
                      : 'Cliente'}
                  </Title>
                </AreaTitle>
                <AreaIcon>
                  <Icon
                    name="user"
                    size={RFValue(25)}
                    color={theme.colors.white_medium}
                  />
                </AreaIcon>
              </AreaAppointmentClientTitleIcon>
              <AreaAppointmentClientsList>
                {appointment.clients &&
                  appointment.clients.map((client, index) => (
                    <AreaAppointmentClient key={index.toString()}>
                      <AreaPhoto>
                        <PhotoClientAppointment
                          source={{
                            uri:
                              client &&
                              client.image_profile &&
                              client.image_profile[0].image &&
                              client.image_profile[0].image.link,
                          }}
                        />
                      </AreaPhoto>
                      <AreaTitle>
                        <Title
                          numberOfLines={1}
                          style={{ textTransform: 'capitalize' }}
                        >
                          {client.name} {client.last_name},{' '}
                          {getOldest(new Date(client.birth_date))}
                        </Title>
                      </AreaTitle>
                    </AreaAppointmentClient>
                  ))}
              </AreaAppointmentClientsList>
            </AreaAppointmentClientUser>
            <AreaAppointmentAddress>
              <AreaAppointmentAddressTitleIcon>
                <AreaTitle>
                  <Title>Endereço</Title>
                </AreaTitle>
                <AreaIcon>
                  <Icon
                    name="map-pin"
                    size={RFValue(25)}
                    color={theme.colors.white_medium}
                  />
                </AreaIcon>
              </AreaAppointmentAddressTitleIcon>
              <AreaAppointmentAddressInformation>
                <AreaStreetNumber>
                  <AreaTextStreet>
                    <TextStreet numberOfLines={1}>
                      {appointment.addresses[0].address.street},{' '}
                      {appointment.addresses[0].address.number}
                    </TextStreet>
                  </AreaTextStreet>
                </AreaStreetNumber>
                <AreaDistrictComplement>
                  <AreaTextDistrict>
                    <TextDistrict numberOfLines={1}>
                      {appointment.addresses[0].address.district}
                    </TextDistrict>
                  </AreaTextDistrict>
                  <AreaTextComplement>
                    <TextComplement>
                      {appointment.addresses[0].address.complement}
                    </TextComplement>
                  </AreaTextComplement>
                </AreaDistrictComplement>
                <AreaTextCityStateReference>
                  <AreaTextCityState>
                    <TextCityState>
                      {appointment.addresses[0].address.city} /{' '}
                      {appointment.addresses[0].address.state}
                    </TextCityState>
                  </AreaTextCityState>
                </AreaTextCityStateReference>
              </AreaAppointmentAddressInformation>
            </AreaAppointmentAddress>
            <AreaAppointmentTransport>
              <AreaAppointmentTransportTitleIcon>
                <AreaTitle>
                  <Title>Transporte</Title>
                </AreaTitle>
                <AreaIcon>
                  <Icon
                    name="navigation"
                    size={RFValue(25)}
                    color={theme.colors.white_medium}
                  />
                </AreaIcon>
              </AreaAppointmentTransportTitleIcon>
              <AreaAppointmentTransportInformation>
                <AreaTransportOriginAddress>
                  <AreaAppointmentAddressInformation>
                    <AreaTitleTransportItem>
                      <Title>Endereço de origem</Title>
                    </AreaTitleTransportItem>
                    <AreaStreetNumber>
                      <AreaTextStreet>
                        <TextStreet numberOfLines={1}>
                          {appointment.transports[0].origin_address.street},{' '}
                          {appointment.transports[0].origin_address.number}
                        </TextStreet>
                      </AreaTextStreet>
                    </AreaStreetNumber>
                    <AreaDistrictComplement>
                      <AreaTextDistrict>
                        <TextDistrict numberOfLines={1}>
                          {appointment.transports[0].origin_address.district}
                        </TextDistrict>
                      </AreaTextDistrict>
                      <AreaTextComplement>
                        <TextComplement>
                          {appointment.transports[0].origin_address.complement}
                        </TextComplement>
                      </AreaTextComplement>
                    </AreaDistrictComplement>
                    <AreaTextCityStateReference>
                      <AreaTextCityState>
                        <TextCityState>
                          {appointment.transports[0].origin_address.city} /{' '}
                          {appointment.transports[0].origin_address.state}
                        </TextCityState>
                      </AreaTextCityState>
                    </AreaTextCityStateReference>
                  </AreaAppointmentAddressInformation>
                </AreaTransportOriginAddress>
                <AreaTransportDestinationAddress>
                  <AreaAppointmentAddressInformation>
                    <AreaTitleTransportItem>
                      <Title>Tipo de transporte</Title>
                    </AreaTitleTransportItem>
                    <AreaTitleTransportItem>
                      <Title style={{ textTransform: 'capitalize' }}>
                        {appointment.transports[0].transport_type.name}
                      </Title>
                    </AreaTitleTransportItem>
                    <AreaStreetNumber>
                      <AreaTextStreet>
                        <TextStreet
                          numberOfLines={1}
                          style={{ fontSize: RFValue(16) }}
                        >
                          Hora da solicitação:{' '}
                          {getHour(appointment.transports[0].initial_hour)}
                        </TextStreet>
                        <TextStreet
                          numberOfLines={1}
                          style={{ fontSize: RFValue(16) }}
                        >
                          Hora da partida prevista:{' '}
                          {getHour(appointment.transports[0].departure_time)}
                        </TextStreet>
                      </AreaTextStreet>
                    </AreaStreetNumber>
                    <AreaDistrictComplement>
                      <AreaTextDistrict>
                        <TextStreet
                          numberOfLines={1}
                          style={{ fontSize: RFValue(16) }}
                        >
                          Hora de retorno:{' '}
                          {getHour(appointment.transports[0].return_time)}
                        </TextStreet>
                        <TextStreet
                          numberOfLines={1}
                          style={{ fontSize: RFValue(16) }}
                        >
                          Hora de chegada retorno:{' '}
                          {getHour(
                            appointment.transports[0].arrival_time_return,
                          )}
                        </TextStreet>
                      </AreaTextDistrict>
                    </AreaDistrictComplement>
                    <AreaTitleTransportItemInformation>
                      <Title>Valor</Title>
                      <Title>
                        {getValueAmount(appointment.transports[0].amount)}
                      </Title>
                    </AreaTitleTransportItemInformation>
                  </AreaAppointmentAddressInformation>
                </AreaTransportDestinationAddress>
                <AreaTransportDestinationAddress>
                  <AreaAppointmentAddressInformation>
                    <AreaTitleTransportItem>
                      <Title>Endereço de destino</Title>
                    </AreaTitleTransportItem>
                    <AreaStreetNumber>
                      <AreaTextStreet>
                        <TextStreet numberOfLines={1}>
                          {appointment.transports[0].destination_address.street}
                          ,{' '}
                          {appointment.transports[0].destination_address.number}
                        </TextStreet>
                      </AreaTextStreet>
                    </AreaStreetNumber>
                    <AreaDistrictComplement>
                      <AreaTextDistrict>
                        <TextDistrict numberOfLines={1}>
                          {
                            appointment.transports[0].destination_address
                              .district
                          }
                        </TextDistrict>
                      </AreaTextDistrict>
                      <AreaTextComplement>
                        <TextComplement>
                          {
                            appointment.transports[0].destination_address
                              .complement
                          }
                        </TextComplement>
                      </AreaTextComplement>
                    </AreaDistrictComplement>
                    <AreaTextCityStateReference>
                      <AreaTextCityState>
                        <TextCityState>
                          {appointment.transports[0].destination_address.city} /{' '}
                          {appointment.transports[0].destination_address.state}
                        </TextCityState>
                      </AreaTextCityState>
                    </AreaTextCityStateReference>
                  </AreaAppointmentAddressInformation>
                </AreaTransportDestinationAddress>
              </AreaAppointmentTransportInformation>
            </AreaAppointmentTransport>
            <AreaAppointmentServices>
              <AreaAppointmentAddressTitleIcon>
                <AreaTitle>
                  <Title>Serviços</Title>
                </AreaTitle>
                <AreaIcon>
                  <Icon
                    name="briefcase"
                    size={RFValue(25)}
                    color={theme.colors.white_medium}
                  />
                </AreaIcon>
              </AreaAppointmentAddressTitleIcon>
              <AreaAppointmentServicesList>
                {appointment.transactions[0].itens.map(service => (
                  <AreaTransactionService>
                    <AreaAppointmentTransactionServiceInformation>
                      <AreaTitleTransactionItem>
                        <Title>Tipo de transporte</Title>
                      </AreaTitleTransactionItem>
                      <AreaTitleTransactionItem>
                        <Title style={{ textTransform: 'capitalize' }}>
                          {appointment.transports[0].transport_type.name}
                        </Title>
                      </AreaTitleTransactionItem>
                      <AreaStreetNumber>
                        <AreaTextStreet>
                          <TextStreet
                            numberOfLines={1}
                            style={{ fontSize: RFValue(16) }}
                          >
                            Hora da solicitação:{' '}
                            {getHour(appointment.transports[0].initial_hour)}
                          </TextStreet>
                          <TextStreet
                            numberOfLines={1}
                            style={{ fontSize: RFValue(16) }}
                          >
                            Hora da partida prevista:{' '}
                            {getHour(appointment.transports[0].departure_time)}
                          </TextStreet>
                        </AreaTextStreet>
                      </AreaStreetNumber>
                      <AreaDistrictComplement>
                        <AreaTextDistrict>
                          <TextStreet
                            numberOfLines={1}
                            style={{ fontSize: RFValue(16) }}
                          >
                            Hora de retorno:{' '}
                            {getHour(appointment.transports[0].return_time)}
                          </TextStreet>
                          <TextStreet
                            numberOfLines={1}
                            style={{ fontSize: RFValue(16) }}
                          >
                            Hora de chegada retorno:{' '}
                            {getHour(
                              appointment.transports[0].arrival_time_return,
                            )}
                          </TextStreet>
                        </AreaTextDistrict>
                      </AreaDistrictComplement>
                      <AreaTitleTransactionItemValueInformation>
                        <Title>Valor</Title>
                        <Title>
                          {getValueAmount(appointment.transports[0].amount)}
                        </Title>
                      </AreaTitleTransactionItemValueInformation>
                    </AreaAppointmentTransactionServiceInformation>
                  </AreaTransactionService>
                ))}
              </AreaAppointmentServicesList>
            </AreaAppointmentServices>
          </AreaAppointments>
        )}
      </Body>
    </Container>
  );
}
