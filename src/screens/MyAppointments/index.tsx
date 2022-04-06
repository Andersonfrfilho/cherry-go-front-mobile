import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { format, getDay, getHours, getMinutes } from 'date-fns';
import brazilLocale from 'date-fns/locale/pt-BR';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  AreaAppointment,
  List,
  AreaImageProvider,
  AreaNameDateHourProvider,
  AreaNameProvider,
  NameProvider,
  AreaDateHourProvider,
  DateHourProvider,
  AreaAmountIcon,
  AreaIcon,
  AreaAmount,
  Amount,
  ImageProvider,
  TextName,
  AreaIconItem,
} from './styles';

import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import {
  Addresses,
  Appointment,
  Local,
  UserProvider,
} from '../../hooks/providerUser';
import {
  HourSelectInterface,
  HoursSelectedToAppointment,
  useClientUser,
} from '../../hooks/clientUser';
import { IconFeather } from '../../components/Icons/style';
import { AppointmentList } from './myAppointments.dto';
import { ServiceFormattedModalService } from '../../components/ModalServices';
import { ProviderTransportTypesSelected } from '../Appointment/Payment';
import { ProviderPaymentsTypesSelected } from '../Appointment/Create/PaymentTypeSelect';
import { STATUS_PROVIDERS_APPOINTMENT } from '../../enums/statusProvidersAppointment.enum';
import { DAYS_WEEK_DATE_NUMBER } from '../Appointment/Create/HourSelect';
import { DAYS_WEEK_ENUM } from '../../enums/daysProviders.enum';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Scheduling: undefined;
  SchedulingComplete: undefined;
  SchedulingDetails: undefined;
};
interface Params {
  providerSelect: UserProvider;
  servicesSelect: ServiceFormattedModalService[];
  necessaryMilliseconds: number;
  hours?: HoursSelectedToAppointment;
  local?: Addresses | Local;
  transportType?: ProviderTransportTypesSelected;
  paymentType?: ProviderPaymentsTypesSelected;
  amountTotal?: number;
  notConfirmed?: boolean;
  status: STATUS_PROVIDERS_APPOINTMENT;
}
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function MyAppointments() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentList[]>([]);
  const [page, setPage] = useState<number>(0);
  const screenIsFocus = useIsFocused();

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { userClient, getClientAppointments } = useClientUser();

  useEffect(() => {
    async function fetchAppointment() {
      const [appointmentsResult, pageNumber] = await getClientAppointments();
      setPage(pageNumber);
      setAppointments(appointmentsResult);
    }
    fetchAppointment();
  }, []);

  function handleBack() {
    navigation.goBack();
  }
  const iconChoice = {
    money: 'money',
    debit: 'credit-card',
    credit: 'credit-card',
    pix: 'bank',
  };
  function handleSelectAppointmentDetails(appointment: AppointmentList) {
    const date_start: HourSelectInterface = {
      date: appointment.date_start,
      available: true,
      available_period: true,
      day: DAYS_WEEK_ENUM[
        DAYS_WEEK_DATE_NUMBER[getDay(appointment.initial_date)]
      ],
      hour: `${getHours(new Date(appointment.initial_date))
        .toString()
        .padStart(2, '0')}:${getMinutes(new Date(appointment.initial_date))
        .toString()
        .padStart(2, '0')}`,
      selected: true,
      time_blocked: true,
    };
    const date_end: HourSelectInterface = {
      date: appointment.date_start,
      available: true,
      available_period: true,
      day: DAYS_WEEK_ENUM[
        DAYS_WEEK_DATE_NUMBER[getDay(appointment.final_date)]
      ],
      hour: `${getHours(new Date(appointment.final_date))
        .toString()
        .padStart(2, '0')}:${getMinutes(new Date(appointment.final_date))
        .toString()
        .padStart(2, '0')}`,
      selected: true,
      time_blocked: true,
    };

    const hours: HoursSelectedToAppointment = {
      start: date_start,
      end: date_end,
    };
    console.log(hours);
    const data: Params = {
      providerSelect: appointment.providers[0].provider,
      servicesSelect: appointment.services.map(
        service => service.service,
      ) as unknown as ServiceFormattedModalService[],
      necessaryMilliseconds: appointment.duration,
      hours,
      local: appointment.addresses[0],
      transportType: appointment
        .transports[0] as unknown as ProviderTransportTypesSelected,
      status: appointment.providers[0].status,
      amountTotal: Number(appointment.transactions[0].current_amount),
      paymentType: appointment.transactions[0]
        .payment_type as unknown as ProviderPaymentsTypesSelected,
      pageAppointments: true,
    };

    navigation.navigate('ClientAppointmentStackRoutes', {
      screen: 'ClientAppointmentDetailsStack',
      params: { ...data },
    });
  }
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Title>Agendamentos</Title>
        <SubTitle>Últimos Agendamentos</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          {appointments.length > 0 && (
            <List
              data={appointments}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <AreaAppointment
                  onPress={() => handleSelectAppointmentDetails(item)}
                >
                  <AreaImageProvider>
                    {!!item.providers[0] &&
                    !!item.providers.length > 0 &&
                    !!item.providers[0].image_profile > 0 &&
                    !!item.providers[0].image_profile?.length > 0 &&
                    !!item.providers[0].image_profile[0].image &&
                    !!item.providers[0].image_profile[0].image.url ? (
                      <ImageProvider
                        source={{
                          uri: item.providers[0].image_profile[0].image.url,
                        }}
                        resizeMode="stretch"
                      />
                    ) : (
                      !!item.providers[0] &&
                      !!item.providers.length > 0 &&
                      !!item.providers[0].provider && (
                        <TextName>
                          {`${
                            item.providers[0].provider.name.substring(0, 1) +
                            item.providers[0].provider.last_name.substring(0, 1)
                          }
                          `}
                        </TextName>
                      )
                    )}
                  </AreaImageProvider>
                  <AreaNameDateHourProvider>
                    <AreaNameProvider>
                      {!!item.providers &&
                        !!item.providers.length > 0 &&
                        !!item.providers[0].provider && (
                          <NameProvider numberOfLines={2}>{`${
                            !!item.providers[0].provider.details &&
                            !!item.providers[0].provider.details.fantasy_name
                              ? item.providers[0].provider.details.fantasy_name
                              : `${item.providers[0].provider.name} ${item.providers[0].provider.last_name}`
                          }
                      `}</NameProvider>
                        )}
                    </AreaNameProvider>
                    <AreaDateHourProvider>
                      <DateHourProvider numberOfLines={2}>
                        {format(new Date(item.initial_date), 'HH:mm - dd/MM', {
                          locale: brazilLocale,
                        })}
                      </DateHourProvider>
                    </AreaDateHourProvider>
                  </AreaNameDateHourProvider>
                  <AreaIconItem>
                    <AreaIcon>
                      <IconFeather
                        name="home"
                        size={RFValue(16)}
                        color={theme.colors.background_primary}
                      />
                    </AreaIcon>
                  </AreaIconItem>
                  <AreaAmountIcon>
                    <AreaIcon>
                      {item.transactions.length > 0 &&
                        item.transactions[0].events.length > 0 &&
                        item.transactions[0].events[0].payment_type &&
                        item.transactions[0].events[0].payment_type.name && (
                          <IconFeather
                            name={
                              item.transactions[0].events[0].payment_type.name
                                ? iconChoice[
                                    item.transactions[0].events[0].payment_type
                                      .name
                                  ]
                                : iconChoice.money
                            }
                            size={RFValue(16)}
                            color={theme.colors.background_primary}
                          />
                        )}
                    </AreaIcon>
                    <AreaAmount>
                      <Amount>R$ 120,00</Amount>
                    </AreaAmount>
                  </AreaAmountIcon>
                </AreaAppointment>
              )}
            />
          )}
        </Content>
      )}
    </Container>
  );
}
