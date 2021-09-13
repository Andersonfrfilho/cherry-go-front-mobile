import React, { useState, createRef } from 'react';
import * as Yup from 'yup';
import { StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
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

interface FormData {
  zipcode: string;
  address: string;
  number: string;
  district: string;
  state: string;
  complement: string;
  reference: string;
  country: string;
}

const schema = Yup.object().shape({
  phone: Yup.string().length(10, 'Cep inválido').required('Cep é obrigatório'),
});

export function SignUpThirdStep() {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [subTitle, setSubTitle] = useState('');

  const refPhone = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading, appError, setAppError } = useCommon();
  const { registerAddressClient, userClient } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleRegisterAddress(form: FormData) {
    setIsLoading(true);
    setAppError({});
    const { zipcode, address, number, district, state } = form;

    try {
      await registerAddressClient({
        ...form,
        zipcode: removeCharacterSpecial(form.zipcode),
        user_id: userClient && userClient.id,
        country: 'brazil',
      });
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            mask="[55+] ([00]) [9] [0000]-[0000]"
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
                title="Enviar"
                buttonColor={theme.colors.success}
                textColor={theme.colors.shape}
                iconColor={theme.colors.shape}
                disabled={isLoading}
                loading={isLoading}
                titleSize={20}
                onPress={handleSubmit(handleRegisterAddress)}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
