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
} from './styles';
import { ScreenNavigationProp } from '../../../routes/app.stack.routes';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { useClientUser } from '../../../hooks/clientUser';
import { appErrorVerifyError } from '../../../errors/appErrorVerify';
import { removeCharacterSpecial } from '../../../utils/validations';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';

import { Focusable } from '../FirstStep';
import { Button } from '../../../components/Button';

interface FormData {
  phone: string;
}

interface FormCodeData {
  code: string;
}

const schemaPhone = Yup.object().shape({
  phone: Yup.string()
    .length(20, 'Celular inválido')
    .required('Celular é obrigatório'),
});
const schemaCode = Yup.object().shape({
  code: Yup.string()
    .length(4, 'Código inválido')
    .required('Celular é obrigatório'),
});

export function SignUpThirdStep() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaPhone),
  });

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

  const refPhone = createRef<Focusable>();
  const refCode = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading, appError, setAppError } = useCommon();
  const {
    userClient,
    registerPhoneClient,
    resendCodePhoneClient,
    confirmCodePhoneClient,
    token,
  } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleRegisterPhones(form: FormData) {
    setIsLoading(true);
    setAppError({});
    const { phone } = form;
    const [country_code, ddd, digit, number] = phone.split(' ');
    try {
      await registerPhoneClient({
        user_id: userClient.id,
        country_code,
        ddd: removeCharacterSpecial(ddd),
        number: `${digit}${removeCharacterSpecial(number)}`,
      });
      setPhoneConfirmation(true);
      setResendCode(false);
      setSeconds(60 * 3);
      navigation.navigate('SignUpSecondStep');
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCodePhones() {
    setIsLoading(true);
    setAppError({});
    try {
      await resendCodePhoneClient(userClient.id);
      setPhoneConfirmation(true);
      setResendCode(false);
      setSeconds(60 * 3);
      // navigation.navigate('SignUpSecondStep');
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirmCodePhone(form: FormCodeData) {
    setIsLoading(true);
    setAppError({});
    try {
      console.log(form);
      if (!token.token) {
        setAppError(appErrorVerifyError({ status_code: 'app', code: '0002' }));
        return;
      }
      await confirmCodePhoneClient({
        id: userClient.id,
        token: token.token,
        code: form.code,
      });
      setPhoneConfirmation(true);
      setResendCode(false);
      setSeconds(60 * 3);
      // navigation.navigate('SignUpSecondStep');
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setResendCode(true);
    }
  }, [seconds]);

  useEffect(() => {
    refPhone.current?.focus();
  }, []);
  console.log(errorsCode);
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
            <Title>Vincular celular</Title>
            {!!subTitle && <SubTitle error={!!errors}>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          {phoneConfirmation && (
            <>
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
            </>
          )}
          {!phoneConfirmation && (
            <>
              <FormInput
                type={TextInputTypeEnum.mask}
                name="phone"
                control={control}
                placeholder="celular"
                error={errors.phone && errors.phone.message}
                iconName="phone"
                autoCorrect={false}
                editable={!isLoading}
                mask="+55 ([00]) [0] [0000]-[0000]"
                inputRef={refPhone}
                keyboardType="numeric"
              />
              <Button
                title="Confirmar"
                onPress={handleSubmit(handleRegisterPhones)}
                enabled={!isLoading}
                loading={isLoading}
              />
            </>
          )}
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
