import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import { StatusBar, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
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
  AreaError,
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

interface Params {
  email: string;
}
export interface Focusable {
  focus(): void;
}

interface FormDataResendPassword {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email é obrigatória'),
});

export function ResendEmailActive() {
  const route = useRoute();

  const { email: emailRoute } = route.params as Params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [subTitle, setSubTitle] = useState<string>('');
  const [initialPage, setInitialPage] = useState<boolean>(true);
  const refEmail = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();
  const { resendMailActiveClient } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  function handleBack() {
    navigation.navigate('SignIn');
  }

  async function handleResendEmailActive(form: FormDataResendPassword) {
    setIsLoading(true);
    setAppError({});
    try {
      const { email } = form;

      await resendMailActiveClient(email);
      navigation.navigate('SignIn');
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let unmounted = false;
    const ac = new AbortController();
    if (!unmounted) {
      setAppError({});
      if (!!emailRoute && emailRoute.length > 0) {
        setValue('email', emailRoute);
      } else if (initialPage) {
        refEmail.current?.focus();
        setInitialPage(false);
      }
    }
    return () => {
      ac.abort();
      unmounted = true;
      setSubTitle('');
    };
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
            <Title>Reenvie email de confirmação</Title>
            {!!subTitle && <SubTitle>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <AreaError>
                <WarningText title={appError.message} />
              </AreaError>
            )}
          </AreaTitle>
        </Header>
        <Form>
          <FormInput
            type={TextInputTypeEnum.default}
            name="email"
            control={control}
            placeholder="Email"
            error={errors.email && errors.email.message}
            iconName="mail"
            iconSize={24}
            password
            editable={!isLoading}
            inputRef={refEmail}
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
                title="Voltar"
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
                onPress={handleSubmit(handleResendEmailActive)}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </KeyboardDismiss>
  );
}
