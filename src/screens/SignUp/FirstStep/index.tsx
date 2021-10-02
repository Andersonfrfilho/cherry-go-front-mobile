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
  TermsUseArea,
  AreaLoad,
} from './styles';
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
import {
  formattedDate,
  removeCharacterSpecial,
  validationCpf,
  verifyAge,
} from '../../../utils/validations';
import { GENDER_ENUM } from '../../../enums/genderType.enum';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';
import { useProviderUser } from '../../../hooks/providerUser';
import {
  UserClientRegisterDTO,
  UserProviderRegisterDTO,
} from '../../../hooks/dtos/users';
import { ScreenNavigationProp } from '../../../routes';
import { useError } from '../../../hooks/error';

interface FormData {
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  rg: string;
  gender: GENDER_ENUM;
  birth_date: string;
  password: string;
  password_confirm: string;
}
Yup.addMethod(Yup.string, 'cpfValidation', function (errorMessage) {
  return this.test('test-cpf-validation', errorMessage, function (value) {
    const { path, createError } = this;

    return (
      (value && validationCpf(value)) ||
      createError({ path, message: errorMessage })
    );
  });
});

Yup.addMethod(Yup.string, 'ageValidation', function (errorMessage) {
  return this.test('test-age-validation', errorMessage, function (value) {
    const { path, createError } = this;

    return (
      (value && verifyAge(value)) ||
      createError({ path, message: errorMessage })
    );
  });
});

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Insira um nome válido')
    .max(50, 'Insira um nome válido'),
  last_name: Yup.string()
    .required('Sobrenome obrigatório')
    .min(3, 'Insira um nome válido')
    .max(50, 'Insira um nome válido'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  cpf: Yup.string()
    .length(14, 'CPF inválido')
    .cpfValidation('O CPF digitado não é invalido')
    .required('CPF é obrigatório'),
  rg: Yup.string()
    .required('RG é obrigatório')
    .min(10, 'RG inválido')
    .max(12, 'RG inválido'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'selecione um genero valido')
    .required('Genero é obrigatório'),
  birth_date: Yup.string()
    .ageValidation('Sua idade não é permitida')
    .required('Data é obrigatória'),
  password: Yup.string().required('Senha é obrigatória'),
  password_confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas precisam ser iguais',
  ),
});
export interface Focusable {
  focus(): void;
}

