import React, { useState, useRef, useEffect } from 'react';
import { PermissionsAndroid, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Camera,
  CameraCapturedPicture,
  CameraPictureOptions,
} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { CameraType } from 'expo-camera/build/Camera.types';
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
  CamBorder,
  AreaCamAndOptions,
} from './styles';
import { useCommon } from '../../../hooks/common';
import { useClientUser } from '../../../hooks/clientUser';
import { WarningText } from '../../../components/WarningText';
import { useError } from '../../../hooks/error';
import { FLASH_MODE_ENUM } from '../../../constant/camera.const';

export interface TakePicture extends Camera {
  takePictureAsync(
    options?: CameraPictureOptions,
  ): Promise<CameraCapturedPicture>;
  pausePreview(): void;
  resumePreview(): void;
}

export function SignUpSevenStep() {
  const [subTitle, setSubTitle] = useState('Retire uma foto para seu perfil');
  const [isPreview, setIsPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [permissionCamera, setPermissionCamera] = useState(false);
  const [writeStoragePermission, setWriteStoragePermission] = useState(false);
  const [readStoragePermission, setReadStoragePermission] = useState(false);
  const [camMode, setCamMode] = useState<CameraType>(
    Camera.Constants.Type.front,
  );
  const [flashMode, setFlashMode] = useState<FLASH_MODE_ENUM>(
    FLASH_MODE_ENUM.off,
  );

  const cameraRef = useRef<TakePicture>();
  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError, appErrorVerifyError } = useError();
  const { userClient, uploadUserClientImageProfile } = useClientUser();

  const navigation = useNavigation<ScreenNavigationProp>();

  function handleBack() {
    navigation.replace('SignIn');
  }

  const handleBackCam = () => {
    setIsPreview(false);
    setImagePreview('');
    cameraRef.current?.resumePreview();
  };

  async function handleImageSelect() {
    setIsLoading(true);
    setAppError({});
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 2],
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
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  const handleCaptureDocumentFront = async () => {
    setIsLoading(true);
    setAppError({});
    try {
      if (cameraRef.current) {
        const options = { quality: 0.7, base64: true, aspect: [2, 2] };
        const data = await cameraRef.current?.takePictureAsync(options);

        const source = data.uri;
        if (source) {
          setImagePreview(source);
          cameraRef.current.pausePreview();
          setIsPreview(true);
        }
      }
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendImage = async (imageUri: string) => {
    setIsLoading(true);
    setAppError({});
    try {
      await uploadUserClientImageProfile({
        image_uri: imageUri,
        user_id:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
      });

      navigation.replace('SignUpEighthStep');
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlashOnOff = async (stateFlash: FLASH_MODE_ENUM) => {
    setFlashMode(FLASH_MODE_ENUM[stateFlash]);
  };

  const handleModeCam = (camModeParam: CameraType) => {
    setCamMode(
      Camera.Constants.Type.back === camModeParam
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const requestCameraPermission = async () => {
    try {
      const grantedReadStorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cherry-go precisa de acesso a suas fotos',
          message:
            'O aplicativo cherry-go precisa acessar suas fotos ' +
            'para podermos prosseguir.',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Não',
          buttonPositive: 'Sim',
        },
      );
      const grantedWriteStorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cherry-go precisa de acesso para salvar fotos',
          message:
            'O aplicativo cherry-go precisa acesso para salvar suas fotos ' +
            'para podermos prosseguir.',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Não',
          buttonPositive: 'Sim',
        },
      );
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cherry-go precisa de acesso a sua camera',
          message:
            'O aplicativo cherry-go precisa acessar sua camera ' +
            'para podermos prosseguir.',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Não',
          buttonPositive: 'Sim',
        },
      );

      if (
        grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
        grantedWriteStorage === PermissionsAndroid.RESULTS.GRANTED &&
        grantedReadStorage === PermissionsAndroid.RESULTS.GRANTED
      ) {
        setPermissionCamera(true);
        setWriteStoragePermission(true);
        setReadStoragePermission(true);
      } else {
        setPermissionCamera(false);
        setWriteStoragePermission(false);
        setReadStoragePermission(false);
      }
    } catch (err) {
      setPermissionCamera(false);
      setWriteStoragePermission(false);
      setReadStoragePermission(false);
    }
  };

  useEffect(() => {
    let unmounted = false;
    const ac = new AbortController();
    if (!unmounted) {
      if (
        !permissionCamera ||
        !writeStoragePermission ||
        !readStoragePermission
      ) {
        requestCameraPermission();
      }
    }
    return () => {
      ac.abort();
      unmounted = true;
      setSubTitle(
        `Retire uma foto sua com seu documento\n ao lado de seu rosto`,
      );
      setSubTitle('Retire uma foto para seu perfil');
      setIsPreview(false);
      setImagePreview('');
      setPermissionCamera(false);
      setWriteStoragePermission(false);
      setReadStoragePermission(false);
      setCamMode(Camera.Constants.Type.front);
      setFlashMode(FLASH_MODE_ENUM.off);
    };
  }, []);

  useEffect(() => {
    if (
      !permissionCamera ||
      !writeStoragePermission ||
      !readStoragePermission
    ) {
      requestCameraPermission();
    }
  }, [permissionCamera]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <AreaTitle>
          <Title>Perfil</Title>
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
          <AreaCamAndOptions>
            <AreaOptionsButtonsCam>
              <AreaOptions>
                <AreaButtonsCam>
                  <AreaButtonIcon />
                  <AreaButtonIcon>
                    <AreaButton
                      disabled={isLoading}
                      onPress={() => handleModeCam(camMode)}
                      color={
                        camMode === Camera.Constants.Type.back
                          ? theme.colors.shape
                          : theme.colors.shape_dark_light
                      }
                    >
                      <Icon
                        style={{ transform: [{ rotate: '15deg' }] }}
                        name="refresh-ccw"
                        size={RFValue(30)}
                        color={
                          camMode === Camera.Constants.Type.back
                            ? theme.colors.yellow_orange
                            : theme.colors.shape
                        }
                      />
                    </AreaButton>
                  </AreaButtonIcon>
                  <AreaButtonIcon>
                    <AreaButton
                      disabled={isLoading}
                      onPress={() => {
                        handleFlashOnOff(
                          FLASH_MODE_ENUM[flashMode] === FLASH_MODE_ENUM.on
                            ? FLASH_MODE_ENUM.off
                            : FLASH_MODE_ENUM.on,
                        );
                      }}
                      color={
                        camMode === Camera.Constants.Type.back
                          ? theme.colors.shape
                          : theme.colors.shape_dark_light
                      }
                    >
                      <Icon
                        style={{ transform: [{ rotate: '15deg' }] }}
                        name="zap"
                        size={RFValue(30)}
                        color={
                          camMode === Camera.Constants.Type.back
                            ? theme.colors.yellow_orange
                            : theme.colors.shape
                        }
                      />
                    </AreaButton>
                  </AreaButtonIcon>
                </AreaButtonsCam>
              </AreaOptions>
            </AreaOptionsButtonsCam>
            <CamBorder>
              <Cam
                type={camMode}
                ref={cameraRef}
                flashMode={Camera.Constants.FlashMode.on}
              />
            </CamBorder>
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
          </AreaCamAndOptions>
        )}
      </AreaCamera>
    </Container>
  );
}
