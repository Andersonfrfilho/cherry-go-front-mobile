import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { Image_Provider } from '../../../../hooks/providerUser';

interface AreaInfoProps {
  color?: string;
}
export interface ImageFormatted extends Image_Provider {
  selected: boolean;
}
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;
export const AreaModalButton = styled.TouchableWithoutFeedback`
  flex: 1;
`;
export const AreaModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const AreaButtonModal = styled.View`
  height: 120px;
  width: 240px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.main_light};
  border-radius: 12px;
`;
export const AreaButtonIconModal = styled.TouchableOpacity<AreaInfoProps>`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;

  margin: 5px;

  border-radius: 12px;

  background-color: ${({ theme, color }) => color || theme.colors.text};
`;
export const Form = styled.View`
  flex: 1;

  margin-top: 10px;

  padding: 0 20px;
`;

export const AreaRegisterPhoto = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;

export const AreaRegisterPhotoTitle = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaRegisterPhotoContent = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaIcon = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 5px;
`;

export const AreaButtonIcon = styled.TouchableOpacity<AreaInfoProps>`
  flex: 1;

  justify-content: center;
  align-items: center;

  margin-left: 3px;

  border-radius: 12px;

  background-color: ${({ theme, color }) => color || theme.colors.text};
`;
export const Icon = styled(Feather)``;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const AreaTitle = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10px;
`;

export const AreaPhotoButton = styled.TouchableOpacity<ImageFormatted>`
  height: 350px;
  width: 100%;
  margin-right: 5px;
  margin-bottom: 5px;

  ${({ theme, selected }) =>
    selected &&
    css`
      border: solid;
      border-width: 3px;
      border-color: ${theme.colors.success};
      border-radius: 15px;
      padding: 5px;
    `}
`;
export const PhotoProvider = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
export const AreaButtonIconClosed = styled.View<ImageFormatted>`
  flex-direction: row;
  position: absolute;
  height: 40px;
  width: 100px;
  left: 68%;
  top: 5px;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;

  ${({ selected }) =>
    selected &&
    css`
      top: 10px;
    `}
`;
export const List = styled(DraggableFlatList)``;
export const IconImage = styled(Feather)`
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 30px;
  margin-right: 5px;
`;

export const AreaIndexImage = styled.View<ImageFormatted>`
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.background_primary};
  border-radius: 6px;

  ${({ theme, selected }) =>
    selected &&
    css`
      border-color: ${theme.colors.success};
    `}
`;

export const IndexImage = styled.Text<ImageFormatted>`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};

  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.colors.success};
    `}
`;

export const ModalImageSelected = styled(Modal)`
  flex: 1;
`;

export const ModalImagePhoto = styled(Modal)`
  flex: 1;
`;

export const AreaModalImages = styled.View`
  flex: 1;
`;

export const AreaTitleModalMultiplyImage = styled.View`
  height: 80px;
  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const TitleModalMultiplyImage = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const Cam = styled(Camera)`
  flex: 1;
`;

export const AreaModalCam = styled.View`
  flex: 1;

  justify-content: space-between;
`;
export const AreaButtonsHeaderCam = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  margin-top: 10px;
`;
export const AreaButtonsBottomCam = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-bottom: 50px;
`;
export const AreaButtonCamModeIconModal = styled.TouchableOpacity<AreaInfoProps>`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;

  margin: 5px;

  border-radius: 40px;

  background-color: ${({ theme, color }) => color || theme.colors.text};
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const AreaImagePreviewIcon = styled.View`
  flex: 1;
`;

export const AreaImagePreview = styled.View`
  width: 100%;
  height: 100%;
`;

export const AreaButtons = styled.View`
  top: -120px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
