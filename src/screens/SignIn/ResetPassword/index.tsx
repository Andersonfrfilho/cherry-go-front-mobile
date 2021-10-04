import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import { StatusBar, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  KeyboardDismiss,
  Container,
  Header,
  AreaTitle,
  Title,
  Form,
  Footer,
  ButtonIcons,
  AreaLoad,
  SubTitle,
} from './styles';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { useClientUser } from '../../../hooks/clientUser';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';
import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';

export interface Focusable {
  focus(): void;
}

interface FormDataPassword {
  password: string;
  confirm_password: string;
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha é obrigatória'),
  password_confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas precisam ser iguais',
  ),
});

export function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [subTitle, setSubTitle] = useState('');

  const refPassword = createRef<Focusable>();
  const refConfirmPassword = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();
  const { resetPassword, token } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  function handleBack() {
    navigation.navigate('SignIn');
  }

  async function handleResetPassword(form: FormDataPassword) {
    setIsLoading(true);
    setAppError({});
    try {
      if (!token.token) {
        setAppError(appErrorVerifyError({ status_code: 600, code: '0002' }));
        return;
      }

      const { password } = form;

      await resetPassword({
        password,
        token: token.token,
      });
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refPassword.current?.focus();
  }, []);

  return (
    <KeyboardDismiss onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <Header>
          <AreaTitle>
            <Title>Reset de senha</Title>
            {!!subTitle && <SubTitle>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          <FormInput
            type={TextInputTypeEnum.password}
            name="password"
            control={control}
            placeholder="Senha"
            error={errors.password && errors.password.message}
            iconName="airplay"
            iconSize={24}
            password
            editable={!isLoading}
            inputRef={refPassword}
            onEndEditing={() => refConfirmPassword.current?.focus()}
          />
          <FormInput
            type={TextInputTypeEnum.password}
            name="password_confirm"
            control={control}
            placeholder="Confirme senha"
            error={errors.password && errors.password.message}
            iconName="airplay"
            iconSize={24}
            password
            editable={!isLoading}
            inputRef={refConfirmPassword}
          />
        </Form>
        <Footer>
          {isLoading ? (
            <AreaLoad>
              <Load color={theme.colors.background_secondary} />
            </AreaLoad>
          ) : (
            <ButtonIcons>
              <ButtonIcon
                iconPosition="left"
                iconName="x-circle"
                title="Cancelar"
                disabled={isLoading}
                loading={isLoading}
                light
                buttonColor={theme.colors.red_ku_crimson}
                textColor={theme.colors.shape}
                iconColor={theme.colors.shape}
                onPress={handleBack}
                titleSize={20}
              />
              <ButtonIcon
                iconName="chevron-right"
                title="Enviar"
                buttonColor={theme.colors.success}
                textColor={theme.colors.shape}
                iconColor={theme.colors.shape}
                disabled={isLoading}
                loading={isLoading}
                titleSize={20}
                onPress={handleSubmit(handleResetPassword)}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </KeyboardDismiss>
  );
}
