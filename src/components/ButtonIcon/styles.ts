import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  color?: string;
  size?: number;
}

export const Button = styled(TouchableOpacity)<Props>`
  width: 150px;
  height: 60px;

  border-radius: 12px;
  background-color: ${({ theme, color }) =>
    color || theme.colors.background_secondary};
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