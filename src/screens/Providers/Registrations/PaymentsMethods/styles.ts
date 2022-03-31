import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Appointment } from '../../../../hooks/providerUser';

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

export const AreaPaymentType = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;

export const AreaPaymentTypeTitle = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaPaymentTypeContent = styled.View`
  flex: 1;

  border-radius: 12px;
  justify-content: flex-start;

  padding: 3px;
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
export const AreaOnlinePaymentsTypes = styled.View`
  flex: 1;

  flex-direction: row;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};
`;
export const AreaSavedPaymentsTypes = styled.TouchableOpacity`
  flex: 1;

  flex-direction: row;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.success};

  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};
`;

export const AreaUpdatePaymentsAccountPerson = styled.TouchableOpacity`
  flex: 1;

  height: 80px;

  flex-direction: row;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.success_chateau};

  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};
`;
export const AreaTitleLine = styled.View`
  height: 80px;
  justify-content: center;
  align-items: center;
`;
export const AreaLogoTitle = styled.View`
  height: ${RFValue(300)}px;
  width: ${RFValue(300)}px;
  margin-top: 10px;
`;
export const AreaTitlePaymentMethod = styled.View`
  height: 80px;
  width: 100%;
  justify-content: center;
  padding-left: 10px;
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

export const AreaIconExclude = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const AreaIcon = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const AreaTitlePaymentType = styled.View`
  flex: 3;
  justify-content: center;
`;

export const TitlePaymentType = styled.Text<CheckSelected>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};
  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const TitlePaymentTypeButton = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const Icon = styled(Feather)``;

export const IconMaterialCommunityIcons = styled(MaterialCommunityIcons)``;

export const Footer = styled.View`
  flex: 1;
`;

export const List = styled(FlatList as new () => FlatList<Appointment>)``;

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
