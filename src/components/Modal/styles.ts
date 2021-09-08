import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  color?: string;
  title?: boolean;
}
export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.main_light};
`;

export const AreaButton = styled.View`
  height: 60px;
  width: 100%;
`;

export const Button = styled(TouchableOpacity)<Props>`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, color }) => color || theme.colors.success};
`;

export const Title = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme, color }) => color || theme.colors.title};
  font-size: ${RFValue(24)}px;
  text-align: center;

  margin-top: 20px;
  margin-bottom: 20px;
`;
