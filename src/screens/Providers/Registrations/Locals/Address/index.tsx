import React, { createRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  AreaAppointmentTitle,
  AreaAppointments,
  AreaAppointmentContent,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaIcon,
  IconCommunityIcons,
  AreaMapView,
  MapViewComponent,
  AreaFormInputs,
  AreaButtonModalMap,
  ButtonIcons,
  AreaLoadingLocal,
  AreaCitySelected,
  AreaCityIcon,
  AreaTextCitySelected,
  TextCitySelected,
} from './styles';
import { useCommon } from '../../../../../hooks/common';
import { WarningText } from '../../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../../routes';
import { HeaderProfile } from '../../../../../components/HeaderProfile';
import {
  Appointment,
  useProviderUser,
} from '../../../../../hooks/providerUser';
import { Load } from '../../../../../components/Load';
import { useError } from '../../../../../hooks/error';
import { FormInput } from '../../../../../components/FormInput';
import { TextInputTypeEnum } from '../../../../../enums/TextInputType.enum';
import { SelectedPicker } from '../../../../../components/SelectedPicker';
import { removeCharacterSpecial } from '../../../../../utils/validations';
import { ButtonIcon } from '../../../../../components/ButtonIcon';
import { api } from '../../../../../services/api';
import { useAddress } from '../../../../../hooks/address';
import { ModalSelectItens } from '../../../../../components/ModalSelectItens';
import { ModalMapView } from '../../../../../components/ModalMapView';
import { useLocal } from '../../../../../hooks/local';

interface FormData {
  zipcode: string;
  street: string;
  number: string;
  district: string;
  state: string;
  complement: string;
  reference: string;
  country: string;
  amount: string;
}
interface StateInterface {
  value: string;
  label: string;
}

export interface Focusable {
  focus(): void;
}

const schema = Yup.object().shape({
  zipcode: Yup.string()
    .min(8, 'Cep inválido')
    .max(10, 'Cep inválido')
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
  amount: Yup.string().min(1).max(9999999, 'Descrição de valor invalida'),
  latitude: Yup.string().optional(),
  longitude: Yup.string().optional(),
});

