import React, { useState, useEffect } from 'react';
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
  const { isLoading, setIsLoading, appError } = useCommon();
  const { signIn } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleSignIn(form: FormData) {
    console.log('################');
    setIsLoading(true);
    setTimeout(() => {}, 3000);
    setIsLoading(false);
    // try {

    //   await schema.validate({ email, password });

    //   await signIn({ email, password });
    // } catch (error) {
    //   if (error instanceof Yup.ValidationError) {
    //     return Alert.alert('Opa', error.message);
    //   }
    //   Alert.alert(
    //     'Erro na autenticação',
    //     'Ocorreu um erro ao fazer login, verifique as credenciais',
    //   );
    // }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }
  console.log(isLoading);
  console.log(errors);
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
              <SubTitle>{appError.message}</SubTitle>
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
                light
              />
            </ButtonIcons>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
