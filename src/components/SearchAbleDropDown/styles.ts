import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;

  justify-content: flex-start;

  margin-bottom: 10px;

  border-radius: 15px;
`;

export const AreaError = styled.View`
  height: 30px;
  width: 100%;

  background-color: ${({ theme }) =>
    theme.colors.warning_buttercup_light_shade};

  justify-content: center;

  border-radius: 5px;

  padding-left: 10px;

  margin-bottom: 3px;
`;

export const Error = styled.Text`
  text-align: left;
  background-color: ${({ theme }) => theme.colors.red_ku_crimson};
  color: ${({ theme }) => theme.colors.bon_jour_light_shade};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  border-radius: 5px;
  margin: 7px;
  padding-left: 5px;
  width: 50%;
  font-size: ${RFValue(12)}px;
`;
export const AreaInputText = styled.View`
  height: 60px;
  width: 100%;

  padding-left: 15px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour};

  border-radius: 15px;

  margin-bottom: 5px;

  background-color: ${({ theme }) => theme.colors.main_light};
`;

export const InputText = styled.TextInput`
  width: 100%;
  height: 100%;

  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const AreaList = styled(ScrollView)`
  flex: 1;

  margin-bottom: 3px;
`;

export const AreaItemList = styled(TouchableOpacity)`
  justify-content: center;
  align-items: flex-start;

  height: 50px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.main};

  margin-bottom: 5px;

  padding-left: 15px;
`;

export const ItemContent = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background_primary};
`;
