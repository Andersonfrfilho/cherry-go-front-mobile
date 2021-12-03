import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  active: boolean;
}

export const Container = styled.View<Props>`
  height: 60px;

  ${({ active }) =>
    active &&
    css`
      flex: 1;
    `}

  margin-bottom: 10px;
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
export const AreaInputTextIcon = styled.View`
  height: 60px;
  width: 100%;

  flex-direction: row;

  margin-bottom: 5px;
`;

export const AreaInputText = styled.View`
  flex: 3;

  padding-left: 15px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border: solid;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
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
  color: ${({ theme }) => theme.colors.main};
`;

export const AreaItemList = styled(TouchableOpacity)`
  justify-content: center;
  align-items: flex-start;

  height: 60px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.main_light};

  margin-bottom: 5px;

  padding-left: 15px;

  border: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};
`;

export const ItemContent = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const AreaIcon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border: solid;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.bon_jour};
`;

export const IconMaterialCommunity = styled(MaterialCommunityIcons)``;
