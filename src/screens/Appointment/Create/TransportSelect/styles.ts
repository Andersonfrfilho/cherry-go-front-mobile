import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { HourSelectInterface } from '../../../../hooks/clientUser';

interface AreaLocalSelectProps {
  select?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Body = styled.View`
  flex: 1;

  justify-content: space-between;

  padding-left: 10px;
  padding-right: 10px;

  margin-bottom: 12px;
`;

export const AreaLocalClient = styled.TouchableOpacity<AreaLocalSelectProps>`
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header};

  border-radius: 12px;
  flex-direction: row;

  margin-top: 12px;
  margin-bottom: 12px;

  ${({ theme, select }) =>
    select &&
    css`
      background-color: ${theme.colors.success};
    `}
`;
export const AreaIconSelect = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const AreaSelectButton = styled.View``;
export const AreaLocalTitleClient = styled.View`
  flex: 4;

  justify-content: center;
`;
export const AreaButtonLocalClient = styled.View``;
export const LocalTitleClient = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;
export const AreaLocalProvider = styled.TouchableOpacity<AreaLocalSelectProps>`
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bon_jour};

  border-radius: 12px;
  flex-direction: row;

  margin-top: 12px;
  margin-bottom: 12px;

  ${({ theme, select }) =>
    select &&
    css`
      background-color: ${theme.colors.success};
    `}
`;
export const AreaLocalTitleProvider = styled.View``;
export const AreaTitleLocalProvider = styled.View`
  flex: 3;

  justify-content: center;
`;
export const AreaAmountLocalProvider = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-start;
`;
export const LocalTitleProvider = styled.Text<AreaLocalSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const AreaButtons = styled.View`
  height: 80px;
  width: 100%;
  flex-direction: row;
`;
export const AreaButtonBack = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.red_ku_crimson};
  border-radius: 12px;
  border-color: ${({ theme }) => theme.colors.header};
  margin: 5px;
`;
export const TitleButtonBack = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;
export const AreaButtonNext = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.success_chateau};
  border-radius: 12px;
  border-color: ${({ theme }) => theme.colors.header};
  margin: 5px;
`;
export const TitleButtonNext = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;

export const Icon = styled(Feather)``;
