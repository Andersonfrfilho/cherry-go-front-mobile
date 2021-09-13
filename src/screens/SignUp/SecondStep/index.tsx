import React, { useState, createRef, useEffect } from 'react';
import * as Yup from 'yup';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
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
import { SelectedPicker } from '../../../components/SelectedPicker';
import { TextInputTypeEnum } from '../../../enums/TextInputType.enum';
import { useClientUser } from '../../../hooks/clientUser';
import { appErrorVerifyError } from '../../../errors/appErrorVerify';
import {
  formattedDate,
  removeCharacterSpecial,
} from '../../../utils/validations';
import { GENDER_ENUM } from '../../../enums/genderType.enum';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';
import {
  UserClientAddressRegisterDTO,
  UserClientRegisterDTO,
} from '../../../hooks/dtos';
import { Focusable } from '../FirstStep';
import { ibgeApi } from '../../../services/ibge';
import { SearchAbleDropDown } from '../../../components/SearchAbleDropDown';
import { api } from '../../../services/api';

interface StateInterface {
  value: string;
  label: string;
  id: string;
}
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
  zipcode: Yup.string()
    .length(10, 'Cep inválido')
    .required('Cep é obrigatório'),
  street: Yup.string()
    .max(100, 'Descrição de endereço muito longa')
    .required('Endereço obrigatório'),
  number: Yup.string()
    .max(6, 'Digite um número valido')
    .required('Número é obrigatório'),
  district: Yup.string()
    .max(100, 'Descrição de bairro muito longa')
    .required('Bairro é obrigatório'),
  state: Yup.string().required('Selecione um estado'),
  complement: Yup.string().max(30, 'Descrição de complemento muito longa'),
  reference: Yup.string().max(30, 'Descrição de referencia muito longa'),
});

