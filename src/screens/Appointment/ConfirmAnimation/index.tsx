import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import inviteAppointment from '../../../assets/animations/invite-appointment.json';
import { Container, Header, AreaTitle, Title, Form, Footer } from './styles';

import { ScreenNavigationProp } from '../../../routes';
import { Button } from '../../../components/Button';
import { useError } from '../../../hooks/error';

export function ClientAppointmentAnimationConfirm() {
  const { setAppError } = useError();
  const navigation = useNavigation<ScreenNavigationProp>();

  function handleGoBack() {
    navigation.navigate('AppClientTabRoutes', {
      screen: 'AppointmentClientTab',
    });
  }

  useEffect(() => {
    return () => {
      setAppError({});
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <AreaTitle>
          <Title>Agendamento enviado</Title>
        </AreaTitle>
      </Header>
      <Form>
        <LottieView
          source={inviteAppointment}
          loop={false}
          autoPlay
          speed={0.7}
          style={{ height: 350 }}
          resizeMode="contain"
        />
      </Form>
      <Footer>
        <Button title="Retornar" onPress={handleGoBack} />
      </Footer>
    </Container>
  );
}
