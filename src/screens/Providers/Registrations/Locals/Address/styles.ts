import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

interface AreaInfoProps {
  color?: string;
}
interface AreaInfoDateProps {
  size?: number;
}
interface ParamsAreaCityIcons {
  direction: 'left' | 'right';
  selected: boolean;
  error: boolean;
}
interface ParamsAreaCityText {
  selected: boolean;
  error: boolean;
}
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Form = styled.ScrollView`
  flex: 1;

  margin-top: 10px;

  padding: 0 5px;
`;
export const AreaLoadingLocal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AreaButtonModalMap = styled.TouchableOpacity`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.success_chateau_green};
  border-radius: 12px;
  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour};
  margin-bottom: 10px;
`;

export const AreaFormInputs = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

export const AreaMapView = styled.View`
  flex: 1;
`;
export const MapViewComponent = styled(MapView)`
  flex: 1;
`;
export const AreaAppointmentContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;
  justify-content: flex-start;

  padding: 3px;

  border: solid;
  border-color: ${({ theme }) => theme.colors.header};
  border-width: 5px;
`;

export const AreaLogoTitle = styled.View`
  height: ${RFValue(300)}px;
  width: ${RFValue(300)}px;
  margin-top: 10px;
`;

export const AreaTitle = styled.View`
  flex: 3;
  justify-content: center;
  padding-left: 10px;
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
export const IconCommunityIcons = styled(MaterialCommunityIcons)``;

export const Footer = styled.View`
  flex: 1;
`;

export const AreaAppointmentButton = styled.TouchableOpacity<AreaInfoProps>`
  height: 80px;

  background-color: ${({ theme, color }) => color || theme.colors.header};

  padding-top: 5px;
  padding-bottom: 5px;

  flex-direction: row;

  justify-content: flex-start;

  padding-left: 5px;

  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaPhoto = styled.View`
  flex: 1;
  width: 70px;
  height: 70px;

  border-radius: 35px;
  overflow: hidden;

  margin-right: 5px;
`;

export const PhotoClientAppointment = styled(FastImage)`
  width: 70px;
  height: 70px;
`;

export const AreaInfoLocalDate = styled.View`
  flex: 4;

  flex-direction: column;
`;

export const IconInfoDateLocal = styled.View`
  justify-content: center;
  align-items: center;

  padding-left: 5px;
  padding-right: 5px;

  background-color: ${({ theme }) => theme.colors.blue_catalina_dark_shade};

  border-radius: 6px;
`;
export const AreaTextInfoDateLocal = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue_catalina_dark_shade};
  border-radius: 6px;

  margin-left: 5px;
`;
export const AreaInfoLocal = styled.View<AreaInfoProps>`
  flex: 1;

  flex-direction: row;

  background-color: ${({ color }) => color};

  border-radius: 12px;
`;

export const AreaInfoDate = styled.View<AreaInfoProps>`
  flex: 1;

  flex-direction: row;

  background-color: ${({ color }) => color};

  border-radius: 12px;
`;

export const IconInfoLocal = styled.View`
  justify-content: center;
  align-items: center;

  padding-left: 5px;
  padding-right: 5px;

  background-color: ${({ theme }) => theme.colors.text_detail};

  border-radius: 6px;
`;
export const AreaTextInfoLocal = styled.View`
  flex: 2;

  justify-content: center;

  padding-left: 5px;

  margin-left: 5px;

  background-color: ${({ theme }) => theme.colors.text_detail};

  border-radius: 6px;
`;

export const TextInfoLocal = styled.Text<AreaInfoDateProps>`
  font-size: ${({ size }) => RFValue(size || 16)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const AreaAmount = styled.View`
  flex: 1;
  border-radius: 6px;
  margin-left: 3px;
  margin-right: 3px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.success_chateau_green};
`;
export const ValueAmount = styled.Text<AreaInfoDateProps>`
  font-size: ${({ size }) => RFValue(size || 16)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
`;
export const AreaSymbolAmount = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;
export const AreaValueAmount = styled.View`
  flex: 1;

  flex-direction: row;
`;
export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const AreaCitySelected = styled.TouchableOpacity<ParamsAreaCityText>`
  margin-bottom: 10px;
  height: 60px;
  width: 100%;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main_light};

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  border-radius: 12px;

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colors.desative_shade};
    `}

  ${({ theme, selected }) =>
    selected &&
    css`
      border-color: ${theme.colors.background_primary};
      background-color: ${theme.colors.main_light};
    `}

  ${({ theme, error }) =>
    error &&
    css`
      border-color: ${theme.colors.red_ku_crimson};
    `}
`;
export const AreaCityIcon = styled.TouchableOpacity<ParamsAreaCityIcons>`
  flex: 1;
  justify-content: center;
  align-items: center;

  ${({ theme, direction }) =>
    direction === 'left'
      ? css`
          border-style: solid;
          border-right-width: 1.5px;
          border-color: ${theme.colors.bon_jour_dark_shade};
        `
      : css`
          border-style: solid;
          border-left-width: 1.5px;
          border-color: ${theme.colors.bon_jour_dark_shade};
        `}

  ${({ theme, selected }) =>
    selected &&
    css`
      border-color: ${theme.colors.background_primary};
    `}

  ${({ theme, error }) =>
    error &&
    css`
      border-color: ${theme.colors.red_ku_crimson};
    `}
`;

export const AreaTextCitySelected = styled.View<ParamsAreaCityText>`
  flex: 4;
  border-left-width: 1.5px;
  border-right-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  justify-content: center;
  align-items: center;

  ${({ theme, selected }) =>
    selected &&
    css`
      border-color: ${theme.colors.background_primary};
    `}

  ${({ theme, error }) =>
    error &&
    css`
      border-color: ${theme.colors.red_ku_crimson};
    `}
`;

export const TextCitySelected = styled.Text<AreaInfoProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme, color }) => color || theme.colors.bon_jour_dark_shade};
  font-size: ${RFValue(20)}px;
  text-align: center;
`;
