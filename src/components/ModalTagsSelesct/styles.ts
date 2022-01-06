import styled, { css } from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { Tag } from '../../hooks/tag';

interface PropsItem {
  select?: boolean;
}
export const Modal = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;
export const AreaHeader = styled.View`
  flex: 1;
  flex-direction: row;
  height: 60px;
  padding: 1.5px;
`;

export const AreaWithoutHeader = styled.View<PropsChangeItem>`
  flex: ${({ changeItem }) => (changeItem ? 4 : 5)};
`;

export const AreaButtonIconBack = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;
`;

export const AreaItens = styled.View`
  flex: 12;
`;

export const Item = styled.TouchableOpacity<PropsItem>`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  border: 3px;
  border-color: ${({ theme }) => theme.colors.background_primary};
  padding: 3px;
  margin-bottom: 5px;

  border-radius: 12px;

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.success_chateau};
    `}
`;

export const ItemTitle = styled.Text<PropsItem>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
  text-align: left;
  margin-left: 5px;
  margin-top: 20px;
  margin-bottom: 20px;

  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const Icon = styled(Feather)``;

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

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(24)}px;
  text-align: center;

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const List = styled(FlatList as new () => FlatList<Tag>)``;

export const AreaItemTag = styled.TouchableOpacity<PropsItem>`
  width: 32%;
  height: 150px;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 24px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.shape_medium};

  margin: 2px;

  ${({ select, theme }) =>
    select &&
    css`
      border-color: ${theme.colors.success_chateau};
    `}
`;

export const AreaImageTag = styled.View`
  flex: 3;
`;

export const ImageItemTag = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const TitleItemTag = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
`;

export const TitleTag = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
`;
