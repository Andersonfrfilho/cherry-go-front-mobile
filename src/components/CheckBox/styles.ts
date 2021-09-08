import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  color?: string;
  title?: boolean;
}

export const Button = styled(TouchableOpacity)<Props>`
  width: 80px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme, color }) =>
    color || theme.colors.background_secondary};
`;

export const IconContainer = styled.View<Props>`
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: ${({ title }) => (title ? 'space-around' : 'center')};
  align-items: center;
`;

export const Title = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme, color }) => color || theme.colors.title};
  font-size: ${RFValue(16)}px;
`;
