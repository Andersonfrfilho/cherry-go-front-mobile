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
  AreaCount,
  SubTitle,
  AreaPhoneText,
  PhoneText,
} from './styles';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { useClientUser } from '../../../hooks/clientUser';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';

import { Focusable } from '../FirstStep';
import { Button } from '../../../components/Button';
import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';
import { useAuth } from '../../../hooks/auth';
import {
  ONE_SECOND,
  PHONE_TIME_CONFIRMATION,
  ZERO_SECOND,
} from '../../../constant/phone.cont';

interface FormCodeData {
  code: string;
}

const schemaCode = Yup.object().shape({
  code: Yup.string()
    .length(4, 'Código inválido')
    .required('Celular é obrigatório'),
});

export function PhoneConfirmation() {
  const {
    control: controlCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
  } = useForm({
    resolver: yupResolver(schemaCode),
  });

  const [initialPage, setInitialPage] = useState<boolean>(true);
  const [subTitle, setSubTitle] = useState('');
  const [phoneConfirmation, setPhoneConfirmation] = useState(false);
  const [seconds, setSeconds] = React.useState(ZERO_SECOND);

  const refCode = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();
  const {
    userClient,
    resendCodePhoneClient,
    confirmCodePhoneClient,
    removePhoneClient,
    token,
  } = useClientUser();
  const { signOut } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  const handleResendCodePhones = async () => {
    setIsLoading(true);
    setAppError({});
    try {
      await resendCodePhoneClient(
        !!userClient && userClient.external_id
          ? userClient.external_id
          : userClient.id,
      );
      setPhoneConfirmation(true);
      setSeconds(PHONE_TIME_CONFIRMATION);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleConfirmCodePhone(form: FormCodeData) {
    setIsLoading(true);

    setAppError({});

    try {
      if (!token.token) {
        setAppError(appErrorVerifyError({ status_code: 600, code: '0002' }));
        await signOut();
        navigation.replace('AuthRoutes', {
          screen: 'SignIn',
        });
        return;
      }

      await confirmCodePhoneClient({
        id:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
        token: token.token,
        code: form.code,
      });

      setPhoneConfirmation(true);

      setSeconds(PHONE_TIME_CONFIRMATION);

      navigation.replace('SignUpFourthStep');
    } catch {
      await signOut();
      navigation.replace('AuthRoutes', {
        screen: 'SignIn',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleBack = () => {
    navigation.replace('AuthRoutes', {
      screen: 'SignIn',
    });
  };

  useEffect(() => {
    if (seconds > ZERO_SECOND) {
      setTimeout(() => setSeconds(seconds - 1), ONE_SECOND);
    }
  }, [seconds]);

  useEffect(() => {
    let unmounted = false;
    const ac = new AbortController();
    if (!unmounted) {
      setPhoneConfirmation(true);
      setSeconds(PHONE_TIME_CONFIRMATION);
      if (initialPage) {
        refCode.current?.focus();
        setInitialPage(false);
      }
    }

    return () => {
      ac.abort();
      unmounted = true;
      setInitialPage(true);
      setSubTitle('');
      setPhoneConfirmation(false);
      setSeconds(ZERO_SECOND);
    };
  }, []);

  const handleEditPhone = async () => {
    if (userClient || userClient.external_id || userClient.id) {
      await removePhoneClient({
        user_id:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
      });
      navigation.navigate('SignUpThirdStep');
    } else {
      await signOut();
      navigation.replace('AuthRoutes', {
        screen: 'SignIn',
      });
    }
  };

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
            <Title>Confirmar celular</Title>
            {!!subTitle && <SubTitle error={!!errors}>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          <AreaPhoneText>
            {!!userClient.phones &&
              !!userClient.phones.country_code &&
              !!userClient.phones.ddd &&
              !!userClient.phones.number && (
                <PhoneText>{`${userClient.phones.country_code} (0${
                  userClient.phones.ddd
                }) 9 ****-${userClient.phones.number.substr(5)}`}</PhoneText>
              )}
          </AreaPhoneText>
          <FormInput
            name="code"
            control={controlCode}
            placeholder="código"
            error={errorsCode.code && errorsCode.code.message}
            iconName="send"
            autoCorrect={false}
            editable={!isLoading}
            keyboardType="numeric"
            maxLength={4}
          />

          {seconds === 0 ? (
            <Button
              title="Reenviar"
              onPress={handleResendCodePhones}
              enabled={!isLoading}
              loading={isLoading}
            />
          ) : (
            <AreaCount>
              <Title>{seconds}</Title>
            </AreaCount>
          )}
          <Button
            title="Editar"
            onPress={handleEditPhone}
            enabled={!isLoading}
            loading={isLoading}
            color={theme.colors.line}
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
                disabled={isLoading || !phoneConfirmation}
                loading={isLoading}
                titleSize={20}
                onPress={handleSubmitCode(handleConfirmCodePhone)}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </KeyboardDismiss>
  );
}
