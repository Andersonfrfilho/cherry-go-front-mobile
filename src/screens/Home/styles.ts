import styled, { css } from 'styled-components/native';
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { FlatList, TextInputProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';
import { Tag } from '../../hooks/tag';
import { UserProvider } from '../../hooks/providerUser';

export interface PropsTagsFilter {
  tagsSelected?: boolean;
}
export interface PropsTagsFavIcon {
  favProvider?: boolean;
}
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Body = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  padding: 0px 20px;
`;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 0px;
`;
export const AreaSearch = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.header};
`;
export const AreaInput = styled.View`
  flex: 4;
  padding: 10px;
`;
export const Input = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bon_jour_light_shade};
  padding-left: 10px;
  border-radius: 12px;
`;
export const AreaIcon = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(Feather)``;
export const IconFontAwesome = styled(FontAwesome)``;
export const IconMaterialCommunityIcons = styled(MaterialCommunityIcons)``;

export const AreaTagsFilter = styled.View`
  height: 200px;
`;
export const AreaTagFilter = styled.View``;

export const AreaTagsTitleFilter = styled.TouchableOpacity`
  height: 40px;
  justify-content: center;
  padding-left: 5px;
`;
export const TagTitleFilter = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(24)}px;
`;

export const List = styled(FlatList as new () => FlatList<Tag>)``;

export const ListProviders = styled(
  FlatList as new () => FlatList<UserProvider>,
)`
  padding: 5px;
  margin: 3px;
`;

export const AreaItemTag = styled.View`
  width: 120px;
  height: 150px;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 24px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.shape_medium};

  margin: 5px;
`;

export const AreaIconRemoveTag = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  left: 75%;
  background-color: ${({ theme }) => theme.colors.main_light};
  border-radius: 16px;
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

export const AreaItemWithoutTag = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 2px;
`;
export const TitleWithoutTag = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(16)}px;
`;

export const AreaProvidersSelect = styled.View`
  flex: 1;
  align-items: center;
`;

export const AreaProvidersTitle = styled.View`
  height: 40px;
  justify-content: center;
  padding-left: 5px;
  flex-direction: row;
`;
export const ProviderTitle = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;

export const ProviderDistanceTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const AreaDistance = styled.TouchableOpacity`
  flex-direction: row;
`;

export const AreaItemProvider = styled.TouchableOpacity`
  width: 210px;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 24px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.shape_medium};

  margin: 2px;
`;

export const AreaImageProvider = styled.View`
  flex: 8;
`;

export const ImageItemProvider = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const TitleItemProvider = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10px;
`;
export const TitleItemDateProvider = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TitleProvider = styled.Text<PropsTagsFilter>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(22)}px;
  text-align: right;

  ${({ theme, tagsSelected }) =>
    tagsSelected &&
    css`
      font-size: ${RFValue(18)}px;
    `}
`;

export const AreaRatingProvider = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const AreaIcons = styled.View`
  flex: 2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.red_closed};
`;

export const AreaFavIcon = styled.TouchableOpacity<
  PropsTagsFilter | PropsTagsFavIcon
>`
  width: 48px;
  height: 48px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bon_jour};
  position: absolute;
  border-radius: 24px;
  left: 78%;

  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour};

  ${({ theme, tagsSelected }) =>
    tagsSelected &&
    css`
      width: 32px;
      height: 32px;
      border-radius: 16px;
      left: 85%;
    `}

  ${({ theme, favProvider }) =>
    favProvider &&
    css`
      background-color: ${theme.colors.purple_luxury};
      border-color: ${theme.colors.bon_jour_light_shade};
    `}
`;

export const LoadingText = styled.ActivityIndicator``;

export const AreaTitleProvider = styled.View`
  flex: 3;
  justify-content: center;
  align-items: flex-start;
`;
export const AreaLoadingListProvider = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AreaButtonUpdate = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  margin-right: 5px;
  margin-left: 5px;

  height: 40px;
  width: 80%;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 24px;
`;

export const ButtonUpdateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;

export const AreaDistanceIcon = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const ModalChangeDistance = styled.Modal`
  flex: 1;
`;
export const AreaContentModalDistance = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AreaModalDistance = styled.View`
  width: 300px;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.bon_jour};
  justify-content: space-around;
  align-items: center;
  margin: 5px;
  border-radius: 12px;
`;
export const AreaTitleInputDistance = styled.View`
  width: 80%;
  height: 60px;
`;
export const AreaInputDistance = styled.View`
  width: 60%;
  height: 60px;
  border-style: solid;
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shadow};
  border-radius: 12px;
`;
export const TitleInputDistance = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
  text-align: left;
`;
export const InputDistance = styled(CurrencyInput).attrs({})<
  CurrencyInputProps | TextInputProps
>`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;
  margin-left: 5px;
`;
export const AreaButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const AreaButtonCancel = styled.TouchableOpacity`
  width: 30%;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
  background-color: ${({ theme }) => theme.colors.background_primary};
  border-radius: 12px;
`;
export const AreaButtonSave = styled.TouchableOpacity`
  width: 30%;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
  background-color: ${({ theme }) => theme.colors.success_chateau};
  border-radius: 12px;
`;
export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;

export const AreaButtonFinalizerRegister = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.success_chateau};
  border-radius: 12px;
  margin-bottom: 5px;
`;

export const ButtonFinalizerRegisterTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;
