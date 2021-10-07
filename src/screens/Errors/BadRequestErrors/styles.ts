import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 18}px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

export const AreaLogoTitle = styled.View`
  height: ${RFValue(300)}px;
  width: ${RFValue(300)}px;
  margin-top: 10px;
`;

export const AreaTitle = styled.View`
  flex: 1;
  height: 60px;
  padding: 0 20px;
  align-items: center;
`;

export const AreaWarning = styled.View`
  height: 60px;
  padding: 0 20px;
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
  flex: 1;
  margin: 10px 0;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.View`
  flex: 1;

  justify-content: center;

  padding: 0px 20px;
`;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 0px;
`;
