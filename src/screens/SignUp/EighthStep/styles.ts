import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TagSelected } from '.';

interface Props {
  selected: boolean;
}

export const Container = styled.View.attrs({})`
  flex: 1;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight() + 15}px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AreaTitle = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(35)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(18)}px;
  margin-top: 14px;
  text-align: center;
`;

export const AreaList = styled.View`
  flex: 6;
  justify-content: center;
  margin: 10px 0;
  padding: 5px 10px;
`;

export const List = styled(FlatList as new () => FlatList<TagSelected>)`
  flex: 1;
`;

export const AreaBoxTag = styled.View<Props>`
  flex: 1;
  height: 150px;

  border-width: 5px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.success_chateau : theme.colors.shape};

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  margin: 5px;
`;

export const AreaButtonTag = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  top: -20px;
`;

export const TitleTag = styled.Text`
  align-items: center;
`;

export const AreaTitleTag = styled.View`
  height: 20px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;

  top: -20px;

  align-items: center;
`;

export const AreaImageTag = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

export const ImageTag = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: 1;
`;
export const AreaIcon = styled.View`
  flex-direction: row;

  justify-content: flex-end;

  height: 20px;

  top: -10px;
  left: 10px;
`;

export const ButtonIconClosed = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 30px;

  background-color: ${({ theme }) => theme.colors.red_ku_crimson};

  border-radius: 15px;

  z-index: 2;
`;
export const Icon = styled(Feather)``;

export const AreaFooter = styled.View`
  flex: 1;
  justify-content: center;
  margin: 10px 0;
  padding: 10px 20px;
`;

export const ButtonIcons = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
