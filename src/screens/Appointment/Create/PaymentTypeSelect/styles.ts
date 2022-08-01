import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import MapView from 'react-native-maps';

interface AreaPaymentTypeSelectProps {
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

export const AreaButtonPaymentTypes = styled.ScrollView``;

export const AreaPaymentType = styled.View<AreaPaymentTypeSelectProps>`
  height: 80px;
  width: 100%;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  margin-top: 12px;
  margin-bottom: 12px;

  padding-right: 10px;
  ${({ theme, select }) =>
    select &&
    css`
      background-color: ${theme.colors.success};
    `}
`;

export const AreaTitleAmountPaymentType = styled.View`
  flex: 3;

  flex-direction: row;

  justify-content: center;
  align-items: center;
`;
export const AreaPaymentTypeTitle = styled.View`
  flex: 1;

  justify-content: center;
`;
export const AreaTitlePaymentType = styled.View`
  flex: 2;

  justify-content: space-between;
  align-items: flex-start;

  padding-left: 5px;
`;
export const AreaAmountPaymentType = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const PaymentTypeTitleName = styled.Text<AreaPaymentTypeSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const PaymentTypeTitle = styled.Text<AreaPaymentTypeSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;

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
