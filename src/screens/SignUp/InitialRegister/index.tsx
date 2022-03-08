import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, AreaTitle, SubTitle } from './styles';

import { Load } from '../../../components/Load';
import { ScreenNavigationProp } from '../../../routes';
import { userRepository } from '../../../databases/repository/user.repository';

export function InitialRegister() {
  const navigation = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    let unmounted = false;
    async function getUser() {
      if (!unmounted) {
        const user = await userRepository.getUser();
        if (user) {
          if (!user.addresses) {
            navigation.replace('SignUpSecondStep');
            return;
          }
          if (!user.phones) {
            navigation.replace('SignUpThirdStep');
            return;
          }

          if (!user.documents || (!!user.documents && !user.documents.front)) {
            navigation.navigate('SignUpFourthStep');
            return;
          }

          if (!user.documents || (!!user.documents && !user.documents.back)) {
            navigation.navigate('SignUpFifthStep');
            return;
          }
        }

        navigation.replace('AuthRoutes', {
          screen: 'SignIn',
        });
      }
    }
    getUser();
    return () => {
      unmounted = true;
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
          <SubTitle>carregando...</SubTitle>
        </AreaTitle>
      </Header>
      <Load />
    </Container>
  );
}
