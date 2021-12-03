import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

interface Props {
  color?: string;
  title?: boolean;
}
export const Modal = styled.Modal`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const AreaHeader = styled.View`
  flex-direction: row;
  height: 60px;
  padding: 1.5px;
`;
export const AreaInputSearch = styled.View`
  flex-direction: row;
  height: 60px;
  padding: 1.5px;
  border: solid;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;
`;
export const AreaWithoutHeader = styled.View`
  flex: 5;
`;
export const AreaInputText = styled.View`
  flex: 4;
`;
export const TextInput = styled.TextInput`
  flex: 1;
  margin-left: 5px;
`;
export const AreaButtonIconBack = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;
`;
export const AreaButtonIcon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AreaMapView = styled.View`
  flex: 1;

  padding-left: 3.5px;
  padding-right: 3.5px;
`;
export const Item = styled.TouchableOpacity`
  height: 60px;
  width: 100%;

  border-bottom-width: 3px;
  border-color: ${({ theme }) => theme.colors.background_primary};
`;
export const ItemTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(24)}px;
  text-align: left;
  margin-left: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Icon = styled(Feather)``;
export const MaterialCommunityIcon = styled(MaterialCommunityIcons)``;

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
export const TitleLocal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(12)}px;
  text-align: center;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 12px;
`;

export const MapViewComponent = styled(MapView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const AreaMarker = styled.View`
  left: 50%;
  margin-left: -24px;
  margin-top: -48px;
  position: absolute;
  top: 50%;
  height: 48px;
  width: 48px;
`;
export const AreaTitleAddress = styled.View`
  left: 5%;
  position: absolute;
  top: 5%;
  height: 48px;
  width: 250px;

  justify-content: flex-start;
`;

export const AreaPositionMarker = styled.TouchableOpacity`
  left: 85%;
  position: absolute;
  top: 5%;
  height: 48px;
  width: 48px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 24px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.background_primary};
`;

export const AreaButtonSaved = styled.TouchableOpacity`
  left: 25%;
  margin-left: -24px;
  margin-top: -48px;
  position: absolute;
  top: 90%;
  height: 60px;
  width: 250px;
  background-color: ${({ theme }) => theme.colors.success_chateau};
  text-align: left;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
`;
