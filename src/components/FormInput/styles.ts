import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const Error = styled.Text`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  margin: 7px;
  font-size: ${RFValue(14)}px;
`;
