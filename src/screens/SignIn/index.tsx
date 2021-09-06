import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, Title, SubTitle, Form, Footer } from './styles';
import { useAuth } from '../../hooks/auth';
import { ScreenNavigationProp } from '../../routes/app.stack.routes';
import { InputForm } from '../../components/InputForm';

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(form: FormData) {
    console.log(form);
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

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiencia incrível.
            </SubTitle>
          </Header>
          <Form>
            <InputForm
              name="email"
              control={control}
              placeholder="E-mail"
              error={errors.email && errors.email.message}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={handleSubmit(handleSignIn)}
              enabled
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
