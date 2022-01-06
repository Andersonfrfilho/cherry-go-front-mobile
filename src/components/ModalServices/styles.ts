import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface PropsSelect {
  select: boolean;
}
interface PropsExpand {
  expand: boolean;
}
export const Modal = styled.Modal``;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  flex-direction: row;
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TitleHeader = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;
export const Body = styled.ScrollView`
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 10px;
`;
export const AreaItemInfoDetails = styled.View<PropsSelect | PropsExpand>`
  width: 100%;
  height: 120px;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 12px;

  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.main_light};

  margin-bottom: 5px;

  ${({ theme, select }) =>
    select &&
    css`
      background-color: ${theme.colors.success};
    `}

  ${({ expand }) =>
    expand &&
    css`
      height: 230px;
    `}
`;
export const AreaInfoItem = styled.View`
  flex-direction: row;

  height: 120px;
  width: 100%;
`;
export const AreaNameDurationPrice = styled.View`
  flex: 4;
`;
export const AreaName = styled.View`
  flex: 1;
  justify-content: center;
`;
export const Name = styled.Text<PropsSelect>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;
export const AreaDurationPrice = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
export const AreaDuration = styled.View`
  flex: 1;
`;
export const Duration = styled.Text<PropsSelect>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;
export const AreaPrice = styled.View`
  flex: 1;
  align-items: flex-end;
`;
export const Price = styled.Text<PropsSelect>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const AreaItemExpand = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const AreaCheckItem = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)``;
export const AreaDetails = styled.View`
  padding: 5px;
`;
export const Details = styled.Text<PropsSelect>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;
export const Footer = styled.View`
  height: 120px;
`;
export const AreaButtonSave = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const TitleButtonSave = styled.Text<PropsSelect>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const AreaIconBack = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AreaTitle = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

export const AreaIconSave = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.success};

  border-radius: 12px;
`;
