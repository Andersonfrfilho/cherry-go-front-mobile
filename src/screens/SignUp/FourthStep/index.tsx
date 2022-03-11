import React, { useState, useRef } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Camera,
  CameraCapturedPicture,
  CameraPictureOptions,
} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  AreaTitle,
  Title,
  AreaOptionsButtonsCam,
  AreaOptions,
  SubTitle,
  AreaCamera,
  AreaButton,
  ImagePreview,
  Cam,
  Icon,
  AreaImagePreviewIcon,
  AreaImagePreview,
  AreaButtons,
  AreaButtonIcon,
  AreaButtonsCam,
} from './styles';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useCommon } from '../../../hooks/common';
import { useClientUser } from '../../../hooks/clientUser';
import { Load } from '../../../components/Load';
import { WarningText } from '../../../components/WarningText';
import { ButtonOnlyIcon } from '../../../components/ButtonOnlyIcon';
import { api } from '../../../services/api';
import { USER_DOCUMENT_VALUE_ENUM } from '../../../enums/UserDocumentValue.enum';
import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';

export interface TakePicture {
  takePictureAsync(
    options?: CameraPictureOptions,
  ): Promise<CameraCapturedPicture>;
  pausePreview(): void;
  resumePreview(): void;
}

export function SignUpFourthStep() {
  const [subTitle, setSubTitle] = useState(
    'Retire uma foto de seu documento frente',
  );
  const [isPreview, setIsPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [flashMode, setFlashMode] = React.useState('off');

  const cameraRef = useRef<TakePicture>();
  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();
  const { userClient, uploadUserClientImageDocument } = useClientUser();

  const navigation = useNavigation<ScreenNavigationProp>();

  function handleBack() {
    navigation.replace('AuthRoutes');
  }

  function handleBackCam() {
    setIsPreview(false);
    setImagePreview('');
    cameraRef.current?.resumePreview();
  }

  async function handleImageSelect() {
    setIsLoading(true);
    setAppError({});
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
        base64: true,
      });

      if (result.cancelled) {
        return;
      }

      if (result.uri) {
        setImagePreview(result.uri);
        setIsPreview(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCaptureDocumentFront() {
    setIsLoading(true);
    setAppError({});
    try {
      if (cameraRef.current) {
        const options = { quality: 0.7, base64: true };
        const data = await cameraRef.current?.takePictureAsync(options);

        const source = data.uri;
        if (source) {
          setImagePreview(source);
          cameraRef.current.pausePreview();
          setIsPreview(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendImage(imageUri: string) {
    setIsLoading(true);
    setAppError({});

    try {
      await uploadUserClientImageDocument({
        image_uri: imageUri,
        user_id:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
        description: USER_DOCUMENT_VALUE_ENUM.FRONT,
      });
      navigation.replace('SignUpFifthStep');
    } finally {
      setIsLoading(false);
    }
  }
  async function handleFlashOnOff(stateFlash: 'on' | 'off') {
    setFlashMode(stateFlash);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <AreaTitle>
          <Title>Documento</Title>
          {!!subTitle && !appError.message && <SubTitle>{subTitle}</SubTitle>}
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaTitle>
      </Header>
      <AreaCamera>
        {isPreview && (
          <AreaImagePreviewIcon>
            <AreaImagePreview>
              <ImagePreview source={{ uri: imagePreview }} />
            </AreaImagePreview>
            <AreaButtons>
              <AreaButtonIcon>
                <AreaButton
                  onPress={handleBackCam}
                  color={
                    isLoading
                      ? theme.colors.shape_dark
                      : theme.colors.red_ku_crimson
                  }
                  disabled={isLoading}
                >
                  <Icon
                    name="x"
                    size={RFValue(30)}
                    color={theme.colors.main_light}
                  />
                </AreaButton>
              </AreaButtonIcon>
              <AreaButtonIcon>
                <AreaButton
                  onPress={() => handleSendImage(imagePreview)}
                  color={
                    isLoading
                      ? theme.colors.shape_dark
                      : theme.colors.spring_green
                  }
                  disabled={isLoading}
                >
                  <Icon
                    name="send"
                    size={RFValue(30)}
                    color={theme.colors.main_light}
                  />
                </AreaButton>
              </AreaButtonIcon>
            </AreaButtons>
          </AreaImagePreviewIcon>
        )}
        {!isPreview && (
          <Cam
            type={Camera.Constants.Type.back}
            ref={cameraRef}
            flashMode={Camera.Constants.FlashMode.on}
          >
            <AreaOptionsButtonsCam>
              <AreaOptions>
                <AreaButtonsCam>
                  <AreaButtonIcon />
                  <AreaButtonIcon />
                  <AreaButtonIcon>
                    <AreaButton
                      disabled={isLoading}
                      onPress={() => {
                        handleFlashOnOff(flashMode === 'on' ? 'off' : 'on');
                      }}
                      color={
                        isLoading
                          ? theme.colors.shape_dark
                          : theme.colors.white_medium
                      }
                    >
                      <Icon
                        style={{ transform: [{ rotate: '15deg' }] }}
                        name="zap"
                        size={RFValue(30)}
                        color={theme.colors.yellow_orange}
                      />
                    </AreaButton>
                  </AreaButtonIcon>
                </AreaButtonsCam>
              </AreaOptions>
            </AreaOptionsButtonsCam>
            <AreaButtonsCam>
              <AreaButtonIcon>
                <AreaButton
                  onPress={handleBack}
                  color={
                    isLoading
                      ? theme.colors.shape_dark
                      : theme.colors.red_ku_crimson
                  }
                  disabled={isLoading}
                >
                  <Icon
                    name="x"
                    size={RFValue(40)}
                    color={theme.colors.main_light}
                  />
                </AreaButton>
              </AreaButtonIcon>
              <AreaButtonIcon>
                <AreaButton
                  onPress={handleImageSelect}
                  color={
                    isLoading
                      ? theme.colors.shape_dark
                      : theme.colors.yellow_own
                  }
                  disabled={isLoading}
                >
                  <Icon
                    name="folder"
                    size={RFValue(40)}
                    color={theme.colors.main_light}
                  />
                </AreaButton>
              </AreaButtonIcon>
              <AreaButtonIcon>
                <AreaButton
                  disabled={isLoading}
                  onPress={handleCaptureDocumentFront}
                  color={
                    isLoading ? theme.colors.shape_dark : theme.colors.main
                  }
                >
                  <Icon
                    name="camera"
                    size={RFValue(40)}
                    color={theme.colors.main_light}
                  />
                </AreaButton>
              </AreaButtonIcon>
            </AreaButtonsCam>
          </Cam>
        )}
      </AreaCamera>
    </Container>
  );
}
