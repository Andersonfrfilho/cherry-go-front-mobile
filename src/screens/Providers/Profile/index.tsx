import React, { createRef, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as Yup from 'yup';
import {
  AreaFormUpdate,
  AreaIcon,
  AreaPhotoUpdate,
  Container,
  ContentUpdateProfile,
  Icon,
  ProfileImage,
} from './styles';

import { useCommon } from '../../../hooks/common';
import { ScreenNavigationProp } from '../../../routes';
import { useProviderUser } from '../../../hooks/providerUser';
import { useError } from '../../../hooks/error';
import { ModalCamera } from '../../../components/ModalCamera';
import { useClientUser } from '../../../hooks/clientUser';
import { FormInput } from '../../../components/FormInput';
import { Button } from '../../../components/Button';

export interface Focusable {
  focus(): void;
}

interface FormData {
  name: string;
  duration: number;
  amount: number;
  tags: string[];
}

const schema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Insira um nome válido')
    .required('nome é requerido')
    .lowercase(),
  last_name: Yup.number()
    .max(1440, 'O maximo são 1440 minutos')
    .min(30, 'O minimo são 30 minutos')
    .required('duração é requerido'),
  email: Yup.number()
    .max(999999999, 'O valor maximo é 9.999.999,99')
    .required('valor é requerido'),
});

export function ProviderProfile() {
  const [modalCamView, setModalCamView] = useState<boolean>(false);
  const [changeProfile, setChangeProfile] = useState<boolean>(false);
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { uploadUserClientImageProfile, updateProfile } = useClientUser();
  const { userProvider, loadUserData } = useProviderUser();

  const refName = createRef<Focusable>();
  const refLastName = createRef<Focusable>();
  const refEmail = createRef<Focusable>();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    id,
    last_name: lastName,
    image_profile: imageProfile,
    phones,
    email,
  } = userProvider;

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

  useEffect(() => {
    setAppError({});
    loadUserData();
  }, []);
  function handleOpenCameraModal() {
    setModalCamView(true);
  }
  function handleCloseModalCameraView() {
    setModalCamView(false);
  }
  async function handleSendImage(image: string) {
    await uploadUserClientImageProfile({ image_uri: image, user_id: id });
  }
  async function handleUpdateInfoProfile(form: FormData) {
    await updateProfile({ ...form });
  }

  function verifyValues() {
    const nameForm = getValues('name');
    const last_name = getValues('last_name');
    const emailForm = getValues('email');
    setChangeProfile(
      nameForm !== name || lastName !== last_name || email !== emailForm,
    );
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <ModalCamera
        modalVisible={modalCamView}
        handleClosedModal={handleCloseModalCameraView}
        handleSendImage={handleSendImage}
      />
      <ContentUpdateProfile>
        <AreaPhotoUpdate>
          <ProfileImage
            source={{
              uri:
                imageProfile &&
                imageProfile[0].image &&
                imageProfile[0].image.link,
            }}
            resizeMode="cover"
          />
          <AreaIcon onPress={handleOpenCameraModal}>
            <Icon
              name="edit"
              size={RFValue(23)}
              color={theme.colors.background_primary}
            />
          </AreaIcon>
        </AreaPhotoUpdate>
        <AreaFormUpdate>
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
            onEndEditing={() => {
              refLastName.current?.focus();
              verifyValues();
            }}
          />
          <FormInput
            name="lastname"
            control={control}
            placeholder="Nome"
            error={errors.name && errors.name.message}
            iconName="tag"
            autoCorrect={false}
            autoCapitalize="sentences"
            editable={!isLoading}
            maxLength={50}
            inputRef={refLastName}
            onEndEditing={() => {
              refEmail.current?.focus();
              verifyValues();
            }}
          />
          <FormInput
            name="email"
            control={control}
            placeholder="Nome"
            error={errors.name && errors.name.message}
            iconName="tag"
            autoCorrect={false}
            autoCapitalize="sentences"
            editable={!isLoading}
            maxLength={50}
            inputRef={refEmail}
            onEndEditing={() => verifyValues()}
          />
          {changeProfile && (
            <Button
              onPress={handleSubmit(handleUpdateInfoProfile)}
              title="salvar"
            />
          )}
        </AreaFormUpdate>
      </ContentUpdateProfile>
    </Container>
  );
}
