import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

interface Props {
  error: boolean;
}
interface PropsAreaButton {
  color?: string;
}
export const Container = styled.View.attrs({})`
  flex: 1;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight() + 15}px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AreaTitle = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(35)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(18)}px;
  margin-top: 14px;
  text-align: center;
`;

export const AreaCamera = styled.View`
  flex: 5;
  justify-content: center;
  margin: 10px 0;
  padding: 10px 20px;
`;
export const Cam = styled(Camera)`
  flex: 1;

  justify-content: space-around;
  align-items: center;
`;

export const AreaOptionsButtonsCam = styled.View`
  flex: 1;
  width: 100%;
`;

export const AreaOptions = styled.View`
  height: 120px;
  width: 100%;
`;

export const AreaImagePreviewIcon = styled.View`
  flex: 1;
`;

export const AreaImagePreview = styled.View`
  width: 100%;
  height: 100%;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const Footer = styled.View`
  justify-content: center;

  width: 100%;
  flex: 1;

  padding: 0px 20px;
`;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 0px;
`;

export const AreaLoad = styled.View`
  justify-content: center;
  align-items: center;
`;

export const AreaButtons = styled.View`
  top: -100px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
export const AreaButtonIcon = styled.View`
  width: 80px;
  height: 80px;
`;

export const AreaButtonsCam = styled.View`
  height: 120px;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const AreaButton = styled.TouchableOpacity<PropsAreaButton>`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  border-radius: 40px;

  background-color: ${({ theme, color }) => color || theme.colors.main};
  margin-bottom: 15px;
`;

export const Icon = styled(Feather)``;
