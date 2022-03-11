import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import { StatusBar, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mask } from 'react-native-mask-text';

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
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { useClientUser } from '../../../hooks/clientUser';
import { removeCharacterSpecial } from '../../../utils/validations';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';

import { Focusable } from '../FirstStep';
import { Button } from '../../../components/Button';
import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';
import { useAuth } from '../../../hooks/auth';

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

  const [subTitle, setSubTitle] = useState('');
  const [phoneConfirmation, setPhoneConfirmation] = useState(false);
  const [resendCode, setResendCode] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

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

  async function handleResendCodePhones() {
    setIsLoading(true);
    setAppError({});
    try {
      await resendCodePhoneClient(userClient.id);
      setPhoneConfirmation(true);
      setResendCode(false);
      setSeconds(60 * 3);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirmCodePhone(form: FormCodeData) {
    setIsLoading(true);
    setAppError({});
    try {
      if (!token.token) {
        setAppError(appErrorVerifyError({ status_code: 600, code: '0002' }));
        await signOut();
        navigation.navigate('AuthRoutes');
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
      setResendCode(false);
      setSeconds(60 * 3);
      navigation.replace('SignUpThirdStep');
    } catch {
      await signOut();
      navigation.navigate('AuthRoutes');
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    navigation.replace('AuthRoutes');
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setResendCode(true);
    }
  }, [seconds]);

  useEffect(() => {
    setPhoneConfirmation(true);
    setResendCode(false);
    setSeconds(60 * 3);
    refCode.current?.focus();
  }, []);

  async function handleEditPhone() {
    if (
      !!userClient.phones &&
      !!userClient.phones.country_code &&
      !!userClient.phones.ddd &&
      !!userClient.phones.number
    ) {
      await removePhoneClient({
        user_id:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
        country_code: userClient.phones.country_code,
        ddd: userClient.phones.ddd,
        number: userClient.phones.number,
      });
      navigation.navigate('SignUpThirdStep');
    } else {
      await signOut();
      navigation.navigate('AuthRoutes');
    }
  }

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
