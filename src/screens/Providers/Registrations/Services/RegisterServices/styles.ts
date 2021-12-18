import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

interface AreaInfoProps {
  color?: string;
}
interface AreaInfoDateProps {
  size?: number;
}
interface PropsTag {
  selectedTags?: boolean;
}
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Form = styled.View`
  flex: 1;

  margin-top: 10px;

  padding: 0 20px;
`;

export const AreaAppointments = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;

export const AreaAppointmentTitle = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaAppointmentContent = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;

  padding: 3px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaIcon = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)``;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const AreaTitle = styled.View`
  flex: 3;
  justify-content: center;
  padding-left: 10px;
`;
export const AreaButtonTags = styled.TouchableOpacity<PropsTag>`
  height: 60px;
  width: 100%;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main_light};
  border-radius: 12px;

  margin-bottom: 10px;

  ${({ theme, selectedTags }) =>
    selectedTags &&
    css`
      background-color: ${theme.colors.success_chateau};
    `}
`;
export const TitleButtonTags = styled.Text<PropsTag>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};

  ${({ theme, selectedTags }) =>
    selectedTags &&
    css`
      color: ${theme.colors.main_light};
    `}
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
