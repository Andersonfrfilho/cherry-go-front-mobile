import React, { useEffect, createRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
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
  ButtonIcons,
} from './styles';
import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { useProviderUser } from '../../../../hooks/providerUser';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { FormInput } from '../../../../components/FormInput';
import { SelectedPicker } from '../../../../components/SelectedPicker';
import { hairColors } from './itens/HairColors';
import { hairNuance } from './itens/HairNuance';
import { hairStyle } from './itens/HairStyle';
import { ethnicityItens } from './itens/Ethnicity';
import { eyeColors } from './itens/EyeColors';
import { ButtonIcon } from '../../../../components/ButtonIcon';
import { TextInputTypeEnum } from '../../../../enums/TextInputType.enum';
import { useClientUser } from '../../../../hooks/clientUser';
import { onlyNumber } from '../../../../utils/onlyNumber';

export interface Focusable {
  focus(): void;
}
interface FormData {
  fantasy_name: string;
  color_hair: string;
  nuance_hair: string;
  style_hair: string;
  height: number;
  weight: number;
  description: string;
  ethnicity: string;
  color_eye: string;
}

const schema = Yup.object().shape({
  fantasy_name: Yup.string().max(50, 'Insira um coloração válida'),
  color_hair: Yup.string().max(30, 'Insira um coloração válida'),
  nuance_hair: Yup.string().max(30, 'Insira uma nuance válida'),
  style_hair: Yup.string().max(30, 'Insira uma estilo válido'),
  height: Yup.string().min(2).max(8),
  weight: Yup.string().min(2).max(6),
  description: Yup.string().max(100, 'Insira uma descrição valida'),
  ethnicity: Yup.string().max(50, 'Insira uma etnia valida'),
  color_eye: Yup.string().max(50, 'Insira uma cor dos olhos valida'),
});
export function RegistrationsDetailsProvider() {
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const [selectedColorHair, setSelectedColorHair] = useState('');
  const [selectedNuanceHair, setSelectedNuanceHair] = useState('');
  const [selectedStyleHair, setSelectedStyleHair] = useState('');
  const [selectedEthnicity, setSelectedEthnicity] = useState('');
  const [selectedColorEye, setSelectedColorEye] = useState('');
  const { updateDetails, userClient } = useClientUser();
  const { userProvider } = useProviderUser();

  const refFantasyName = createRef<Focusable>();
  const refColorHair = createRef<Focusable>();
  const refNuanceHair = createRef<Focusable>();
  const refStyleHair = createRef<Focusable>();
  const refHeight = createRef<Focusable>();
  const refWeight = createRef<Focusable>();
  const refDescription = createRef<Focusable>();
  const refEthnicity = createRef<Focusable>();
  const refColorEye = createRef<Focusable>();

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
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegisterDetails(form: FormData) {
    const details = { ...form };
    await updateDetails({
      details: {
        ...details,
        height: onlyNumber(String(form.height)),
      },
    });
  }

  function handleChangeSelectedColorHair(value: string) {
    setSelectedColorHair(value);
    setValue('color_hair', value);
    clearErrors('color_hair');
    refNuanceHair.current?.focus();
  }

  function handleChangeSelectedNuanceHair(value: string) {
    setSelectedNuanceHair(value);
    setValue('nuance_hair', value);
    clearErrors('nuance_hair');
    refStyleHair.current?.focus();
  }

  function handleChangeSelectedStyleHair(value: string) {
    setSelectedStyleHair(value);
    setValue('style_hair', value);
    clearErrors('style_hair');
    refHeight.current?.focus();
  }

  function handleChangeSelectedEthnicity(value: string) {
    setSelectedEthnicity(value);
    setValue('ethnicity', value);
    clearErrors('ethnicity');
    refColorEye.current?.focus();
  }

  function handleChangeSelectedColorEye(value: string) {
    setSelectedColorEye(value);
    setValue('color_eye', value);
    clearErrors('color_eye');
  }

  function handleBack() {
    navigation.replace('HomeProviderStack');
  }

  useEffect(() => {
    if (userClient.details) {
      if (userClient.details.fantasy_name) {
        setValue('fantasy_name', userClient.details.fantasy_name);
      }
      if (userClient.details.color_hair) {
        setValue('color_hair', userClient.details.color_hair);
        setSelectedColorHair(userClient.details.color_hair);
      }
      if (userClient.details.nuance_hair) {
        setValue('nuance_hair', userClient.details.nuance_hair);
        setSelectedNuanceHair(userClient.details.nuance_hair);
      }
      if (userClient.details.style_hair) {
        setValue('style_hair', userClient.details.style_hair);
        setSelectedStyleHair(userClient.details.style_hair);
      }
      if (userClient.details.height) {
        setValue('height', userClient.details.height);
      }
      if (userClient.details.weight) {
        setValue('weight', userClient.details.weight);
      }
      if (userClient.details.description) {
        setValue('description', userClient.details.description);
      }
      if (userClient.details.ethnicity) {
        setValue('ethnicity', userClient.details.ethnicity);
        setSelectedEthnicity(userClient.details.ethnicity);
      }
      if (userClient.details.color_eye) {
        setValue('color_eye', userClient.details.color_eye);
        setSelectedColorEye(userClient.details.color_eye);
      }
    } else {
      refFantasyName.current?.focus();
    }
  }, []);

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
          <>
            <AreaAppointments>
              <AreaAppointmentTitle>
                {appError && appError.message ? (
                  <AreaTitle>
                    <WarningText title={appError.message} />
                  </AreaTitle>
                ) : (
                  <>
                    <AreaTitle>
                      <Title>Detalhes adicionais</Title>
                    </AreaTitle>
                    <AreaIcon>
                      <Icon
                        name="calendar"
                        size={RFValue(25)}
                        color={theme.colors.white_medium}
                      />
                    </AreaIcon>
                  </>
                )}
              </AreaAppointmentTitle>
              <AreaAppointmentContent>
                <FormInput
                  name="fantasy_name"
                  control={control}
                  placeholder="Nome fantasia"
                  error={errors.fantasy_name && errors.fantasy_name.message}
                  iconName="tag"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  editable={!isLoading}
                  maxLength={50}
                  inputRef={refFantasyName}
                  onSubmitEditing={() => refColorHair.current?.focus()}
                />
                <SelectedPicker
                  title="Selecione a cor do cabelo"
                  items={hairColors}
                  selected={selectedColorHair}
                  setSelected={handleChangeSelectedColorHair}
                  error={errors.color_hair && errors.color_hair.message}
                  selectedRef={refColorHair}
                  enabled={!isLoading}
                />
                <SelectedPicker
                  title="Selecione a nuance do cabelo"
                  items={hairNuance}
                  selected={selectedNuanceHair}
                  setSelected={handleChangeSelectedNuanceHair}
                  error={errors.nuance_hair && errors.nuance_hair.message}
                  selectedRef={refNuanceHair}
                  enabled={!isLoading}
                />
                <SelectedPicker
                  title="Selecione o estilo do cabelo"
                  items={hairStyle}
                  selected={selectedStyleHair}
                  setSelected={handleChangeSelectedStyleHair}
                  error={errors.style_hair && errors.style_hair.message}
                  selectedRef={refStyleHair}
                  enabled={!isLoading}
                />
                <FormInput
                  name="height"
                  type={TextInputTypeEnum.mask}
                  control={control}
                  placeholder="Altura"
                  error={errors.height && errors.height.message}
                  iconName="arrow-up"
                  keyboardType="numeric"
                  mask="[000] (cm)"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  editable={!isLoading}
                  maxLength={50}
                  inputRef={refHeight}
                  onSubmitEditing={() => refWeight.current?.focus()}
                />
                <FormInput
                  name="weight"
                  control={control}
                  placeholder="Peso"
                  error={errors.weight && errors.weight.message}
                  iconName="arrow-right"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  keyboardType="numeric"
                  editable={!isLoading}
                  maxLength={50}
                  inputRef={refWeight}
                  onSubmitEditing={() => refDescription.current?.focus()}
                />
                <FormInput
                  name="description"
                  control={control}
                  placeholder="Descrição livre"
                  error={errors.description && errors.description.message}
                  iconName="file-text"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  editable={!isLoading}
                  maxLength={50}
                  inputRef={refDescription}
                  onSubmitEditing={() => refEthnicity.current?.focus()}
                />
                <SelectedPicker
                  title="Selecione uma etnia"
                  items={ethnicityItens}
                  selected={selectedEthnicity}
                  setSelected={handleChangeSelectedEthnicity}
                  error={errors.ethnicity && errors.ethnicity.message}
                  selectedRef={refEthnicity}
                  enabled={!isLoading}
                />
                <SelectedPicker
                  title="Selecione tons dos olhos"
                  items={eyeColors}
                  selected={selectedColorEye}
                  setSelected={handleChangeSelectedColorEye}
                  error={errors.color_eye && errors.color_eye.message}
                  selectedRef={refColorEye}
                  enabled={!isLoading}
                />
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
                    onPress={handleSubmit(handleRegisterDetails)}
                  />
                </ButtonIcons>
              </AreaAppointmentContent>
            </AreaAppointments>
          </>
        )}
      </Form>
    </Container>
  );
}
