import React, { useState, createRef, useEffect } from 'react';
import { format, sub } from 'date-fns';
import * as Yup from 'yup';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from '@react-native-community/datetimepicker';
import {
  Container,
  Header,
  AreaTitle,
  Title,
  Form,
  Footer,
  ButtonIcons,
  SubTitle,
  TermsUseArea,
  AreaLoad,
} from './styles';
import { ScreenNavigationProp } from '../../../routes/app.stack.routes';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { SelectedPicker } from '../../../components/SelectedPicker';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { CheckBox } from '../../../components/CheckBox';
import { Modal } from '../../../components/Modal';
import { term } from '../../../constant/term.const';
import { termWork } from '../../../constant/termWork.const';
import { useClientUser } from '../../../hooks/clientUser';
import { UserClientDTO } from '../../../hooks/dtos';
import { appErrorVerifyError } from '../../../errors/appErrorVerify';
import {
  formattedDate,
  removeCharacterSpecial,
  validationCpf,
  verifyAge,
} from '../../../utils/validations';
import { GENDER_ENUM } from '../../../enums/genderType.enum';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';

interface FormData {
  phone: string;
}

const schema = Yup.object().shape({
  phone: Yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Insira um nome válido')
    .max(50, 'Insira um nome válido'),
});
export interface Focusable {
  focus(): void;
}

export function SignUpSecondStep() {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedGenre, setSelectedGenre] = useState('');
  const [birthDate, setBirthDate] = useState(
    sub(new Date(), {
      years: 18,
    }),
  );
  const [checkTerm, setCheckTerm] = useState(false);
  const [checkTermWork, setCheckTermWork] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisibleTerm, setModalVisibleTerm] = useState(false);
  const [modalVisibleTermWork, setModalVisibleTermWork] = useState(false);

  const refName = createRef<Focusable>();
  const refLastName = createRef<Focusable>();
  const refEmail = createRef<Focusable>();
  const refCpf = createRef<Focusable>();
  const refRg = createRef<Focusable>();
  const refGenre = createRef<Focusable>();
  const refBirthDate = createRef<Focusable>();
  const refPassword = createRef<Focusable>();
  const refConfirmPassword = createRef<Focusable>();

  const itensGenre = [
    { label: 'Selecione seu genero', value: '' },
    { label: 'Masculino', value: GENDER_ENUM.MALE },
    { label: 'Feminino', value: GENDER_ENUM.FEMALE },
  ];
  const theme = useTheme();
  const { isLoading, setIsLoading, appError, setAppError } = useCommon();
  const { registerClient } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleSignIn(form: FormData) {
    setIsLoading(true);
    setAppError({});
    const {
      name,
      last_name,
      email,
      cpf,
      rg,
      gender,
      birth_date,
      password,
      password_confirm,
    } = form;

    const data: UserClientDTO = {
      name,
      last_name,
      email,
      cpf: removeCharacterSpecial(cpf),
      rg: removeCharacterSpecial(rg),
      gender,
      birth_date: formattedDate(birth_date),
      password,
      password_confirm,
    };
    try {
      if (checkTerm && checkTermWork) {
        await registerWorker(form);
        navigation.navigate('SignUpSecondStep');
        return;
      }

      if (!checkTerm) {
        setAppError(appErrorVerifyError({ status_code: 'app', code: '0001' }));
        Alert.alert('Aceite os termos para terminar o cadastro');
        return;
      }
      await registerClient(data);
      navigation.navigate('SignUpSecondStep');
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

  const onChangeBirthDate = (event: Event, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      const currentBirthDate = format(selectedDate, 'dd/MM/yyyy');
      setShowDatePicker(Platform.OS === 'ios');
      setValue('birth_date', currentBirthDate);
      setBirthDate(selectedDate);
      clearErrors('birth_date');
      refConfirmPassword.current?.focus();
    }
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  function handleModalTerm(param: boolean) {
    setModalVisibleTerm(param);
  }

  function handleModalTermWork(param: boolean) {
    setModalVisibleTermWork(param);
  }

  function handleChangeSelectedGenre(value: string) {
    setSelectedGenre(value);
    setValue('gender', value);
    clearErrors('gender');
    refBirthDate.current?.focus();
  }

  useEffect(() => {
    setIsLoading(false);
    setAppError({});
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Modal
          title="Termos de uso"
          text={term}
          modalVisible={modalVisibleTerm}
          onPress={() => handleModalTerm(false)}
          titleButton="Fechar"
        />
        <Modal
          title="Termos de uso para trabalhar"
          text={termWork}
          modalVisible={modalVisibleTermWork}
          onPress={() => handleModalTermWork(false)}
          titleButton="Fechar"
        />
        <Header>
          <AreaTitle>
            <Title>Vincular celular</Title>
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          <FormInput
            type={TextInputTypeEnum.mask}
            name="cpf"
            control={control}
            placeholder="CPF"
            error={errors.cpf && errors.cpf.message}
            iconName="credit-card"
            iconColor={theme.colors.blue_catalina_dark_shade}
            autoCorrect={false}
            editable={!isLoading}
            mask="[000].[000].[000]-[00]"
            keyboardType="numeric"
            inputRef={refCpf}
            onEndEditing={() => refRg.current?.focus()}
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
                onPress={handleSubmit(handleSignIn)}
              />
            </ButtonIcons>
          )}
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
