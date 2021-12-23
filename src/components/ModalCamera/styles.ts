import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

interface Props {
  color?: string;
  title?: boolean;
}

export const Container = styled(Camera)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  justify-content: space-between;
`;
export const Modal = styled.Modal`
  flex: 1;
  justify-content: space-between;
`;
export const Header = styled.View`
  width: 100%;
  height: 80px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-left: 10px;
  padding-right: 10px;
`;
export const AreaButtonIconClosed = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  width: 48px;
  height: 48px;

  border-radius: 24px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.main_light};
`;

export const AreaButtonIconGallery = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  width: 48px;
  height: 48px;

  border-radius: 24px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.main_light};
`;

export const AreaButtonIconChangeCameraMode = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  width: 48px;
  height: 48px;

  border-radius: 24px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.main_light};
`;

export const AreaButtonIconTakePhoto = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  width: 64px;
  height: 64px;

  border-radius: 32px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.main_light};
  margin-left: 10px;
  margin-right: 10px;
`;

export const Icon = styled(Feather)``;

export const Footer = styled.View`
  width: 100%;
  height: 80px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-left: 10px;
  padding-right: 10px;
`;
export const AreaButtonIconSendPhoto = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  width: 64px;
  height: 64px;

  border-radius: 32px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.main_light};
  margin-left: 10px;
  margin-right: 10px;
`;
