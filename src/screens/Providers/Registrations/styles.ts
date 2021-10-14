import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { OptionRegister } from '.';

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

export const AreaOptions = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;

export const AreaPageTitle = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.bon_jour_light_shade};
  border-radius: 12px;

  margin-bottom: 10px;

  border: solid;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.shape};
`;

export const AreaOptionsContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  justify-content: space-between;
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

export const Title = styled.Text<AreaInfoProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme, color }) => color || theme.colors.text};
`;

export const AreaIcon = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)``;
export const AreaOptionLine = styled.View`
  flex: 1;
  flex-direction: row;
`;
export const Footer = styled.View`
  flex: 1;
`;

export const List = styled(FlatList as new () => FlatList<OptionRegister>)``;

export const AreaOptionButton = styled.TouchableOpacity<AreaInfoProps>`
  flex: 1;

  height: 100px;

  margin-left: 5px;
  margin-right: 5px;

  background-color: ${({ theme, color }) => color || theme.colors.main_light};

  border: solid;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.shape};

  border-radius: 12px;
`;
export const AreaOptionImage = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;
export const AreaOptionSubTitle = styled.View`
  flex: 1;
`;
export const SubTitle = styled.Text<AreaInfoProps>`
  color: ${({ theme, color }) => color || theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  text-align: center;
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
