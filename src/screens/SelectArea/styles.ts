import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight()}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const AreaButtonLogout = styled.View`
  height: 60px;
  width: 100%;

  align-items: flex-end;

  padding-right: 10px;
`;
export const AreaButtonIcon = styled(TouchableOpacity)`
  height: 50px;
  width: 50px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};

  border-radius: 12px;
`;
export const AreaLogoTitle = styled.View`
  height: ${RFValue(300)}px;
  width: ${RFValue(300)}px;
  margin-top: 10px;
`;

export const AreaTitle = styled.View`
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
`;

export const Icon = styled(Feather)``;

export const Title = styled.Text`
  font-size: ${RFValue(35)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  background-color: ${({ theme }) =>
    theme.colors.warning_buttercup_light_shade};
  font-size: ${RFValue(15)}px;
  margin-top: 14px;
`;
export const Body = styled.View`
  flex: 1;
  margin-top: 15px;
  padding: 0 20px;
`;

export const ButtonIcons = styled.View`
  flex: 1;

  justify-content: space-evenly;
  align-items: center;
`;