export function SignUpFirstStep() {
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
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();
  const { registerClient } = useClientUser();
  const { registerProvider } = useProviderUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleSignIn(form: FormData) {
    setIsLoading(true);
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

    const data: UserClientRegisterDTO = {
      name,
      last_name,
      email,
      cpf: removeCharacterSpecial(cpf),
      rg: removeCharacterSpecial(rg),
      gender,
      birth_date: formattedDate(birth_date),
      password,
      password_confirm,
      term_client: checkTerm,
    };
    try {
      if (checkTerm && checkTermWork) {
        const providerData: UserProviderRegisterDTO = {
          ...data,
          term_provider: checkTermWork,
        };
        await registerProvider(providerData);
        setIsLoading(false);
        navigation.replace('SignUpSecondStep');
        return;
      }

      if (!checkTerm) {
        setAppError(appErrorVerifyError({ status_code: 'app', code: '0001' }));
        Alert.alert('Aceite os termos para terminar o cadastro');
        setIsLoading(false);
        return;
      }

      setAppError({});
      await registerClient(data);
      setIsLoading(false);
      navigation.replace('SignUpSecondStep');
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    navigation.replace('SignIn');
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
    refName.current?.focus();
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
            <Title>Registrar</Title>
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          <FormInput
            name="name"
            control={control}
            placeholder="Nome"
            error={errors.name && errors.name.message}
            iconName="tag"
            autoCorrect={false}
            autoCapitalize="sentences"
            editable={!isLoading}
            maxLength={50}
            inputRef={refName}
            onEndEditing={() => refLastName.current?.focus()}
          />
          <FormInput
            name="last_name"
            control={control}
            placeholder="Sobrenome"
            error={errors.last_name && errors.last_name.message}
            iconName="tag"
            autoCorrect={false}
            autoCapitalize="sentences"
            editable={!isLoading}
            maxLength={50}
            inputRef={refLastName}
            onEndEditing={() => refEmail.current?.focus()}
          />
          <FormInput
            name="email"
            control={control}
            placeholder="E-mail"
            error={errors.email && errors.email.message}
            iconName="mail"
            keyboardType="email-address"
            autoCorrect={false}
            editable={!isLoading}
            inputRef={refEmail}
            onEndEditing={() => refCpf.current?.focus()}
          />
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
          <FormInput
            type={TextInputTypeEnum.mask}
            name="rg"
            control={control}
            placeholder="RG"
            error={errors.rg && errors.rg.message}
            iconName="credit-card"
            iconColor={theme.colors.success_chateau}
            autoCorrect={false}
            editable={!isLoading}
            mask="[00].[000].[000]-[0]"
            keyboardType="numeric"
            inputRef={refRg}
            onEndEditing={() => refGenre.current?.focus()}
          />
          <SelectedPicker
            title="Sexo registrado no seu documento"
            items={itensGenre}
            selected={selectedGenre}
            setSelected={handleChangeSelectedGenre}
            error={errors.genre && errors.genre.message}
            selectedRef={refGenre}
            enabled={!isLoading}
          />
          <FormInput
            type={TextInputTypeEnum.button}
            name="birth_date"
            control={control}
            placeholder="Data de nascimento"
            error={errors.birth_date && errors.birth_date.message}
            iconName="calendar"
            iconSize={24}
            iconButtonName="external-link"
            iconButtonSize={24}
            autoCorrect={false}
            editable={!isLoading}
            mask="[00]/[00]/[0000]"
            functionOnPress={handleShowDatePicker}
            keyboardType="numeric"
            inputRef={refBirthDate}
            onEndEditing={() => refPassword.current?.focus()}
          />
          {showDatePicker && (
            <DatePicker
              testID="datePicker"
              value={birthDate}
              maximumDate={sub(new Date(), {
                years: 18,
              })}
              is24Hour
              display="default"
              onChange={onChangeBirthDate}
              locale="pt-BR"
            />
          )}
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
            placeholder="Senha"
            error={errors.password && errors.password.message}
            iconName="airplay"
            iconSize={24}
            password
            editable={!isLoading}
            inputRef={refConfirmPassword}
          />
          <TermsUseArea>
            <ButtonIcon
              iconName="file-text"
              title="Termos de uso"
              disabled={isLoading}
              loading={isLoading}
              light
              buttonColor={theme.colors.bon_jour_light_shade}
              textColor={theme.colors.background_primary}
              iconColor={theme.colors.background_primary}
              onPress={() => handleModalTerm(true)}
            />

            <CheckBox
              active={checkTerm}
              iconName="file-text"
              title=""
              disabled={isLoading}
              loading={isLoading}
              light
              buttonColor={theme.colors.background_primary}
              textColor={theme.colors.background_primary}
              iconColor={theme.colors.main_light}
              onPress={() => setCheckTerm(!checkTerm)}
            />
          </TermsUseArea>
          <TermsUseArea>
            <ButtonIcon
              iconName="file-text"
              title={`Quero trabalhar \n Termos de uso`}
              disabled={isLoading}
              loading={isLoading}
              light
              buttonColor={theme.colors.bon_jour_light_shade}
              textColor={theme.colors.background_primary}
              iconColor={theme.colors.background_primary}
              onPress={() => handleModalTermWork(true)}
            />
            <CheckBox
              active={checkTermWork}
              iconName="file-text"
              title=""
              disabled={isLoading}
              loading={isLoading}
              light
              buttonColor={theme.colors.background_primary}
              textColor={theme.colors.background_primary}
              iconColor={theme.colors.main_light}
              onPress={() => setCheckTermWork(!checkTermWork)}
            />
          </TermsUseArea>
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
