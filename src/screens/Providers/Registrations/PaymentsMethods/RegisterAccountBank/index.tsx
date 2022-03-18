import React, { createRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Container,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaIcon,
  AreaCheckBox,
  AreaTitlePaymentType,
  TitlePaymentType,
  AreaSavedPaymentsTypes,
  TitlePaymentTypeButton,
  AreaUpdatePaymentsAccountPerson,
  AreaTitleLine,
  IconMaterialCommunity,
  AreaRegisterBankAccountContent,
  AreaRegisterBankAccount,
  AreaRegisterBankAccountTitle,
  AreaSelectBank,
  AreaButtonSelectBank,
  TitleSelectBank,
  AreaListBank,
  AreaListBankSelected,
  AreaButtonSave,
  ButtonIcons,
} from './styles';

import { useCommon } from '../../../../../hooks/common';
import { WarningText } from '../../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../../routes';
import { HeaderProfile } from '../../../../../components/HeaderProfile';
import {
  Appointment,
  useProviderUser,
} from '../../../../../hooks/providerUser';
import { getPlatformDate } from '../../../../../utils/getPlatformDate';
import { getValueAmount } from '../../../../../utils/formatValueAmount';
import { Load } from '../../../../../components/Load';
import { useError } from '../../../../../hooks/error';
import { CheckBox } from '../../../../../components/CheckBox';
import { PAYMENT_TYPES_ENUM } from '../../../../../enums/PaymentTypes.enum';
import { SearchAbleDropDown } from '../../../../../components/SearchAbleDropDown';
import { Bank, useBank } from '../../../../../hooks/bank';
import { SearchAbleDropDownBanks } from '../../../../../components/SearchAbleDropDownBanks';
import { FormInput } from '../../../../../components/FormInput';
import { TextInputTypeEnum } from '../../../../../enums/TextInputType.enum';
import { ButtonIcon } from '../../../../../components/ButtonIcon';
import { useClientUser } from '../../../../../hooks/clientUser';

export interface Focusable {
  focus(): void;
}
interface FormData {
  branch_number: string;
  account_number: string;
  account_holder_name: string;
  name_account_bank: string;
  code_bank: string;
}

const schema = Yup.object().shape({
  branch_number: Yup.string()
    .length(4, 'Número da agencia invalido')
    .required('Número da agencia é obrigatório')
    .lowercase(),
  account_number: Yup.string()
    .max(10, 'Número da conta muito grande')
    .required('Número de conta bancaria obrigatória')
    .lowercase(),
  account_holder_name: Yup.string()
    .max(20, 'Digite um nome valido')
    .required('Nome do titular é obrigatório')
    .lowercase(),
  name_account_bank: Yup.string()
    .max(30, 'Descrição da conta bancaria')
    .required('Descrição da conta bancaria é obrigatório')
    .lowercase(),
  code_bank: Yup.string().required('Selecione um banco valido').lowercase(),
});

