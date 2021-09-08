import React, { useState, useEffect } from 'react';
import { isDate, sub } from 'date-fns';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import LogoTitleSvg from '../../../assets/logo_title.svg';
import {
  Container,
  Header,
  AreaLogoTitle,
  AreaTitle,
  Title,
  Form,
  Footer,
  ButtonIcons,
  SubTitle,
  TermsUseArea,
} from './styles';
import { useAuth } from '../../../hooks/auth';
import { ScreenNavigationProp } from '../../../routes/app.stack.routes';
import { FormInput } from '../../../components/FormInput';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { SelectedPicker } from '../../../components/SelectedPicker';
import { GENDERS_ENUM } from '../../../enums/genderType.enum';
import { ButtonInput } from '../../../components/ButtonInput';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { CheckBox } from '../../../components/CheckBox';
import { Modal } from '../../../components/Modal';
import { term } from '../../../constant/term.const';

interface ItemSelectedGender {
  label: string;
  value: string;
}

interface FormData {
  email: string;
  password: string;
}
const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  last_name: Yup.string().required('Sobrenome obrigatório'),
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  cpf: Yup.string().required('CPF é obrigatório').length(14, 'CPF inválido'),
  rg: Yup.string()
    .required('RG é obrigatório')
    .min(10, 'RG inválido')
    .max(12, 'RG inválido'),
  gender: Yup.string()
    .required('Genero é obrigatório')
    .oneOf(['male', 'female'], 'selecione um genero valido'),
  password: Yup.string().required('Senha é obrigatória'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas precisam ser iguais',
  ),
  birth_date: Yup.date().required('Data é obrigatória'),
});
export function SignUpFirstStep() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedGender, setSelectedGender] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [checkTerm, setCheckTerm] = useState(false);
  const [openTerm, setOpenTerm] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const itensGender = [
    { label: 'Masculino', value: GENDERS_ENUM.MALE },
    { label: 'Feminino', value: GENDERS_ENUM.FEMALE },
  ];
  const theme = useTheme();
  const { isLoading, setIsLoading, appError } = useCommon();
  const { signIn } = useAuth();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleSignIn(form: FormData) {
    console.log('################');
    setIsLoading(true);
    setTimeout(() => {}, 3000);
    setIsLoading(false);
    // try {

    //   await schema.validate({ email, password });

    //   await signIn({ email, password });
    // } catch (error) {
    //   if (error instanceof Yup.ValidationError) {
    //     return Alert.alert('Opa', error.message);
    //   }
    //   Alert.alert(
    //     'Erro na autenticação',
    //     'Ocorreu um erro ao fazer login, verifique as credenciais',
    //   );
    // }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  const onChange = (_, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  function handleModalView() {
    setModalVisible(false);
  }
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
          modalVisible={modalVisible}
          onPress={handleModalView}
          titleButton="Fechar"
        />
        <Header>
          <AreaTitle>
            <Title>Registrar</Title>
            <SubTitle>{appError.message}</SubTitle>
          </AreaTitle>
        </Header>
        <Form>
          <FormInput
            name="name"
            control={control}
            placeholder="Nome"
            error={errors.email && errors.email.message}
            iconName="tag"
            iconSize={24}
            autoCorrect={false}
            editable={!isLoading}
          />
          <FormInput
            name="last_name"
            control={control}
            placeholder="Sobrenome"
            error={errors.email && errors.email.message}
            iconName="tag"
            iconSize={24}
            autoCorrect={false}
            editable={!isLoading}
          />
          <FormInput
            name="email"
            control={control}
            placeholder="E-mail"
            error={errors.email && errors.email.message}
            iconName="mail"
            iconSize={24}
            autoCorrect={false}
            editable={!isLoading}
          />
          <FormInput
            type={TextInputTypeEnum.mask}
            name="cpf"
            control={control}
            placeholder="CPF"
            error={errors.email && errors.email.message}
            iconName="credit-card"
            iconSize={24}
            autoCorrect={false}
            editable={!isLoading}
            mask="[000].[000].[000]-[00]"
          />
          <FormInput
            type={TextInputTypeEnum.mask}
            name="rg"
            control={control}
            placeholder="RG"
            error={errors.email && errors.email.message}
            iconName="credit-card"
            iconSize={24}
            autoCorrect={false}
            editable={!isLoading}
            mask="[00].[000].[000]-[00]"
          />
          <SelectedPicker
            title="Sexo registrado no seu documento"
            items={itensGender}
            selected={selectedGender}
            setSelected={setSelectedGender}
          />
          <FormInput
            type={TextInputTypeEnum.button}
            name="rg"
            control={control}
            placeholder="Data de nascimento"
            error={errors.email && errors.email.message}
            iconName="calendar"
            iconSize={24}
            iconButtonName="external-link"
            iconButtonSize={24}
            autoCorrect={false}
            editable={!isLoading}
            mask="[00]/[00]/[0000]"
            functionOnPress={showDatepicker}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              maximumDate={sub(new Date(), {
                years: 18,
              })}
              mode={mode}
              is24Hour
              display="default"
              onChange={onChange}
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
          />
          <FormInput
            type={TextInputTypeEnum.password}
            name="confirmation_password"
            control={control}
            placeholder="Senha"
            error={errors.password && errors.password.message}
            iconName="airplay"
            iconSize={24}
            password
            editable={!isLoading}
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
              onPress={() => setModalVisible(true)}
            />

            <CheckBox
              active={checkTerm}
              iconName="file-text"
              title=""
              disabled={isLoading || openTerm}
              loading={isLoading}
              light
              buttonColor={theme.colors.background_primary}
              textColor={theme.colors.background_primary}
              iconColor={theme.colors.main_light}
              onPress={() => setCheckTerm(!checkTerm)}
            />
          </TermsUseArea>
        </Form>
        <Footer>
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
              onPress={handleNewAccount}
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
            />
          </ButtonIcons>
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
