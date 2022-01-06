import styled from 'styled-components/native';
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, FlatList } from 'react-native';
import { Image_Provider } from '../../hooks/providerUser';

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
  padding-left: 10px;
  padding-right: 10px;
`;

export const AreaHeader = styled.View`
  width: 100%;
  height: 80px;
`;

export const AreaNameDistanceIcon = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const AreaName = styled.View`
  flex: 5;
  justify-content: center;
`;
export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(24)}px;
`;

export const AreaDistanceIcon = styled.View`
  flex: 2;
  flex-direction: row;
  justify-content: center;
`;
export const AreaDistance = styled.View`
  flex: 1;
  justify-content: center;
`;
export const Distance = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;

export const AreaIconDistance = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(Feather)``;
export const IconFontAwesome = styled(FontAwesome)``;
export const IconMaterialCommunityIcons = styled(MaterialCommunityIcons)``;

export const AreaRatingAge = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const AreaRating = styled.View`
  flex: 5;
  flex-direction: row;
`;
export const AreaIconRating = styled.View`
  flex: 1;
`;

export const AreaAge = styled.View`
  flex: 1;
`;
export const Age = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(20)}px;
`;

export const AreaPhotosSlideList = styled.View`
  height: 380px;
  width: 100%;
`;

export const SlidePhotosList = styled(
  FlatList as new () => FlatList<Image_Provider>,
)``;
export const AreaPhoto = styled.View`
  width: ${Dimensions.get('window').width * 0.95}px;
  height: 100%;
`;

export const Photo = styled(FastImage)`
  flex: 1;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.main_light};
  border-radius: 12px;
`;

export const SeparatorPhoto = styled.View`
  margin-left: 12px;
  margin-right: 12px;
`;

export const AreaButtons = styled.View`
  flex: 1;
`;

export const AreaButtonServices = styled.View`
  flex: 1;
`;

export const ButtonServices = styled.TouchableOpacity`
  flex: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.main_light};
`;

export const TitleButtonService = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(24)}px;
`;

export const AreaButtonBackNext = styled.View`
  flex:1
  flex-direction:row;
  justify-content:space-between;
  margin-top: 5px;
  margin-bottom: 5px;
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