export function RegistrationsAvailabilitiesAddressesProvider() {
  const [stateSelected, setStateSelected] = useState('');
  const [stateListSelected, setStateListSelected] = useState<StateInterface[]>([
    {
      value: '',
      label: 'Selecione seu estado',
    },
  ] as StateInterface[]);

  const [loadingLocal, setLoadingLocal] = useState(false);
  const [openModalSelectedCities, setOpenModalSelectedCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [cityValue, setCityValue] = useState('');
  const [openModalMapView, setOpenModalMapView] = useState(false);

  const theme = useTheme();

  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const {
    cities,
    states,
    getAllStates,
    getCitiesByState,
    address,
    loadingAddress,
  } = useAddress();
  const { registerLocalProvider } = useLocal();
  const { userProvider, loadUserData } = useProviderUser();
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const refZipCode = createRef<Focusable>();
  const refStreet = createRef<Focusable>();
  const refNumber = createRef<Focusable>();
  const refDistrict = createRef<Focusable>();
  const refCity = createRef<Focusable>();
  const refState = createRef<Focusable>();
  const refComplement = createRef<Focusable>();
  const refReference = createRef<Focusable>();
  const refAmount = createRef<Focusable>();

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      loadUserData();
      getAllStates();
    }
    return () => {
      // problemas com warning de unmount
      unmounted = true;
      setStateSelected('');
      setStateListSelected([
        {
          value: '',
          label: 'Selecione seu estado',
        },
      ] as StateInterface[]);

      setLoadingLocal(false);
      setOpenModalSelectedCities(false);
      setSelectedCity(false);
      setCityValue('');
      setOpenModalMapView(false);
    };
  }, []);

  useEffect(() => {
    if (!!stateListSelected.length && stateListSelected.length > 0) {
      const stateFormatted = states.map(state => ({
        value: state.sigla,
        label: state.nome,
      }));
      setStateListSelected([
        {
          value: '',
          label: 'Selecione seu estado',
        },
        ...stateFormatted,
      ]);
    }
  }, [states]);

  function handleBack() {
    navigation.navigate('SignIn');
  }

  async function handleSelectState(value: string) {
    setStateSelected(value);
    await getCitiesByState(value);
    refCity.current?.focus();
  }

  async function handleFindCep() {
    setLoadingLocal(true);
    const cep = removeCharacterSpecial(getValues('zipcode'));

    try {
      const { data: addressResult } = await api.post(
        '/v1/users/addresses/cep',
        {
          cep,
        },
      );

      setValue('street', addressResult.street);
      setValue('city', addressResult.city);
      setValue('district', addressResult.district);
      setValue('state', addressResult.state);
      setStateSelected(addressResult.state);
      setCityValue(addressResult.city);
    } finally {
      setLoadingLocal(false);
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

  function handleOpenModalSelectedCities() {
    setOpenModalSelectedCities(true);
  }
  function handleClosedModalSelectedCities() {
    setOpenModalSelectedCities(false);
  }
  function handleSelectedCity(value: string) {
    setSelectedCity(true);
    setOpenModalSelectedCities(false);
    setValue('city', value);
    setCityValue(value);
  }

  function handleClearCity() {
    setSelectedCity(false);
    setValue('city', '');
    setCityValue('');
  }

  async function handleRegisterAddressProvider(form: FormData) {
    setIsLoading(true);
    setAppError({});
    try {
      await registerLocalProvider({
        ...form,
        zipcode: removeCharacterSpecial(form.zipcode),
        country: 'br',
        amount: Number(removeCharacterSpecial(form.amount)),
      });
      navigation.replace('RegistrationsAvailabilitiesLocalsProviderStack');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenModalMapView() {
    setOpenModalMapView(true);
  }

  function handleClosedModalMapView() {
    setOpenModalMapView(false);
  }

  useEffect(() => {
    setValue('country', 'BR');
    if (address) {
      if (address.latitude) {
        setValue('latitude', address.latitude);
      }
      if (address.longitude) {
        setValue('longitude', address.longitude);
      }
      if (address.zipcode) {
        setValue('zipcode', address.zipcode);
      }

      if (address.number) {
        setValue('number', address.number);
      }

      if (address.street) {
        setValue('street', address.street);
      }

      if (address.district) {
        setValue('district', address.district);
      }

      if (address.state) {
        const stateShort = stateListSelected.find(
          state => state.label.toLowerCase() === address.state.toLowerCase(),
        )?.value;
        if (stateShort) {
          setValue('state', stateShort);
          setStateSelected(stateShort);
        }
      }

      if (address.city) {
        setValue('city', address.city);
        setCityValue(address.city);
      }

      if (
        address.zipcode &&
        address.number &&
        address.street &&
        address.number &&
        address.district &&
        address.state &&
        address.city
      ) {
        refComplement.current?.focus();
        return;
      }

      if (!address.zipcode) {
        refZipCode.current?.focus();
        return;
      }

      if (!address.number) {
        refNumber.current?.focus();
        return;
      }

      if (!address.street) {
        refStreet.current?.focus();
        return;
      }

      if (!address.district) {
        refDistrict.current?.focus();
        return;
      }

      if (!address.state) {
        refState.current?.focus();
        return;
      }

      if (!address.city) {
        refCity.current?.focus();
        return;
      }
    }
  }, [address]);

  return (
    <Container>
      <ModalSelectItens
        modalVisible={openModalSelectedCities}
        handleClosedModal={handleClosedModalSelectedCities}
        handleSelectedItem={handleSelectedCity}
        itens={cities}
        titleWithoutItens="Não há itens"
        selected={selectedCity}
      />
      <ModalMapView
        modalVisible={openModalMapView}
        handleClosedModal={handleClosedModalMapView}
      />
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
        image={
          imageProfile && imageProfile[0].image && imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaAppointments>
            <AreaAppointmentTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Cadastrar Local</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <IconCommunityIcons
                      name="map-marker-radius-outline"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaAppointmentTitle>
            <AreaAppointmentContent>
              <Form>
                <AreaButtonModalMap onPress={handleOpenModalMapView}>
                  <AreaIcon>
                    <IconCommunityIcons
                      name="map"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                  <AreaTitle>
                    <Title>Abrir Mapa</Title>
                  </AreaTitle>
                  {(loadingAddress || loadingLocal) && (
                    <AreaLoadingLocal>
                      <Load />
                    </AreaLoadingLocal>
                  )}
                </AreaButtonModalMap>
                <AreaFormInputs>
                  <FormInput
                    type={TextInputTypeEnum.mask}
                    name="zipcode"
                    control={control}
                    placeholder="CEP"
                    error={errors.zipcode && errors.zipcode.message}
                    iconName="navigation"
                    autoCorrect={false}
                    editable={!loadingLocal && !isLoading && !loadingAddress}
                    mask="[00].[000]-[000]"
                    inputRef={refZipCode}
                    keyboardType="numeric"
                    onEndEditing={handleFindCep}
                    percentWidth={58}
                  />
                  <FormInput
                    name="number"
                    control={control}
                    placeholder="Número"
                    error={errors.number && errors.number.message}
                    iconName="hash"
                    iconColor={theme.colors.success_chateau}
                    autoCorrect={false}
                    editable={!loadingLocal && !isLoading && !loadingAddress}
                    inputRef={refNumber}
                    keyboardType="numeric"
                    onEndEditing={() => handleNumberOnEndEditing()}
                    maxLength={6}
                    percentWidth={40}
                  />
                </AreaFormInputs>
                <FormInput
                  name="street"
                  control={control}
                  placeholder="Rua"
                  error={errors.street && errors.street.message}
                  iconName="map-pin"
                  iconColor={theme.colors.success_chateau}
                  autoCorrect={false}
                  editable={!loadingLocal && !isLoading && !loadingAddress}
                  inputRef={refStreet}
                  onEndEditing={() => refNumber.current?.focus()}
                  maxLength={100}
                />

                <FormInput
                  name="district"
                  control={control}
                  placeholder="Bairro"
                  error={errors.district && errors.district.message}
                  iconName="map-pin"
                  iconColor={theme.colors.success_chateau}
                  autoCorrect={false}
                  editable={!loadingLocal && !isLoading && !loadingAddress}
                  inputRef={refDistrict}
                  onEndEditing={() => refState.current?.focus()}
                  maxLength={100}
                />
                <SelectedPicker
                  title="Selecione seu estado"
                  items={stateListSelected}
                  selected={stateSelected}
                  setSelected={handleSelectState}
                  error={errors.genre && errors.genre.message}
                  selectedRef={refState}
                  enabled={!loadingLocal && !isLoading && !loadingAddress}
                />
                <AreaCitySelected
                  onPress={handleOpenModalSelectedCities}
                  disabled={
                    !stateSelected ||
                    !!cityValue ||
                    loadingAddress ||
                    loadingLocal ||
                    isLoading
                  }
                  selected={!!cityValue}
                  error={errors.city && errors.city.message}
                >
                  <AreaCityIcon
                    direction="left"
                    selected={!!cityValue}
                    error={errors.city && errors.city.message}
                    disabled
                  >
                    <IconCommunityIcons
                      name="home-city-outline"
                      size={RFValue(25)}
                      color={
                        cityValue
                          ? theme.colors.background_primary
                          : theme.colors.white_medium
                      }
                    />
                  </AreaCityIcon>
                  <AreaTextCitySelected
                    error={errors.city && errors.city.message}
                    selected={!!cityValue}
                  >
                    <TextCitySelected
                      color={
                        cityValue
                          ? theme.colors.background_primary
                          : theme.colors.white_medium
                      }
                    >
                      {cityValue || 'Selecione a cidade'}
                    </TextCitySelected>
                  </AreaTextCitySelected>
                  <AreaCityIcon
                    direction="right"
                    selected={!!cityValue}
                    error={errors.city && errors.city.message}
                    disabled={!cityValue}
                    onPress={handleClearCity}
                  >
                    <Icon
                      name={cityValue ? 'x' : 'search'}
                      size={RFValue(25)}
                      color={theme.colors.background_primary}
                    />
                  </AreaCityIcon>
                </AreaCitySelected>
                <FormInput
                  name="complement"
                  control={control}
                  placeholder="Complemento"
                  error={errors.complement && errors.complement.message}
                  iconName="home"
                  iconColor={theme.colors.success_chateau}
                  editable={!loadingLocal && !isLoading && !loadingAddress}
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
                  editable={!loadingLocal && !isLoading && !loadingAddress}
                  inputRef={refReference}
                  onEndEditing={() => refAmount.current?.focus()}
                  maxLength={30}
                />
                <FormInput
                  type={TextInputTypeEnum.money}
                  name="amount"
                  control={control}
                  placeholder="Valor R$"
                  error={errors.amount && errors.amount.message}
                  iconName="dollar-sign"
                  iconColor={theme.colors.success_chateau}
                  editable={!loadingLocal && !isLoading && !loadingAddress}
                  inputRef={refAmount}
                />

                <ButtonIcons>
                  <ButtonIcon
                    iconPosition="left"
                    iconName="x-circle"
                    title="Cancelar"
                    disabled={loadingLocal && isLoading && loadingAddress}
                    loading={loadingLocal || isLoading || loadingAddress}
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
                    disabled={loadingLocal && isLoading && loadingAddress}
                    loading={loadingLocal || isLoading || loadingAddress}
                    titleSize={20}
                    onPress={handleSubmit(handleRegisterAddressProvider)}
                  />
                </ButtonIcons>
              </Form>
            </AreaAppointmentContent>
          </AreaAppointments>
        )}
      </Form>
    </Container>
  );
}
