import React from 'react';

import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { ScreenNavigationProp } from '../../routes/stack.routes';

interface Props {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute();
  const { message, nextScreenRoute, title } = route.params as Props;
  const { width } = useWindowDimensions();

  function handleConfirmRental() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
