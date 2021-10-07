import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import errorUnauthorized from '../../../assets/animations/session-expired.json';
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
import { useAuth } from '../../../hooks/auth';
import { useCommon } from '../../../hooks/common';

export function UnauthorizedErrorScreen() {
  const { setIsLoading, setIsLoadingRouter } = useCommon();
  const { appError, setAppError } = useError();
  const { signOut } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleGoToPageLogin() {
    navigation.replace('SignIn');
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsLoadingRouter(true);
      await new Promise(resolve => {
        setTimeout(resolve, 3000);
      });
      await signOut();

      setIsLoadingRouter(false);
      setIsLoading(false);
    })();
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
          <Title>Não Autorizado</Title>
        </AreaTitle>
        <AreaWarning>
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaWarning>
      </Header>
      <Form>
        <LottieView
          source={errorUnauthorized}
          autoPlay
          style={{ height: 200 }}
          resizeMode="contain"
        />
      </Form>
      <Footer>
        <Button title="Ir para login" onPress={handleGoToPageLogin} />
      </Footer>
    </Container>
  );
}
