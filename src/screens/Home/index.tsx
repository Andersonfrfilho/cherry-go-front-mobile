import React, { createRef, useEffect } from 'react';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { FormInput } from '../../components/FormInput';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useCommon } from '../../hooks/common';
import { TextInputTypeEnum } from '../../enums/TextInputType.enum';

import { WarningText } from '../../components/WarningText';
import { useError } from '../../hooks/error';
import { ScreenNavigationProp } from '../../routes';

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
export function Home() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { signIn, signOut } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  const refMail = createRef<Focusable>();
  const refPassword = createRef<Focusable>();

  async function handleSignIn({ password, email }: FormData) {
    setIsLoading(true);
    try {
      await signIn({ email, password });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    navigation.navigate('SignIn');
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
              <Title>Home</Title>
              {appError && appError.message && (
                <WarningText title={appError.message} />
              )}
            </AreaTitle>
          </Header>
          <Form>
            <Button onPress={handleLogout} title="logout" />
          </Form>
          <Footer />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
