import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonTextProps {
  error: boolean;
}

export const Container = styled.View<ButtonTextProps>`
  width: 100%;
  height: ${({ error }) => (error ? 100 : 80)}px;

  margin-bottom: 20px;
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

export const Error = styled.Text`
  text-align: left;
  background-color: ${({ theme }) => theme.colors.red_ku_crimson};
  color: ${({ theme }) => theme.colors.bon_jour_light_shade};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  border-radius: 5px;
  margin: 7px;
  padding-left: 5px;
  width: 50%;
  font-size: ${RFValue(12)}px;
`;
