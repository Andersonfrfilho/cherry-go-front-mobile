import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TitleProps {
  color?: string;
  size?: number;
}

export const Container = styled.View`
  width: 90%;
  height: 50px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  padding: 0 10px;
  background-color: ${({ theme }) =>
    theme.colors.warning_buttercup_light_shade};
  border-radius: 5px;
`;
export const AreaIcon = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AreaTitle = styled.View`
  flex: 5;
  align-items: flex-start;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme, color }) => color || theme.colors.red_devil};
  font-size: ${({ size }) => RFValue(size || 16)}px;
`;
