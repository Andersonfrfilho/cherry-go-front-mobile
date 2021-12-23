import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const ContentUpdateProfile = styled.View`
  flex: 1;
`;

export const AreaPhotoUpdate = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled(FastImage)`
  width: 300px;
  height: 300px;
  border-radius: 150px;
`;

export const AreaFormUpdate = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.main_light};
`;

export const AreaIcon = styled.TouchableOpacity`
  position: absolute;
  left: 60%;
  top: 70%;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main_light};
  border-radius: 24px;

  border: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)``;
