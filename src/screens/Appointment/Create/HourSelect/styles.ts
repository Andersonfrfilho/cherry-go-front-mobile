import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { HourSelectInterface } from '../../../../hooks/clientUser';

interface AreaHourSelectProps {
  color?: string;
  available?: boolean;
  availablePeriod?: boolean;
  blockedTime?: boolean;
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

export const AreaButtons = styled.View`
  flex: 1;
  flex-direction: row;
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
export const AreaHours = styled.View`
  flex: 4;
`;

export const AreaSelectHours = styled.View``;
export const TitleHour = styled.Text``;

export const ListHours = styled(
  FlatList as new () => FlatList<HourSelectInterface>,
)``;

export const AreaHour = styled.TouchableOpacity<AreaHourSelectProps>`
  flex: 1;
  border-radius: 8px;
  height: 40px;
  margin: 3px;
  background-color: ${({ theme }) => theme.colors.bon_jour_dark_shade}
  justify-content: center;
  align-items: center;

  ${({ theme, available }) =>
    available &&
    css`
      background-color: ${theme.colors.success_chateau};
    `}

  ${({ theme, available, availablePeriod }) =>
    available &&
    !availablePeriod &&
    css`
      background-color: ${theme.colors.yellow_orange};
    `}

  ${({ theme, available, blockedTime }) =>
    available &&
    blockedTime &&
    css`
      background-color: ${theme.colors.blue_catalina_dark_shade};
    `}
`;
export const HourTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
`;
export const AreaDaysSelect = styled.View`
  flex-direction: row;

  height: 80px;
  width: 100%;

  margin-top: 10px;
  margin-bottom: 10px;

  border-radius: 12px;
`;
export const AreaAfterDay = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};

  border-radius: 12px;
`;
export const Icon = styled(Feather)``;

export const AreaTitleDay = styled.View`
  flex: 4;

  justify-content: center;
  align-items: center;
`;

export const TitleDay = styled.Text`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
`;

export const AreaBeforeDay = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};

  border-radius: 12px;
`;

export const AreaWithout = styled.View`
  flex: 1;
`;