export function SignUpSecondStep() {
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
  const [states, setStates] = useState([
    {
      id: '',
      value: '',
      label: 'Selecione seu estado',
    } as StateInterface,
  ]);
  const [stateSelected, setStateSelected] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [cityFind, setCityFind] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [foundCep, setFoundCep] = useState(false);

  const refZipCode = createRef<Focusable>();
  const refAddress = createRef<Focusable>();
  const refNumber = createRef<Focusable>();
  const refDistrict = createRef<Focusable>();
  const refCity = createRef<Focusable>();
  const refState = createRef<Focusable>();
  const refComplement = createRef<Focusable>();
  const refReference = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading, setIsLoading, appError, setAppError } = useCommon();
  const { registerAddressClient, userClient } = useClientUser();
  const navigation = useNavigation<ScreenNavigationProp>();

  async function handleRegisterAddress(form: FormData) {
    setIsLoading(true);
    setAppError({});

    try {
      await registerAddressClient({
        ...form,
        zipcode: removeCharacterSpecial(form.zipcode),
        user_id: userClient && userClient.id,
        country: 'brazil',
      });
      navigation.navigate('SignUpThirdStep');
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

  function handleChangeValuesCityName(value: string) {
    setCityFind(value);
  }
  function handleSetCity(value: string) {
    setCityFind(value);
    setFilteredCities([]);
  }
  async function handleSelectState(value: string) {
    setIsLoading(true);
    try {
      const state = states.find(stateParam => stateParam.value === value);
      if (!state) {
        setAppError(appErrorVerifyError({ status_code: 'app', code: '0002' }));
        return;
      }

      setStateSelected(value);
      const { data: citiesIbge } = await ibgeApi.get<
        { sigla: string; nome: string }[]
      >(`/localidades/estados/${state.id}/municipios`);
      const citiesFormatted = citiesIbge.map(cityParam => cityParam.nome);

      setCities(citiesFormatted);
      setFilteredCities(citiesFormatted);
      refCity.current?.focus();
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFindCep() {
    setIsLoading(true);
    setSubTitle('Buscando cep 👀 ...');
    const cep = removeCharacterSpecial(getValues('zipcode'));

    try {
      const { data: address } = await axios.get(
        `https://ws.apicep.com/cep.json?code=${cep}`,
      );
      setValue('street', address.address);
      setValue('city', address.city);
      setValue('district', address.district);
      setValue('state', address.state);
      setStateSelected(address.state);
      setCityFind(address.city);
      setSubTitle('');
      setFoundCep(true);
    } catch (error) {
      setFoundCep(false);
      setSubTitle(`Cep não encontrado 🤔 \n vai ter que digitar seu endereço`);
    } finally {
      setIsLoading(false);
    }
  }
  function handleNumberOnEndEditing() {
    if (
      getValues('street') &&
      getValues('district') &&
      getValues('state') &&
      getValues('city')
    ) {
      refComplement.current?.focus();
      return;
    }
    refDistrict.current?.focus();
  }
  useEffect(() => {
    async function getInformationLocation() {
      setIsLoading(true);
      try {
        const { data: statesIbge } = await ibgeApi.get<
          { sigla: string; nome: string; id: string }[]
        >('/localidades/estados');

        const statesFormatted = statesIbge
          .map(state => ({
            id: state.id,
            value: state.sigla,
            label: state.nome,
          }))
          .sort((a, b) => {
            if (a.label < b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            return 0;
          });
        setStates([
          {
            id: '',
            value: '',
            label: 'Selecione seu estado',
          },
          ...statesFormatted,
        ]);
      } catch (error) {
        setAppError(appErrorVerifyError(error));
      } finally {
        setIsLoading(false);
      }
    }
    getInformationLocation();
    refZipCode.current?.focus();
  }, []);

  useEffect(() => {
    if (cityFind.length === 0) {
      setFilteredCities(cities);
    } else {
      const citiesFound = cities.filter((cityParam: string) =>
        cityParam.toLowerCase().includes(cityFind.toLowerCase()),
      );
      setFilteredCities(citiesFound);
    }
  }, [cityFind]);

  useEffect(() => {
    if (getValues('zipcode') && foundCep) {
      refNumber.current?.focus();
    } else if (getValues('zipcode')) {
      refAddress.current?.focus();
    }
  }, [foundCep]);
  console.log(errors);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <Header>
          <AreaTitle>
            <Title>Vincular endereço</Title>
            {!!subTitle && <SubTitle>{subTitle}</SubTitle>}
            {appError && appError.message && (
              <WarningText title={appError.message} />
            )}
          </AreaTitle>
        </Header>
        <Form>
          <FormInput
            type={TextInputTypeEnum.mask}
            name="zipcode"
            control={control}
            placeholder="CEP"
            error={errors.zipcode && errors.zipcode.message}
            iconName="navigation"
            autoCorrect={false}
            editable={!isLoading}
            mask="[00].[000]-[000]"
            inputRef={refZipCode}
            keyboardType="numeric"
            onEndEditing={handleFindCep}
          />

          <FormInput
            name="street"
            control={control}
            placeholder="Rua"
            error={errors.street && errors.street.message}
            iconName="map-pin"
            iconColor={theme.colors.success_chateau}
            autoCorrect={false}
            editable={!isLoading}
            inputRef={refAddress}
            onEndEditing={() => refNumber.current?.focus()}
            maxLength={100}
          />
          <FormInput
            name="number"
            control={control}
            placeholder="Número"
            error={errors.number && errors.number.message}
            iconName="hash"
            iconColor={theme.colors.success_chateau}
            autoCorrect={false}
            editable={!isLoading}
            inputRef={refNumber}
            keyboardType="numeric"
            onEndEditing={() => handleNumberOnEndEditing()}
            maxLength={6}
          />
          <FormInput
            name="district"
            control={control}
            placeholder="Bairro"
            error={errors.district && errors.district.message}
            iconName="map-pin"
            iconColor={theme.colors.success_chateau}
            autoCorrect={false}
            editable={!isLoading}
            inputRef={refDistrict}
            onEndEditing={() => refState.current?.focus()}
            maxLength={100}
          />
          <SelectedPicker
            title="Selecione seu estado"
            items={states}
            selected={stateSelected}
            setSelected={handleSelectState}
            error={errors.genre && errors.genre.message}
            selectedRef={refState}
            enabled={!isLoading}
          />
          <SearchAbleDropDown
            placeholder="Selecione sua cidade"
            onTextChange={handleChangeValuesCityName}
            setItemSelected={handleSetCity}
            selectedFindItem={cityFind}
            inputRef={refCity}
            items={filteredCities}
            error={errors.city && errors.city.message}
          />
          <FormInput
            name="complement"
            control={control}
            placeholder="Complemento"
            error={errors.complement && errors.complement.message}
            iconName="home"
            iconColor={theme.colors.success_chateau}
            editable={!isLoading}
            inputRef={refComplement}
            onEndEditing={() => refReference.current?.focus()}
            maxLength={30}
          />
          <FormInput
            name="reference"
            control={control}
            placeholder="Referencia"
            error={errors.reference && errors.reference.message}
            iconName="info"
            iconColor={theme.colors.success_chateau}
            editable={!isLoading}
            inputRef={refReference}
            maxLength={30}
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
