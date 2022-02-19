import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import FastImage from 'react-native-fast-image';

interface AreaTransportTypeSelectProps {
  select?: boolean;
  expand?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Body = styled.ScrollView`
  flex: 1;

  padding-left: 10px;
  padding-right: 10px;
`;
export const AreaProvider = styled.View`
  width: 100%;
  height: 80px;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-top: 10px;

  padding: 5px;
`;
export const AreaPhotoProvider = styled.View`
  flex: 1;
  border-radius: 36px;
  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  overflow: hidden;
`;
export const PhotoProvider = styled(FastImage)`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const AreaNameOldProvider = styled.View`
  flex: 5;

  padding: 5px;

  flex-direction: row;
`;
export const AreaNameProvider = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-start;

  padding-left: 10px;
`;
export const NameProvider = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(24)}px;
`;
export const AreaOldProvider = styled.View``;
export const OldProvider = styled.Text``;
// Area hour
export const AreaHour = styled.View`
  width: 100%;
  height: 80px;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  padding: 5px;

  margin-top: 10px;
`;

export const AreaIconHour = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const AreaHourText = styled.View`
  flex: 2;

  justify-content: center;
  align-items: flex-start;
`;
export const AreaDateHour = styled.View`
  flex: 4;
`;
export const AreaDate = styled.View`
  justify-content: center;
  align-items: flex-start;
`;
export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;
`;

export const HourText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(24)}px;
`;

// Area Service
export const AreaServices = styled.ScrollView`
  padding-left: 10px;
  padding-right: 10px;
`;

export const AreaService = styled.View`
  width: 100%;
  height: 60px;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  padding: 5px;

  margin-top: 10px;
`;
export const AreaServiceNameHour = styled.View`
  flex: 3;
`;
export const AreaServiceDuration = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-start;
`;
export const ServiceDuration = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;
`;

export const AreaServiceName = styled.View`
  flex: 2;

  justify-content: center;
  align-items: flex-start;
`;
export const ServiceName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;
export const AreaServicePrice = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-end;
`;
export const ServicePrice = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;
`;
export const AreaServicesTitle = styled.View`
  width: 100%;
  height: 60px;

  justify-content: center;
  align-items: center;
`;

export const ServicesTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.main_light};
  font-size: ${RFValue(24)}px;
`;

export const AreaServiceTotal = styled.View`
  width: 100%;
  height: 60px;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  padding: 5px;

  margin-top: 10px;
`;
export const ServiceTotal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;
`;
export const AreaServiceTotalTitle = styled.View`
  flex: 2;

  justify-content: center;
  align-items: flex-start;

  padding-left: 5px;
`;
export const ServiceTotalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;
export const AreaServiceTotalAmount = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-end;
`;
// Area Local
export const AreaLocal = styled.View`
  width: 100%;
  height: 600px;

  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  padding: 5px;

  margin-top: 10px;
`;
export const AreaAddressNumber = styled.View`
  width: 100%;
  height: 40px;
`;
export const AreaAddress = styled.View`
  flex: 2;
`;
export const AddressNumber = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;

export const AreaDistrictCityState = styled.View`
  width: 100%;
  height: 40px;
`;
export const DistrictCityState = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;

export const AreaCep = styled.View`
  width: 100%;
  height: 40px;
`;
export const Cep = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;
export const AreaAmount = styled.View`
  width: 100%;
  height: 40px;

  flex-direction: row;
`;
export const AreaTitleAmount = styled.View`
  flex: 3;
`;
export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;
export const AreaValueAmount = styled.View`
  flex: 1;
`;
export const TitleAmount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;

// Payment type
export const AreaPaymentType = styled.View`
  width: 100%;
  height: 80px;

  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-top: 10px;

  padding: 5px;
`;
export const AreaPaymentTypeTitle = styled.View`
  width: 100%;
  height: 40px;

  align-items: center;
`;
export const PaymentTitle = styled.Text``;
export const AreaPaymentTypeAmount = styled.View`
  flex-direction: row;
`;
export const PaymentTitleAmount = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-start;
`;
export const PaymentTypeTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;
`;
export const PaymentValueAmount = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;
export const PaymentTypeValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;
`;

// Transport
export const AreaIconSelect = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const AreaButtonTransportTypes = styled.ScrollView``;

export const AreaTransportTypeExpand = styled.View`
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main_light};

  border-radius: 12px;

  margin-top: 12px;
  margin-bottom: 12px;
`;
export const AreaTransportType = styled.View<AreaTransportTypeSelectProps>`
  width: 100%;
  height: 520px;

  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.main_light};

  border-style: solid;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  padding: 5px;

  margin-top: 10px;
`;
export const AreaMapExpand = styled.View`
  height: 420px;
  width: 100%;
`;
export const MapViewComponent = styled(MapView)`
  flex: 1;
  width: 100%;
  height: 420px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;
export const AreaTitleAmountTransportType = styled.View`
  flex: 3;

  flex-direction: row;

  justify-content: center;
  align-items: center;
`;
export const AreaTransportTypeTitle = styled.View`
  height: 40px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main_light};

  justify-content: center;
  align-items: center;
`;
export const AreaTitleTransportType = styled.View`
  width: 100%;
  height: 40px;

  justify-content: center;
  align-items: center;
`;
export const AreaAmountTransportType = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-start;
`;
export const TransportTypeTitleName = styled.Text<AreaTransportTypeSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(20)}px;

  ${({ theme, select }) =>
    select &&
    css`
      color: ${theme.colors.main_light};
    `}
`;

export const TransportTypeTitle = styled.Text<AreaTransportTypeSelectProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(18)}px;
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
