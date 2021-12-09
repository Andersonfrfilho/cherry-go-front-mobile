import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { FlatList, TextInputProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';
import { Appointment } from '../../../hooks/providerUser';
import { IconMaterialCommunityIcons } from '../PaymentsMethods/styles';
import themeFile from '../../../../styles/theme';

interface CheckSelected {
  selected: boolean;
}

interface AreaInfoProps {
  color?: string;
}
interface AreaInfoDateProps {
  size?: number;
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

export const AreaLocals = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;
export const AreaLocalClient = styled.View`
  height: 80px;
`;
export const AreaLocalTitle = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaCheckBox = styled.TouchableOpacity<CheckSelected>`
  flex: 1;

  flex-direction: row;

  justify-content: space-around;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.text};

  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.success};
    `}
`;

export const AreaCheckBoxAddAddress = styled.TouchableOpacity<CheckSelected>`
  height: 60px;
  flex-direction: row;

  justify-content: space-around;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.text};

  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.success_chateau_green};
    `}
`;

export const AreaTitleLocalType = styled.View`
  flex: 3;
  justify-content: center;
`;
export const AreaLocalOwnLocals = styled.View`
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;

  justify-content: flex-start;
`;
export const AreaLocalOwnLocal = styled.View`
  flex: 1;

  justify-content: flex-start;
`;

export const AreaLocalsAvailable = styled.ScrollView`
  flex-grow: 1;
`;

export const TitleLocalType = styled.Text<CheckSelected>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};
  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const TitleAddLocal = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.main_light};
`;

export const TitleLocal = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};
`;
export const AreaLocalsContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;
  justify-content: flex-start;

  padding: 3px;

  /* border: solid;
  border-color: ${({ theme }) => theme.colors.header};
  border-width: 5px; */
`;

export const AreaLocalOwners = styled.View`
  flex: 1;
`;

export const AreaLocalOwn = styled.View`
  height: 80px;
`;
export const AreaCheckBoxLocal = styled.View`
  height: 80px;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.shape_medium};
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

export const AreaIconRemoveLocal = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)``;
export const IconMaterialCommunity = styled(IconMaterialCommunityIcons)``;

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

export const AreaTransportTypeProvider = styled.TouchableOpacity<CheckSelected>`
  flex-direction: row;

  height: 60px;

  background-color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 5px;

  border-radius: 12px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.shape_medium};

  padding: 3px;

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.success};
    `}
`;
export const AreaIconMark = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const AreaTransportTypeProviderTitle = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
export const TransportTypeProviderTitle = styled.Text<CheckSelected>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.background_primary};
  text-align: left;
  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const AreaInputAmount = styled.View`
  flex: 2;
`;

export const TextInputSC = styled(CurrencyInput).attrs({
  placeholderTextColor: themeFile.colors.bon_jour_dark_shade,
})<CurrencyInputProps | TextInputProps>`
  width: 100%;
  height: 100%;

  padding: 10px 10px;

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.background_primary};

  margin-bottom: 8px;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  ${({ theme, editable }) =>
    !editable &&
    css`
      background-color: ${theme.colors.desative_shade};
      color: ${theme.colors.main_light};
    `}

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.red_devil};
    `}
`;
export const AreaButtonSave = styled.TouchableOpacity`
  flex: 1;
  height: 80px;
`;
export const TitleButtonSave = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.background_primary};
  text-align: left;
`;
