import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import { StatusBar, Keyboard, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

export function SignUpFourthStep() {
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

  const [subTitle, setSubTitle] = useState(
    'Tire a foto de frente do seu documento',
  );
  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

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

  function handleBack() {
    navigation.navigate('SignIn');
  }

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
            <Title>Documento</Title>
            {!!subTitle && <SubTitle error={!!errors}>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          {/* <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text> Flip </Text>
          </TouchableOpacity> */}
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
                onPress={() => {}}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </KeyboardDismiss>
  );
}
