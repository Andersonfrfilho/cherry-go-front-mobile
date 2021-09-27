import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.header};

  margin-top: ${getStatusBarHeight() + 12}px;

  flex-direction: row;

  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const AreaName = styled.View`
  flex: 3;
  padding-left: 10px;
  padding-top: 10px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(24)}px;
  text-transform: uppercase;
`;

export const AreaButtonPhoto = styled(TouchableOpacity)`
  width: 80px;

  background-color: ${({ theme }) => theme.colors.bon_jour};

  border-radius: 50px;
  overflow: hidden;
`;

export const Photo = styled(FastImage)`
  width: 100%;
  height: 100%;
`;
