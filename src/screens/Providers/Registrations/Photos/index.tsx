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

import { ButtonIcon } from '../../../../components/ButtonIcon';
import { TextInputTypeEnum } from '../../../../enums/TextInputType.enum';
import { useClientUser } from '../../../../hooks/clientUser';
import { onlyNumbers } from '../../../../utils/validations';

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
  height: Yup.string().min(2).max(7),
  weight: Yup.string().min(2).max(3),
  description: Yup.string().max(100, 'Insira uma descrição valida'),
  ethnicity: Yup.string().max(50, 'Insira uma etnia valida'),
  color_eye: Yup.string().max(50, 'Insira uma cor dos olhos valida'),
});
export function RegistrationsPhotosProvider() {
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
        height: onlyNumbers(String(form.height)),
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
    navigation.replace('SignIn');
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
          imageProfile && imageProfile[0].image && imageProfile[0].image.link
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
                      <Title>Adicionar fotos</Title>
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
            </AreaAppointments>
          </>
        )}
      </Form>
    </Container>
  );
}
