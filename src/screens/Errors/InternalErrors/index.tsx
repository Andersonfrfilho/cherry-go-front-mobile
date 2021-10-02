import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import errorNetwork from '../../../assets/animations/trex-sem-conexao.json';
import { Container, Header, AreaTitle, Title, Form, Footer } from './styles';
import { useCommon } from '../../../hooks/common';

import { WarningText } from '../../../components/WarningText';
import { ScreenNavigationProp } from '../../../routes';
import { Button } from '../../../components/Button';
import { useError } from '../../../hooks/error';

export function InternalServerErrorScreen() {
  const { appError } = useError();
  const navigation = useNavigation<ScreenNavigationProp>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <AreaTitle>
          <Title>Internal Server Error</Title>
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaTitle>
      </Header>
      <Form>
        <LottieView
          source={errorNetwork}
          autoPlay
          style={{ height: 200 }}
          resizeMode="contain"
          loop
        />
      </Form>
      <Footer>
        <Button title="Tentar novamente" onPress={handleGoBack} />
      </Footer>
    </Container>
  );
}
