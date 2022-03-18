import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const TextName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(32)}px;
  text-transform: uppercase;
`;
