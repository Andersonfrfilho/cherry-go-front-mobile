import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'react-native-image-picker';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import { Camera } from 'expo-camera';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
import {
  Container,
  AreaRegisterPhoto,
  AreaRegisterPhotoTitle,
  AreaRegisterPhotoContent,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaIcon,
  AreaButtonIcon,
  List,
  AreaPhotoButton,
  PhotoProvider,
  ImageFormatted,
  AreaButtonIconClosed,
  IconImage,
  AreaIndexImage,
  IndexImage,
  ModalImageSelected,
  AreaModal,
  AreaButtonModal,
  AreaButtonIconModal,
  AreaModalButton,
  AreaModalImages,
  AreaTitleModalMultiplyImage,
  TitleModalMultiplyImage,
  ModalImagePhoto,
  Cam,
  AreaModalCam,
  AreaButtonsCam,
  AreaButtonCamIconModal,
  AreaButtonsHeaderCam,
  AreaButtonsBottomCam,
  AreaButtonCamModeIconModal,
  ImagePreview,
  AreaButtons,
  AreaImagePreviewIcon,
  AreaImagePreview,
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
import { IMAGES_PROVIDER_LIMIT } from '../../../../constant/providers.const';
import { AppError, HTTP_ERROR_CODES_ENUM } from '../../../../errors/AppError';
import App from '../../../../../App';
import { DeleteImagesProviderDTO } from '../../../../hooks/dtos/users/DeleteImagesProvider.dto';

export interface Focusable {
  focus(): void;
}
const images = [
  {
    id: 'b608a959-6647-4190-ae49-35e27f7e384f',
    provider_id: '5a235dd0-e704-4b3c-bede-d6726cf1bc48',
    image_id: '101c8f13-4d4b-421e-a017-1a71ede88a95',
    position: '0',
    image_name: 'capitão',
    rating: '0',
    created_at: '2021-10-10T07:18:34.900Z',
    updated_at: null,
    deleted_at: null,
    image: {
      id: '101c8f13-4d4b-421e-a017-1a71ede88a95',
      link: 'https://cdn.fakercloud.com/avatars/edhenderson_128.jpg',
    },
  },
  {
    id: '6df7a461-bbdc-47bb-9cb3-069e1f211394',
    provider_id: '5a235dd0-e704-4b3c-bede-d6726cf1bc48',
    image_id: '478b1157-96b8-46bc-8e4c-8aafe6823f4f',
    position: '1',
    image_name: 'lenhador',
    rating: '1',
    created_at: '2021-10-10T07:18:34.900Z',
    updated_at: null,
    deleted_at: null,
    image: {
      id: '478b1157-96b8-46bc-8e4c-8aafe6823f4f',
      link: 'https://cdn.fakercloud.com/avatars/alexandermayes_128.jpg',
    },
  },
  {
    id: 'aea575c9-0793-45cb-b53c-1c0d684bed52',
    provider_id: '5a235dd0-e704-4b3c-bede-d6726cf1bc48',
    image_id: '9f4dbda5-f3c2-4a32-b934-c39adc9bfc1f',
    position: '2',
    image_name: 'trouxa',
    rating: '4',
    created_at: '2021-10-10T07:18:34.900Z',
    updated_at: null,
    deleted_at: null,
    image: {
      id: '9f4dbda5-f3c2-4a32-b934-c39adc9bfc1f',
      link: 'https://cdn.fakercloud.com/avatars/darcystonge_128.jpg',
    },
  },
];
export interface TakePicture {
  takePictureAsync(
    options?: CameraPictureOptions,
  ): Promise<CameraCapturedPicture>;
  pausePreview(): void;
  resumePreview(): void;
}

export function RegistrationsPhotosProvider() {
  interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
  }

  const actions: Action[] = [
    {
      title: 'Take Image',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
    },
    {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 4,
        mediaType: 'photo',
        includeBase64: false,
      },
    },
    {
      title: 'Take Video',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'video',
      },
    },
    {
      title: 'Select Video',
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'video',
      },
    },
    {
      title: `Select Image or Video\n(mixed)`,
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'mixed',
      },
    },
  ];
  const theme = useTheme();
  const navigation = useNavigation<ScreenNavigationProp>();

  const { isLoading, setIsLoading } = useCommon();
  const { appError, appErrorVerifyError, setAppError } = useError();
  const { updateDetails, userClient } = useClientUser();
  const {
    userProvider,
    uploadImagesProvider,
    updateImagesPositionProvider,
    deleteImagesProvider,
  } = useProviderUser();

  const [imagesSelected, setImagesSelected] = useState<ImageFormatted[]>([]);
  const [imagesSelectedOriginal, setImagesSelectedOriginal] = useState<
    ImageFormatted[]
  >([]);
  const [imagesDeleted, setImagesDeleted] = useState<boolean>(false);
  const [imagesUpdatePosition, setImagesUpdatePosition] =
    useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [modalAddImageMode, setModalAddImageMode] = useState<boolean>(false);
  const [modalAddImagePhotoMode, setModalAddImagePhotoMode] =
    useState<boolean>(false);
  const [modalAddMultiplyImageMode, setModalAddMultiplyImageMode] =
    useState<boolean>(false);
  const [imageNumberSelected, setImageNumberSelected] = useState<number>(0);
  const [camMode, setCamMode] = useState<CameraType>(
    Camera.Constants.Type.back,
  );
  const [flashMode, setFlashMode] = React.useState<FlashMode>('off');
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    // images,
    token,
  } = userProvider;
  const cameraRef = useRef<TakePicture>();
  function handleBack() {
    navigation.replace('HomeProviderStack');
  }

  function handleBackCam() {
    setIsPreview(false);
    setImagePreview('');
    cameraRef.current?.resumePreview();
  }

  function handleModeCam(camModeParam: CameraType) {
    setCamMode(
      Camera.Constants.Type.back === camModeParam
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  }

  function handleSelectedImage(indexImageSelected: number) {
    const selectedImages = imagesSelected.map((image, index) => {
      if (index === indexImageSelected) {
        return { ...image, selected: !image.selected };
      }
      return image;
    });

    setImagesSelected(selectedImages);
  }

  function handleChangePosition(imagesIndexes: ImageFormatted[]) {
    const imagesPositionCorrections = imagesSelected.map((image, index) => ({
      ...image,
      position: imagesIndexes[index].position,
    }));

    const imagesFormatted = imagesPositionCorrections.sort(
      (imageA, imageB) => Number(imageA.position) - Number(imageB.position),
    ) as ImageFormatted[];

    setImagesSelected(imagesFormatted);
  }

  function handleFlashOnOff(stateFlash: FlashMode) {
    setFlashMode(stateFlash);
  }

  function handleSelectModeAddImage() {
    setModalAddImageMode(true);
  }

  async function handleSendImage(imageUri: string) {
    setAppError({});
    try {
      if (!token) {
        throw new AppError({
          message: '',
          status_code: HTTP_ERROR_CODES_ENUM.FORBIDDEN,
          code: '3001',
        });
      }

      await uploadImagesProvider({ imagesUri: [imageUri], token });
      navigation.replace('HomeProviderStack');
    } catch (error) {
      setIsPreview(false);
      setModalAddImageMode(false);
      setModalAddMultiplyImageMode(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImageSelect() {
    setAppError({});
    try {
      const imagesSelectedBrowser = await new Promise<Asset[] | undefined>(
        (resolve, reject) =>
          launchImageLibrary(
            {
              maxHeight: 200,
              maxWidth: 200,
              selectionLimit: IMAGES_PROVIDER_LIMIT - imagesSelected.length,
              mediaType: 'photo',
              includeBase64: false,
            },
            (imagesBrowser: ImagePickerResponse) => {
              if (
                imagesBrowser &&
                imagesBrowser.assets &&
                imagesBrowser.assets?.length >
                  IMAGES_PROVIDER_LIMIT - imagesSelected.length
              ) {
                resolve(
                  imagesBrowser.assets?.slice(
                    0,
                    IMAGES_PROVIDER_LIMIT - imagesSelected.length,
                  ),
                );
              }

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
      if (!token) {
        throw new AppError({
          message: '',
          status_code: HTTP_ERROR_CODES_ENUM.FORBIDDEN,
          code: '3001',
        });
      }
      await uploadImagesProvider({ imagesUri, token });
      navigation.navigate('HomeTabProvider');
    } catch (error) {
    } finally {
      setModalAddImageMode(false);
      setModalAddMultiplyImageMode(false);
    }
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

  async function handleImageUpdatePosition(data: ImageFormatted[]) {
    const imagesProvidersIds = data.map(imageProvider => ({
      id: imageProvider.id,
      position: imageProvider.position,
    }));
    await updateImagesPositionProvider(imagesProvidersIds);
  }

  async function handleImagesDeleteProvider(data: ImageFormatted[]) {
    const imagesProvidersIds = data
      .filter(imageProvider => imageProvider.selected)
      .map(imageProvider => {
        delete imageProvider.selected;
        return imageProvider;
      });

    await deleteImagesProvider({ token, images: imagesProvidersIds });
  }

  useEffect(() => {
    const imageFormatted = images
      ?.map(image => ({
        ...image,
        selected: false,
      }))
      .sort(
        (imageA, imageB) => Number(imageA.position) - Number(imageB.position),
      ) as ImageFormatted[];

    setImagesSelected(imageFormatted);
    setImagesSelectedOriginal(imageFormatted);
  }, []);

  useEffect(() => {
    if (imagesSelected.some(image => image.selected)) {
      setImagesDeleted(true);
    } else {
      setImagesDeleted(false);
    }

    if (
      imagesSelected.every(
        (image, index) => image.id === imagesSelectedOriginal[index].id,
      )
    ) {
      setImagesUpdatePosition(false);
    } else {
      setImagesUpdatePosition(true);
    }
  }, [imagesSelected]);

  function handleCameraModalOpen() {
    setModalAddImageMode(false);
    setModalAddImagePhotoMode(true);
  }

  return (
    <Container>
      <ModalImagePhoto
        animationType="slide"
        visible={modalAddImagePhotoMode}
        transparent
        onRequestClose={() => setModalAddImagePhotoMode(false)}
      >
        {isPreview ? (
          <AreaImagePreviewIcon>
            <AreaImagePreview>
              <ImagePreview source={{ uri: imagePreview }} />
            </AreaImagePreview>
            <AreaButtons>
              <AreaButtonCamModeIconModal
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
              </AreaButtonCamModeIconModal>
              <AreaButtonCamModeIconModal
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
              </AreaButtonCamModeIconModal>
            </AreaButtons>
          </AreaImagePreviewIcon>
        ) : (
          <Cam type={camMode} ref={cameraRef} flashMode={flashMode}>
            <AreaModalCam>
              <AreaButtonsHeaderCam>
                <AreaButtonCamModeIconModal
                  color={theme.colors.shape_medium}
                  onPress={() => handleModeCam(camMode)}
                >
                  <Icon
                    name="refresh-cw"
                    size={RFValue(30)}
                    color={theme.colors.main_light}
                  />
                </AreaButtonCamModeIconModal>
                <AreaButtonCamModeIconModal
                  color={theme.colors.yellow_orange}
                  onPress={() => handleFlashOnOff(flashMode)}
                >
                  <Icon
                    name={flashMode === 'on' ? 'zap-off' : 'zap'}
                    size={RFValue(30)}
                    color={theme.colors.main_light}
                  />
                </AreaButtonCamModeIconModal>
              </AreaButtonsHeaderCam>

              <AreaButtonsBottomCam>
                <AreaButtonCamModeIconModal
                  color={theme.colors.shape_medium}
                  onPress={handleCapturePhoto}
                >
                  <Icon
                    name="camera"
                    size={RFValue(30)}
                    color={theme.colors.main_light}
                  />
                </AreaButtonCamModeIconModal>
              </AreaButtonsBottomCam>
            </AreaModalCam>
          </Cam>
        )}
      </ModalImagePhoto>
      <ModalImageSelected
        animationType="slide"
        visible={modalAddImageMode}
        transparent
        onRequestClose={() => setModalAddImageMode(false)}
      >
        <AreaModalButton onPress={() => setModalAddImageMode(false)}>
          <AreaModal>
            <AreaButtonModal>
              <AreaButtonIconModal
                color={theme.colors.yellow_orange}
                onPress={handleImageSelect}
                disabled={imagesSelected.length >= IMAGES_PROVIDER_LIMIT}
              >
                <Icon
                  name="folder"
                  size={RFValue(30)}
                  color={theme.colors.main_light}
                />
              </AreaButtonIconModal>
              <AreaButtonIconModal
                color={theme.colors.bon_jour_dark_shadow}
                onPress={handleCameraModalOpen}
              >
                <Icon
                  name="camera"
                  size={RFValue(30)}
                  color={theme.colors.main_light}
                />
              </AreaButtonIconModal>
            </AreaButtonModal>
          </AreaModal>
        </AreaModalButton>
      </ModalImageSelected>
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
            <AreaRegisterPhoto>
              {appError && appError.message && (
                <AreaRegisterPhotoTitle>
                  <AreaTitle>
                    <WarningText title={appError.message} />
                  </AreaTitle>
                </AreaRegisterPhotoTitle>
              )}
              <AreaRegisterPhotoTitle>
                <>
                  <AreaTitle>
                    <Title>Adicionar fotos</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <AreaButtonIcon
                      color={
                        imagesDeleted
                          ? theme.colors.red_ku_crimson
                          : 'transparent'
                      }
                      onPress={() => handleImagesDeleteProvider(imagesSelected)}
                    >
                      {imagesDeleted && (
                        <Icon
                          name="trash"
                          size={RFValue(30)}
                          color={theme.colors.main_light}
                        />
                      )}
                    </AreaButtonIcon>
                    <AreaButtonIcon
                      color={
                        imagesUpdatePosition
                          ? theme.colors.success_chateau_green
                          : 'transparent'
                      }
                      onPress={() => handleImageUpdatePosition(imagesSelected)}
                    >
                      {imagesUpdatePosition && (
                        <Icon
                          name="save"
                          size={RFValue(30)}
                          color={theme.colors.main_light}
                        />
                      )}
                    </AreaButtonIcon>
                    {!(imagesSelected.length >= 5) && (
                      <AreaButtonIcon
                        color={theme.colors.purple_luxury}
                        onPress={handleSelectModeAddImage}
                      >
                        <Icon
                          name="plus"
                          size={RFValue(40)}
                          color={theme.colors.main_light}
                        />
                      </AreaButtonIcon>
                    )}
                  </AreaIcon>
                </>
              </AreaRegisterPhotoTitle>
              <AreaRegisterPhotoContent>
                <List
                  data={imagesSelected}
                  renderItem={({
                    item,
                    index,
                    drag,
                    isActive,
                  }: RenderItemParams<ImageFormatted>) => (
                    <AreaPhotoButton
                      onPress={() => handleSelectedImage(index)}
                      onLongPress={drag}
                      selected={item.selected}
                    >
                      <AreaButtonIconClosed selected={item.selected}>
                        {item.selected && (
                          <IconImage
                            name="check-circle"
                            size={RFValue(35)}
                            color={theme.colors.success}
                          />
                        )}
                        <AreaIndexImage selected={item.selected}>
                          <IndexImage selected={item.selected}>
                            {Number(index + 1)}
                          </IndexImage>
                        </AreaIndexImage>
                      </AreaButtonIconClosed>
                      <PhotoProvider
                        resizeMode="contain"
                        source={{
                          uri: item.image.link,
                        }}
                      />
                    </AreaPhotoButton>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  onDragEnd={({ data }) => handleChangePosition(data)}
                />
              </AreaRegisterPhotoContent>
            </AreaRegisterPhoto>
          </>
        )}
      </Form>
    </Container>
  );
}
