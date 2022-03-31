import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Appointment } from '../../hooks/providerUser';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
  margin-top: 24px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 4px 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

export const AreaAppointment = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 8px;
`;

export const List = styled(FlatList as new () => FlatList<Appointment>)``;

export const AreaImageProvider = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.bon_jour};

  border-radius: 40px;
  overflow: hidden;

  margin: 3px;
`;

export const ImageProvider = styled(FastImage)`
  width: 100%;
  height: 100%;
`;
export const AreaNameDateHourProvider = styled.View`
  flex: 3;

  justify-content: space-around;
`;

export const AreaNameProvider = styled.View`
  flex: 1;
`;

export const NameProvider = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;
  text-align: center;
`;

export const AreaDateHourProvider = styled.View`
  flex: 1;
`;

export const DateHourProvider = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;
  text-align: center;
`;

export const AreaAmountIcon = styled.View`
  flex: 2;
`;

export const AreaIcon = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AreaAmount = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;
  text-align: left;
`;
