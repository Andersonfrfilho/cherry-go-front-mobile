import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableWithoutFeedback } from 'react-native';

interface Props {
  error: boolean;
}
export const KeyboardDismiss = styled(TouchableWithoutFeedback)`
  flex: 1;
`;

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
  align-items: center;
`;

export const AreaCount = styled.View`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
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
  flex: 3;
  justify-content: center;
  margin: 10px 0;
  padding: 0px 20px;
`;

export const Footer = styled.View`
  justify-content: center;

  width: 100%;
  flex: 1;

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
