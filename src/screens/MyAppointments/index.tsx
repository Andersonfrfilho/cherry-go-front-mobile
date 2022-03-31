import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns/esm';
import { parseISO } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
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
} from './styles';

import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Appointment } from '../../hooks/providerUser';
import { useClientUser } from '../../hooks/clientUser';
import { IconFeather } from '../../components/Icons/style';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Scheduling: undefined;
  SchedulingComplete: undefined;
  SchedulingDetails: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function MyAppointments() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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
  console.log(appointments);
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
          <List
            data={appointments}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <AreaAppointment>
                <AreaImageProvider>
                  <ImageProvider
                    source={{
                      uri: 'https://static.remove.bg/remove-bg-web/b27c50a4d669fdc13528397ba4bc5bd61725e4cc/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
                    }}
                    resizeMode="stretch"
                  />
                </AreaImageProvider>
                <AreaNameDateHourProvider>
                  <AreaNameProvider>
                    <NameProvider numberOfLines={2}>Luana Cheia</NameProvider>
                  </AreaNameProvider>
                  <AreaDateHourProvider>
                    <DateHourProvider numberOfLines={2}>
                      12:00 - 12/03
                    </DateHourProvider>
                  </AreaDateHourProvider>
                </AreaNameDateHourProvider>
                <AreaAmountIcon>
                  <AreaIcon>
                    <IconFeather
                      name="power"
                      size={RFValue(16)}
                      color={theme.colors.background_primary}
                    />
                  </AreaIcon>
                  <AreaAmount>
                    <Amount>R$ 120,00</Amount>
                  </AreaAmount>
                </AreaAmountIcon>
              </AreaAppointment>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