export function RegisterAccountBank() {
  const [bankFind, setBankFind] = useState('');
  const [openInputListBank, setOpenInputListBank] = useState(false);
  const [selectedItemInput, setSelectedItemInput] = useState(false);
  const [bankFindSelected, setBankFindSelected] = useState(false);
  const [listBanksOriginal, setListBanksOriginal] = useState<string[]>(
    [] as string[],
  );
  const [listBanksFiltered, setListBanksFiltered] = useState<string[]>(
    [] as string[],
  );

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

  const refBank = createRef<Focusable>();
  const refBranchNumber = createRef<Focusable>();
  const refAccountBank = createRef<Focusable>();
  const refAccountHolderName = createRef<Focusable>();
  const refNameAccountBank = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { banks, getAllBanks } = useBank();
  const { registerAccountBank } = useClientUser();
  const { userProvider, setUserProvider } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();

  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;

  async function handleSelectedAppointment(appointment: Appointment) {
    navigation.navigate('AppointmentsDetailsProvider', { appointment });
  }

  useEffect(() => {
    getAllBanks();
  }, []);

  useEffect(() => {
    const bankString = banks.filter(bank => !!bank.code).map(bank => bank.name);
    setListBanksOriginal(bankString);
    setListBanksFiltered(bankString);
  }, [banks]);

  function handleSelectedBank(value: string) {
    setBankFind(value);
    setListBanksFiltered([]);
    setBankFindSelected(true);
    setOpenInputListBank(false);
    setSelectedItemInput(true);
    const bankSelected = banks.find(bankParam => value === bankParam.name);
    setValue('code_bank', bankSelected?.code);
  }

  function handleChangeValuesBankName(value: string) {
    setBankFind(value);
  }
  function handleBack() {
    navigation.goBack();
  }
  useEffect(() => {
    if (bankFind && bankFind.length === 0) {
      setListBanksFiltered(listBanksOriginal);
    } else {
      const banksFound = bankFindSelected
        ? []
        : listBanksOriginal.filter((bankParam: string) =>
            bankParam.toLowerCase().includes(bankFind.toLowerCase()),
          );
      setListBanksFiltered(banksFound);
    }
  }, [bankFind]);

  function handleEnableInputListBankSearch() {
    setOpenInputListBank(true);
  }

  function handleDisableAndClearInputSearch() {
    setOpenInputListBank(false);
    setBankFind('');
    setListBanksFiltered(listBanksOriginal);
    setBankFindSelected(false);
    setOpenInputListBank(true);
    setSelectedItemInput(false);
    setValue('code_bank', '');
  }

  async function handleHandleRegisterAccount(form: FormData) {
    const details = await registerAccountBank(form);
    setUserProvider({ ...userProvider, details });
    navigation.replace(
      'RegistrationsAvailabilitiesPaymentsMethodsProviderStack',
    );
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
                image={
          imageProfile &&
          imageProfile.length > 0 &&
          imageProfile[0].image &&
          imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaRegisterBankAccount>
            <AreaRegisterBankAccountTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Cadastrar conta bancaria</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <IconMaterialCommunity
                      name="bank-plus"
                      size={RFValue(25)}
                      color={theme.colors.main_light}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaRegisterBankAccountTitle>
            <AreaRegisterBankAccountContent
              contentContainerStyle={{ flexGrow: 1 }}
              scrollEnabled
            >
              <SearchAbleDropDownBanks
                placeholder="Selecione um banco"
                onTextChange={handleChangeValuesBankName}
                setItemSelected={handleSelectedBank}
                selectedFindItem={bankFind}
                inputRef={refBank}
                items={listBanksFiltered}
                error={errors.bank && errors.bank.message}
                activeInput={openInputListBank}
                selectedItemInput={selectedItemInput}
                handleEnableInputSearch={handleEnableInputListBankSearch}
                handleDisableAndClearInputSearch={
                  handleDisableAndClearInputSearch
                }
              />
              {!openInputListBank && (
                <>
                  <FormInput
                    type={TextInputTypeEnum.mask}
                    name="branch_number"
                    control={control}
                    placeholder="Número da agencia"
                    error={errors.branch_number && errors.branch_number.message}
                    iconName="home"
                    autoCorrect={false}
                    editable={!isLoading}
                    mask="[0000]"
                    inputRef={refBranchNumber}
                    keyboardType="numeric"
                    onEndEditing={() => refAccountBank.current?.focus()}
                  />
                  <FormInput
                    name="account_number"
                    control={control}
                    placeholder="Número da conta"
                    error={errors.branch_number && errors.branch_number.message}
                    iconName="credit-card"
                    autoCorrect={false}
                    editable={!isLoading}
                    inputRef={refAccountBank}
                    onEndEditing={() => refAccountHolderName.current?.focus()}
                  />
                  <FormInput
                    name="account_holder_name"
                    control={control}
                    placeholder="Nome do titular"
                    error={errors.branch_number && errors.branch_number.message}
                    iconName="user"
                    autoCorrect={false}
                    editable={!isLoading}
                    inputRef={refAccountHolderName}
                    onEndEditing={() => refNameAccountBank.current?.focus()}
                  />

                  <FormInput
                    name="name_account_bank"
                    control={control}
                    placeholder="Descrição da conta"
                    error={
                      errors.name_account_bank &&
                      errors.name_account_bank.message
                    }
                    iconName="tag"
                    autoCorrect={false}
                    editable={!isLoading}
                    inputRef={refNameAccountBank}
                  />
                </>
              )}
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
                  onPress={handleSubmit(handleHandleRegisterAccount)}
                />
              </ButtonIcons>
            </AreaRegisterBankAccountContent>
          </AreaRegisterBankAccount>
        )}
      </Form>
    </Container>
  );
}
