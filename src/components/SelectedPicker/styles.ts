import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled.View`
  width: 100%;
  height: 80px;

  margin-bottom: 10px;
`;

export const AreaTitle = styled.View`
  padding-left: 15px;
  margin-bottom: 3px;
  height: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
`;

export const AreaPicker = styled.View`
  height: 60px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.shape};
  border-radius: 15px;
`;
