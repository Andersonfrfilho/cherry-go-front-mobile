import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  error: boolean;
}
interface PropsButtonMap {
  disabled: boolean;
}

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background_primary};
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

export const SubTitle = styled.Text<Props>`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(18)}px;
  margin-top: 14px;

  ${({ theme, error }) =>
    error &&
    css`
      border-radius: 4px;
      background-color: ${theme.colors.warning_buttercup_light_shade};
      padding-left: 30px;
      padding-right: 30px;
    `}
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
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 0px;
`;

export const TermsUseArea = styled.View`
  flex-direction: row;

  justify-content: space-around;
  align-items: center;

  margin-top: 10px;
`;

export const AreaLoad = styled.View`
  justify-content: center;
  align-items: center;
`;
export const AreaButtonMap = styled.TouchableOpacity<PropsButtonMap>`
  flex-direction: row;

  height: 80px;
  width: 100%;

  justify-content: space-evenly;
  align-items: center;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.success_chateau};
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 5px;

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colors.desative_shade};
      border-color: ${theme.colors.main_light};
    `}
`;
export const ButtonMapTitle = styled.Text<PropsButtonMap>`
  color: ${({ theme }) => theme.colors.main_light};
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(18)}px;
`;
