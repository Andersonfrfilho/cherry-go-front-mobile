import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

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

export const AreaAppointmentContent = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background_primary};

  border-radius: 12px;

  padding: 3px;
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

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const AreaTitle = styled.View`
  flex: 3;
  justify-content: center;
  padding-left: 10px;
`;
