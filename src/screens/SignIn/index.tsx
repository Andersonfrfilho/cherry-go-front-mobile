import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  SubTitle,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { ScreenNavigationProp } from '../../routes/app.stack.routes';
import { FormInput } from '../../components/FormInput';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useCommon } from '../../hooks/common';
import { TextInputTypeEnum } from '../../enums/TextInputType.enum';
import {
  appErrorVerifyError,
  VerifyErrorDTO,
} from '../../errors/appErrorVerify';
import { WarningText } from '../../components/WarningText';

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
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const { isLoading, setIsLoading, appError, setAppError } = useCommon();
  const { signIn } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  const refMail = createRef<Focusable>();
  const refPassword = createRef<Focusable>();

  async function handleSignIn({ password, email }: FormData) {
    setIsLoading(true);
    try {
      await signIn({ email, password });
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error as VerifyErrorDTO));
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

  useEffect(() => {
    setIsLoading(false);
    setAppError({});
    refMail.current?.focus();
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
              onEndEditing={() => refPassword.current?.focus()}
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
            <ButtonIcons>
              <ButtonIcon
                iconName="user-plus"
                title="Registrar"
                disabled={isLoading}
                loading={isLoading}
                light
                buttonColor={theme.colors.success_chateau}
                textColor={theme.colors.shape}
                iconColor={theme.colors.shape}
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
