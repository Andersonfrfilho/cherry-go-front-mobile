import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import { StatusBar, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckBox } from '../../../components/CheckBox';
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
  AreaCheckBox,
  SubTitle,
} from './styles';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { useClientUser } from '../../../hooks/clientUser';
import { removeCharacterSpecial } from '../../../utils/validations';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';

import { Button } from '../../../components/Button';
import { useError } from '../../../hooks/error';

export interface Focusable {
  focus(): void;
}

interface FormDataPhone {
  phone: string;
}

interface FormDataMail {
  mail: string;
}

interface FormDataCode {
  code: string;
}

const schemaPhone = Yup.object().shape({
  phone: Yup.string()
    .length(20, 'Celular inválido')
    .required('Celular é obrigatório'),
});
const schemaMail = Yup.object().shape({
  mail: Yup.string()
    .email('Digite um formato de email válido')
    .required('Email é obrigatório'),
});
const schemaCode = Yup.object().shape({
  code: Yup.string()
    .length(4, 'Código inválido')
    .required('Celular é obrigatório'),
});

export function ForgotPassword() {
  const {
    control: controlPhone,
    handleSubmit: handleSubmitPhone,
    formState: { errors: errorsPhone },
    setValue: setValuePhone,
  } = useForm({
    resolver: yupResolver(schemaPhone),
  });

  const {
    control: controlMail,
    handleSubmit: handleSubmitMail,
    formState: { errors: errorsMail },
  } = useForm({
    resolver: yupResolver(schemaMail),
  });

  const {
    control: controlCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
  } = useForm({
    resolver: yupResolver(schemaCode),
  });

  const [subTitle, setSubTitle] = useState('');
  const [checkMail, setCheckMail] = useState(true);
  const [checkPhone, setCheckPhone] = useState(false);
  const [phoneConfirmation, setPhoneConfirmation] = useState(false);
  const [resendCode, setResendCode] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [userId, setUserId] = React.useState('');

  const refPhone = createRef<Focusable>();
  const refMail = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();

  const {
    userClient,
    forgotPasswordMail,
    confirmCodePhoneClient,
    token,
    forgotPasswordPhone,
    phone,
    setPhone,
  } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleForgotPasswordMail(form: FormDataMail) {
    setIsLoading(true);
    setAppError({});
    try {
      const { mail } = form;
      await forgotPasswordMail(mail);
      // navigation.navigate('SignUpSecondStep');
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }
  async function handleForgotPasswordPhone(form: FormDataPhone) {
    const { phone: phoneForm } = form;
    const [country_code, ddd, digit, number] = phoneForm.split(' ');
    try {
      const { countdown, userId: userIdResponse } = await forgotPasswordPhone({
        country_code,
        ddd: removeCharacterSpecial(ddd),
        number: `${digit}${removeCharacterSpecial(number)}`,
      });
      setPhoneConfirmation(true);
      setResendCode(false);
      setSeconds(countdown);
      setPhone(phoneForm);
      setValuePhone('code', '');
      setUserId(userIdResponse);
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

  function handleChangeMailCheckBox() {
    setCheckMail(true);
    setCheckPhone(false);
  }
  function handleChangePhoneCheckBox() {
    setCheckMail(false);
    setCheckPhone(true);
  }

  async function handleConfirmCodePhone(form: FormDataCode) {
    setIsLoading(true);
    setAppError({});
    try {
      if (!token.token) {
        setAppError(appErrorVerifyError({ status_code: 600, code: '0002' }));
        return;
      }

      await confirmCodePhoneClient({
        id: userId,
        token: token.token,
        code: form.code,
      });
      navigation.navigate('SignUpSecondStep');
    } catch (error) {
      console.log(error);
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log(phoneConfirmation && seconds > 0);
    if (phoneConfirmation && seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (phoneConfirmation) {
      setResendCode(true);
      setPhoneConfirmation(false);
    }
  }, [seconds]);
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
            <Title>Esqueceu a senha</Title>
            {!!subTitle && (
              <SubTitle error={!!errorsMail || !!errorsPhone}>
                {subTitle}
              </SubTitle>
            )}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          <AreaCheckBox>
            <CheckBox
              active={checkMail}
              title="Email"
              disabled={!!isLoading || !!checkMail}
              loading={isLoading}
              buttonColor={theme.colors.background_primary}
              textColor={theme.colors.main_light}
              iconColor={theme.colors.main_light}
              onPress={handleChangeMailCheckBox}
            />
            <CheckBox
              active={checkPhone}
              title="Celular"
              disabled={!!isLoading || !!checkPhone}
              loading={isLoading}
              buttonColor={theme.colors.background_primary}
              textColor={theme.colors.main_light}
              iconColor={theme.colors.main_light}
              onPress={handleChangePhoneCheckBox}
            />
          </AreaCheckBox>
          {checkMail ? (
            <FormInput
              name="mail"
              control={controlMail}
              placeholder="E-mail"
              error={errorsMail.email && errorsMail.email.message}
              iconName="mail"
              keyboardType="email-address"
              autoCorrect={false}
              editable={!isLoading}
              inputRef={refMail}
            />
          ) : (
            !phoneConfirmation && (
              <FormInput
                type={TextInputTypeEnum.mask}
                name="phone"
                control={controlPhone}
                placeholder="celular"
                error={errorsPhone.phone && errorsPhone.phone.message}
                iconName="phone"
                autoCorrect={false}
                editable={!isLoading}
                mask="+55 ([00]) [0] [0000]-[0000]"
                inputRef={refPhone}
                keyboardType="numeric"
              />
            )
          )}
          {phoneConfirmation && (
            <>
              {!resendCode && (
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
              )}
              {resendCode ? (
                <Button
                  title="Reenviar"
                  onPress={handleSubmitPhone(handleForgotPasswordPhone)}
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
                onPress={
                  checkMail
                    ? handleSubmitMail(handleForgotPasswordMail)
                    : phoneConfirmation && seconds !== 0
                    ? handleSubmitCode(handleConfirmCodePhone)
                    : handleSubmitPhone(handleForgotPasswordPhone)
                }
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </KeyboardDismiss>
  );
}
