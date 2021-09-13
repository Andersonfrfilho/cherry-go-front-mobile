import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 8px;
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
