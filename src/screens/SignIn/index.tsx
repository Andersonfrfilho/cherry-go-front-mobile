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
} from './styles';
import { useAuth } from '../../hooks/auth';
import { ScreenNavigationProp } from '../../routes/app.stack.routes';
import { FormInput } from '../../components/FormInput';
import { ButtonIcon } from '../../components/ButtonIcon';

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
            />
            <FormInput
              name="password"
              control={control}
              placeholder="Senha"
              error={errors.password && errors.password.message}
              iconName="airplay"
              iconSize={24}
              password
            />
          </Form>
          <Footer>
            <Button title="Login" onPress={() => {}} enabled loading={false} />
            <ButtonIcons>
              <ButtonIcon
                iconName="airplay"
                title="Registrar"
                color={theme.colors.background_secondary}
                onPress={handleNewAccount}
                enabled
                loading={false}
                light
              />
              <ButtonIcon
                title="Esqueci a senha"
                color={theme.colors.background_secondary}
                onPress={handleNewAccount}
                enabled
                loading={false}
                light
              />
            </ButtonIcons>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
