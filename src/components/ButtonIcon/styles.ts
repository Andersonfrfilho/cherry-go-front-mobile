import styled from 'styled-components/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(TouchableHighlight)`
  width: 150px;
  height: 60px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const IconContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
`;
