import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
  margin-bottom: 20px;
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight()}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AreaLogoTitle = styled.View`
  height: ${RFValue(300)}px;
  width: ${RFValue(300)}px;
  margin-top: 10px;
`;

export const AreaTitle = styled.View`
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
  background-color: ${({ theme }) =>
    theme.colors.warning_buttercup_light_shade};
  font-size: ${RFValue(15)}px;
  margin-top: 14px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 10px 0;
  padding: 0px 20px;
`;

export const Footer = styled.View`
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  padding: 0px 20px;
`;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 0px;
`;
