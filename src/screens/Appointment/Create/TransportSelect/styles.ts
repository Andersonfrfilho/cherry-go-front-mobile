import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import MapView from 'react-native-maps';

export const HEIGHT_MAP_VIEW_COMPONENT = 420;
interface AreaTransportTypeSelectProps {
  select?: boolean;
  expand?: boolean;
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

export const AreaIconSelect = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const AreaButtonTransportTypes = styled.ScrollView``;

export const AreaTransportTypeExpand = styled.View<AreaTransportTypeSelectProps>`
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  margin-top: 12px;
  margin-bottom: 12px;

  ${({ theme, select }) =>
    select &&
    css`
      background-color: ${theme.colors.success};
    `}
  ${({ theme, expand }) =>
    expand &&
    css`
      height: 500px;
    `}
`;
export const AreaTransportType = styled.View<AreaTransportTypeSelectProps>`
  height: 80px;
  width: 100%;

  flex-direction: row;
`;
export const AreaMapExpand = styled.View`
  height: 420px;
  width: 100%;
`;
export const MapViewComponent = styled(MapView)`
  flex: 1;
  width: 100%;
  height: ${HEIGHT_MAP_VIEW_COMPONENT}px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;
export const AreaTitleAmountTransportType = styled.View`
  flex: 3;

  flex-direction: row;

  justify-content: center;
  align-items: center;
`;
export const AreaTransportTypeTitle = styled.View`
  flex: 1;

  justify-content: center;
`;
export const AreaTitleTransportType = styled.View`
  flex: 2;

  justify-content: space-between;
  align-items: flex-start;

  padding-left: 5px;
`;
export const AreaAmountTransportType = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-start;
`;
export const TransportTypeTitleName = styled.Text<AreaTransportTypeSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const TransportTypeTitle = styled.Text<AreaTransportTypeSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(14)}px;

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
