import React from 'react';

import brazilLocale from 'date-fns/locale/pt-BR';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import { Button } from '../../../../components/Button';
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
  AreaDistrictComplement,
  AreaTextDistrict,
  TextDistrict,
  AreaTextComplement,
  TextComplement,
  AreaTextCityStateReference,
  AreaTextCityState,
  TextCityState,
  AreaAppointmentTransport,
  AreaAppointmentTransportTitleIcon,
  AreaAppointmentTransportInformation,
  AreaTransportOriginAddress,
  AreaTitleTransportItem,
  AreaTransportDestinationAddress,
  AreaTitleTransportItemInformation,
  AreaAppointmentServicesList,
  AreaAppointmentServices,
  AreaTransactionService,
  AreaAppointmentTransactionServiceInformation,
  AreaInfoServiceDurationAmount,
  AreaTitleTransactionItem,
  AreaTransactionText,
  AreaTitleTransactionItemValueInformation,
  AreaAppointmentStatus,
  AreaTitleAppointmentStatus,
  AreaAppointmentStatusButtons,
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
import { getMinutes } from '../../../../utils/getMinutes';
import { getDuration } from '../../../../utils/getDuration';
import { useAppointment } from '../../../../hooks/appointment';
import { STATUS_PROVIDERS_APPOINTMENT } from '../../../../enums/statusProvidersAppointment.enum';

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
  const { confirmAppointmentProvider, rejectedAppointmentProvider } =
    useAppointment();
  const route = useRoute();
  const { appointment } = route.params as { appointment: Appointment };
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;
  async function handleSelectedRejectAppointment(appointment_id: string) {
    await rejectedAppointmentProvider(appointment_id);
  }
  async function handleSelectedConfirmedAppointment(appointment_id: string) {
    await confirmAppointmentProvider(appointment_id);
  }
  function handleCanBack() {
    navigation.replace('HomeProvider');
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
                              client.client.image_profile &&
                              client.client.image_profile[0].image &&
                              client.client.image_profile[0].image.link,
                          }}
                        />
                      </AreaPhoto>
                      <AreaTitle>
                        <Title
                          numberOfLines={1}
                          style={{ textTransform: 'capitalize' }}
                        >
                          {client.client.name} {client.client.last_name},{' '}
                          {getOldest(new Date(client.client.birth_date))}
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
                {appointment.transactions[0].itens.map((item, index) => (
                  <AreaTransactionService key={index.toString()}>
                    <AreaAppointmentTransactionServiceInformation>
                      <AreaTitleTransactionItem>
                        <Title>{item.elements.service.name}</Title>
                      </AreaTitleTransactionItem>
                      <AreaInfoServiceDurationAmount>
                        <AreaTransactionText>
                          <Title numberOfLines={1}>Duração:</Title>
                          <Title
                            numberOfLines={1}
                            style={{ fontSize: RFValue(16) }}
                          >
                            {getMinutes(item.elements.service.duration).minutes}{' '}
                            m
                          </Title>
                        </AreaTransactionText>
                        <AreaTransactionText>
                          <Title numberOfLines={1}>Incremento:</Title>
                          <Title numberOfLines={1}>
                            {getValueAmount(item.increment_amount)}
                          </Title>
                        </AreaTransactionText>
                        <AreaTransactionText>
                          <Title numberOfLines={1}>Desconto:</Title>
                          <Title numberOfLines={1}>
                            {getValueAmount(item.discount_amount)}
                          </Title>
                        </AreaTransactionText>
                      </AreaInfoServiceDurationAmount>

                      <AreaTitleTransactionItemValueInformation>
                        <Title>Total</Title>
                        <Title>{getValueAmount(item.amount)}</Title>
                      </AreaTitleTransactionItemValueInformation>
                    </AreaAppointmentTransactionServiceInformation>
                  </AreaTransactionService>
                ))}
                <AreaTransactionService>
                  <AreaAppointmentTransactionServiceInformation
                    color={theme.colors.success}
                  >
                    <AreaTitleTransactionItem>
                      <Title>Total dos serviços</Title>
                    </AreaTitleTransactionItem>
                    <AreaTitleTransactionItemValueInformation>
                      <Title>Duração</Title>
                      <Title>
                        {getDuration({
                          initialDate: appointment.initial_date,
                          finallyDate: appointment.final_date,
                        })}{' '}
                        m
                      </Title>
                    </AreaTitleTransactionItemValueInformation>
                    <AreaTitleTransactionItemValueInformation>
                      <Title>Original</Title>
                      <Title>
                        {getValueAmount(
                          appointment.transactions[0].original_amount,
                        )}
                      </Title>
                    </AreaTitleTransactionItemValueInformation>
                    <AreaTitleTransactionItemValueInformation>
                      <Title>Incrementos</Title>
                      <Title>
                        {getValueAmount(
                          appointment.transactions[0].increment_amount,
                        )}
                      </Title>
                    </AreaTitleTransactionItemValueInformation>
                    <AreaTitleTransactionItemValueInformation>
                      <Title>Descontos</Title>
                      <Title>
                        {getValueAmount(
                          appointment.transactions[0].discount_amount,
                        )}
                      </Title>
                    </AreaTitleTransactionItemValueInformation>
                    <AreaTitleTransactionItemValueInformation>
                      <Title>Total</Title>
                      <Title>
                        {getValueAmount(
                          appointment.transactions[0].current_amount,
                        )}
                      </Title>
                    </AreaTitleTransactionItemValueInformation>
                  </AreaAppointmentTransactionServiceInformation>
                </AreaTransactionService>
              </AreaAppointmentServicesList>
            </AreaAppointmentServices>
            <AreaAppointmentStatus>
              <AreaTitleAppointmentStatus>
                <Title>Opções de Agendamento</Title>
              </AreaTitleAppointmentStatus>
              <AreaAppointmentStatusButtons>
                {appointment.providers[0].status ===
                  STATUS_PROVIDERS_APPOINTMENT.OPEN && (
                  <Button
                    title="Confirmar"
                    onPress={() =>
                      handleSelectedConfirmedAppointment(appointment.id)
                    }
                    enabled={!isLoading}
                    loading={isLoading}
                    color={theme.colors.success_chateau}
                  />
                )}
                {(appointment.providers[0].status ===
                  STATUS_PROVIDERS_APPOINTMENT.ACCEPTED ||
                  appointment.providers[0].status ===
                    STATUS_PROVIDERS_APPOINTMENT.OPEN) && (
                  <Button
                    title="Cancelar"
                    onPress={() =>
                      handleSelectedRejectAppointment(appointment.id)
                    }
                    enabled={!isLoading}
                    loading={isLoading}
                    color={theme.colors.red_devil}
                  />
                )}

                <Button
                  title="Voltar"
                  onPress={handleCanBack}
                  enabled={!isLoading}
                  loading={isLoading}
                />
              </AreaAppointmentStatusButtons>
            </AreaAppointmentStatus>
          </AreaAppointments>
        )}
      </Body>
    </Container>
  );
}
