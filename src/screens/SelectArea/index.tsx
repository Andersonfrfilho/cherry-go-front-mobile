import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ButtonIcon } from '../../components/ButtonIcon';
import {
  Container,
  Header,
  AreaButtonLogout,
  AreaLogoTitle,
  AreaTitle,
  Title,
  Body,
  ButtonIcons,
  AreaButtonIcon,
  Icon,
} from './styles';
import user from '../../../data';
import LogoTitleSvg from '../../assets/logo_title.svg';
import { useCommon } from '../../hooks/common';
import { WarningText } from '../../components/WarningText';
import { useClientUser } from '../../hooks/clientUser';
import { useError } from '../../hooks/error';
import { ScreenNavigationClientProp, ScreenNavigationProp } from '../../routes';
import { useAuth } from '../../hooks/auth';

export function SelectArea() {
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { userClient } = useClientUser();
  const { signOut } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation<
    ScreenNavigationClientProp | ScreenNavigationProp
  >();

  useEffect(() => {
    if (!(userClient && userClient.types && userClient.types.length > 1)) {
      navigation.navigate('HomeClientStack');
    }
  }, []);

  async function handleSignOut() {
    await signOut();
  }

  function handleProviderHome() {
    navigation.navigate('HomeProvider');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <AreaButtonLogout>
          <AreaButtonIcon onPress={handleSignOut}>
            <Icon
              name="power"
              size={RFValue(30)}
              color={theme.colors.background_primary}
            />
          </AreaButtonIcon>
        </AreaButtonLogout>
        <AreaLogoTitle>
          <LogoTitleSvg width="100%" height="100%" />
        </AreaLogoTitle>
        <AreaTitle>
          <Title>Selecione um modo</Title>
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaTitle>
      </Header>
      <Body>
        <ButtonIcons>
          <ButtonIcon
            iconName="user"
            title="Cliente"
            disabled={isLoading}
            loading={isLoading}
            buttonColor={theme.colors.yellow_orange}
            textColor={theme.colors.shape}
            iconColor={theme.colors.shape}
            onPress={() => {}}
          />
          <ButtonIcon
            iconName="briefcase"
            title="Prestador"
            disabled={isLoading}
            loading={isLoading}
            buttonColor={theme.colors.purple_luxury}
            textColor={theme.colors.shape}
            iconColor={theme.colors.shape}
            onPress={handleProviderHome}
          />
        </ButtonIcons>
      </Body>
    </Container>
  );
}
