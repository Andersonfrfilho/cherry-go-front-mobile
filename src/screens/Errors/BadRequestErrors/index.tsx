import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import warningNetwork from '../../../assets/animations/error-warning-alert.json';
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
import * as RootNavigation from '../../../routes/RootNavigation';

export function BadRequestErrorScreen() {
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
          <Title>Erro de operação</Title>
        </AreaTitle>
        <AreaWarning>
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaWarning>
      </Header>
      <Form>
        <LottieView
          source={warningNetwork}
          autoPlay
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
