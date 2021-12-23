import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Camera } from 'expo-camera';
import {
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraType,
  FlashMode,
} from 'expo-camera/build/Camera.types';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  Container,
  Modal,
  Icon,
  AreaButtonIconClosed,
  AreaButtonIconGallery,
  AreaButtonIconChangeCameraMode,
  AreaButtonIconTakePhoto,
  Header,
  Footer,
  AreaButtonIconSendPhoto,
} from './styles';
import { useCommon } from '../../hooks/common';
import { useError } from '../../hooks/error';
import { AppError, HTTP_ERROR_CODES_ENUM } from '../../errors/AppError';
import { useProviderUser } from '../../hooks/providerUser';

interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: () => void;
  handleSendImage: (image: string) => Promise<void>;
}
export interface TakePicture {
  takePictureAsync(
    options?: CameraPictureOptions,
  ): Promise<CameraCapturedPicture>;
  pausePreview(): void;
  resumePreview(): void;
}

export function ModalCamera({
  modalVisible = true,
  handleClosedModal,
  handleSendImage,
}: Props) {
  const [camMode, setCamMode] = useState<CameraType>(
    Camera.Constants.Type.back,
  );
  const [flashMode, setFlashMode] = React.useState<FlashMode>(FlashMode.off);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const cameraRef = useRef<TakePicture>();

  const { isLoading, setIsLoading } = useCommon();
  const { setAppError, appError } = useError();

  const theme = useTheme();

  function handleHandleCameraMode(camModeParam: CameraType) {
    setCamMode(
      Camera.Constants.Type.back === camModeParam
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  }

  function handleFlashOnOff(stateFlash: FlashMode) {
    setFlashMode(FlashMode.off === stateFlash ? FlashMode.on : FlashMode.off);
  }

  async function handleCapturePhoto() {
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

  async function handleImageSelect() {
    setIsLoading(true);
    setAppError({});
    try {
      const imagesSelectedBrowser = await new Promise<Asset[] | undefined>(
        (resolve, reject) =>
          launchImageLibrary(
            {
              maxHeight: 200,
              maxWidth: 200,
              mediaType: 'photo',
              includeBase64: false,
            },
            (imagesBrowser: ImagePickerResponse) => {
              resolve(imagesBrowser.assets);
            },
          ),
      );
      if (!imagesSelectedBrowser) {
        throw new AppError({
          message: 'Imagens invalidas !!!',
          code: '0006',
          status_code: 600,
        });
      }
      const imagesUri = imagesSelectedBrowser.map(
        imageBrowser => imageBrowser.uri,
      );

      if (!imagesUri) {
        throw new AppError({
          message: '',
          status_code: HTTP_ERROR_CODES_ENUM.APPLICATION,
          code: '0006',
        });
      }

      await handleSendImage(imagesUri);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSendImageUpdate(image: string) {
    await handleSendImage(image);
  }
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <Container type={camMode} ref={cameraRef} flashMode={flashMode}>
        <Header>
          <AreaButtonIconClosed onPress={handleClosedModal}>
            <Icon
              name="x"
              size={RFValue(25)}
              color={theme.colors.red_ku_crimson}
            />
          </AreaButtonIconClosed>

          <AreaButtonIconChangeCameraMode
            onPress={() => handleHandleCameraMode(camMode)}
          >
            <Icon
              name="refresh-ccw"
              size={RFValue(25)}
              color={theme.colors.background_primary}
            />
          </AreaButtonIconChangeCameraMode>
        </Header>
        <Footer>
          <AreaButtonIconTakePhoto onPress={handleCapturePhoto}>
            <Icon
              name="camera"
              size={RFValue(25)}
              color={theme.colors.background_primary}
            />
          </AreaButtonIconTakePhoto>
          {imagePreview ? (
            <AreaButtonIconSendPhoto
              onPress={async () => handleSendImageUpdate(imagePreview)}
            >
              <Icon
                name="send"
                size={RFValue(25)}
                color={theme.colors.background_primary}
              />
            </AreaButtonIconSendPhoto>
          ) : (
            <AreaButtonIconGallery onPress={handleImageSelect}>
              <Icon
                name="image"
                size={RFValue(25)}
                color={theme.colors.background_primary}
              />
            </AreaButtonIconGallery>
          )}
        </Footer>
      </Container>
    </Modal>
  );
}
