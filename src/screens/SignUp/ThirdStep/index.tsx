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
import { removeCharacterSpecial } from '../../../utils/validations';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';

import { Focusable } from '../FirstStep';
import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';
import { useAuth } from '../../../hooks/auth';

interface FormData {
  phone: string;
}

const schemaPhone = Yup.object().shape({
  phone: Yup.string()
    .length(20, 'Celular inválido')
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

  const [subTitle, setSubTitle] = useState('');

  const refPhone = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { userClient, registerPhoneClient } = useClientUser();
  const { signOut } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleRegisterPhones(form: FormData) {
    setIsLoading(true);
    setAppError({});
    const { phone } = form;
    const [country_code, ddd, digit, number] = phone.split(' ');
    try {
      await registerPhoneClient({
        user_id:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
        country_code,
        ddd: removeCharacterSpecial(ddd),
        number: `${digit}${removeCharacterSpecial(number)}`,
      });
      navigation.navigate('PhoneConfirmation');
    } catch (err) {
      await signOut();
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    navigation.replace('AuthRoutes');
  }

  useEffect(() => {
    refPhone.current?.focus();
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
            <Title>Vincular celular</Title>
            {!!subTitle && <SubTitle error={!!errors}>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
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
                title="Confirmar"
                buttonColor={theme.colors.success}
                textColor={theme.colors.shape}
                iconColor={theme.colors.shape}
                disabled={isLoading}
                loading={isLoading}
                titleSize={20}
                onPress={handleSubmit(handleRegisterPhones)}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </KeyboardDismiss>
  );
}
