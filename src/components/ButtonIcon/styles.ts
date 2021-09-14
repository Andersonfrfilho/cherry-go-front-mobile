import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  color?: string;
  size?: number;
  disabled?: boolean;
}

export const Button = styled(TouchableOpacity)<Props>`
  width: 150px;
  height: 60px;

  border-radius: 12px;
  background-color: ${({ theme, color }) =>
    color || theme.colors.background_secondary};

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colors.desative_shade};
    `}
`;

export const IconContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme, color }) => color || theme.colors.title};
  font-size: ${({ size }) => RFValue(size || 16)}px;
`;
