import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../components/Button';
import LogoTitleSvg from '../../assets/logo_title.svg';
import {
  Container,
  Header,
  AreaLogoTitle,
  AreaTitle,
  Title,
  Form,
  Footer,
  ButtonIcons,
  AreaForgotten,
  AreaIconForgotten,
  AreaTextForgotten,
  TextForgotten,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { FormInput } from '../../components/FormInput';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useCommon } from '../../hooks/common';
import { TextInputTypeEnum } from '../../enums/TextInputType.enum';

import { WarningText } from '../../components/WarningText';
import { useError } from '../../hooks/error';
import { ScreenNavigationProp } from '../../routes';
import { IconFeather } from '../../components/Icons/style';

interface FormData {
  email: string;
  password: string;
}
const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('A senha é obrigatória'),
});
export interface Focusable {
  focus(): void;
}
export function SignIn() {
  const [remember, setRemember] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError } = useError();
  const { signIn } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  const refMail = createRef<Focusable>();
  const refPassword = createRef<Focusable>();

  async function handleSignIn({ password, email }: FormData) {
    setIsLoading(true);
    try {
      if (remember) {
        await AsyncStorage.setItem('@email', email);
      }
      await signIn({ email, password });
    } finally {
      setIsLoading(false);
    }
  }

  function handleForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  async function handleRememberEmail() {
    setRemember(!remember);
    if (!remember) {
      await AsyncStorage.removeItem('@email');
    }
  }

  useEffect(() => {
    let unmounted = false;
    async function getEmailRemember() {
      if (!unmounted) {
        const email = await AsyncStorage.getItem('@email');
        if (!!email && email.length > 0) {
          setValue('email', email);
          setRemember(true);
        }
      }
    }
    getEmailRemember();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="position" enabled style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <Header>
            <AreaLogoTitle>
              <LogoTitleSvg width="100%" height="100%" />
            </AreaLogoTitle>

            <AreaTitle>
              <Title>Entrar</Title>
              {appError && appError.message && (
                <WarningText title={appError.message} />
              )}
            </AreaTitle>
          </Header>
          <Form>
            <FormInput
              name="email"
              control={control}
              placeholder="E-mail"
              error={errors.email && errors.email.message}
              iconName="mail"
              iconSize={24}
              autoCorrect={false}
              editable={!isLoading}
              inputRef={refMail}
              onSubmitEditing={() => refPassword.current?.focus()}
            />
            <FormInput
              name="password"
              control={control}
              placeholder="Senha"
              error={errors.password && errors.password.message}
              iconName="airplay"
              iconSize={24}
              type={TextInputTypeEnum.password}
              editable={!isLoading}
              inputRef={refPassword}
            />
          </Form>
          <Footer>
            <Button
              title="Entrar"
              onPress={handleSubmit(handleSignIn)}
              enabled={!isLoading}
              loading={isLoading}
            />
            <AreaForgotten>
              <AreaIconForgotten onPress={handleRememberEmail}>
                <IconFeather
                  name={remember ? 'check-square' : 'square'}
                  size={RFValue(24)}
                  color={theme.colors.main_light}
                />
              </AreaIconForgotten>
              <AreaTextForgotten>
                <TextForgotten>Lembrar-me</TextForgotten>
              </AreaTextForgotten>
            </AreaForgotten>
            <ButtonIcons>
              <ButtonIcon
                iconName="user-plus"
                title="Registrar"
                disabled={isLoading}
                loading={isLoading}
                light
                buttonColor={theme.colors.success_chateau}
                textColor={theme.colors.main_light}
                iconColor={theme.colors.main_light}
                onPress={handleNewAccount}
              />
              <ButtonIcon
                iconName="edit-2"
                title="Esqueci a senha"
                buttonColor={theme.colors.warning_buttercup_light_shade}
                disabled={isLoading}
                loading={isLoading}
                onPress={handleForgotPassword}
                light
              />
            </ButtonIcons>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
