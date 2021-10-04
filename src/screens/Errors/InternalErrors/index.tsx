import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import errorNetwork from '../../../assets/animations/trex-sem-conexao.json';
import {
  Container,
  Header,
  AreaTitle,
  AreaWarning,
  Title,
  Form,
  Footer,
} from './styles';

import { WarningText } from '../../../components/WarningText';
import { ScreenNavigationProp } from '../../../routes';
import { Button } from '../../../components/Button';
import { useError } from '../../../hooks/error';
import { getRouteGoBack } from '../../../utils/getRouteGoBack';

export function InternalServerErrorScreen() {
  const { appError, setAppError } = useError();
  const navigation = useNavigation<ScreenNavigationProp>();

  function handleGoBack() {
    const { routeNames } = navigation.getState();

    const routeName = getRouteGoBack(routeNames);

    navigation.replace(routeName);
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
          <Title>Internal Server Error</Title>
        </AreaTitle>
        <AreaWarning>
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaWarning>
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
