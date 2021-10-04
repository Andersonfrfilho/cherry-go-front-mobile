import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Body = styled.View`
  flex: 1;

  margin-top: 10px;

  padding: 0 20px;
`;

export const AreaAppointments = styled.ScrollView`
  flex: 1;
  padding-bottom: 10px;
`;

export const AreaAppointmentDateTitle = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaTitle = styled.View`
  flex: 4;
  justify-content: center;

  padding-left: 10px;
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

export const AreaAppointmentClientUser = styled.View`
  flex: 1;

  margin-bottom: 10px;
`;
export const AreaAppointmentClientTitleIcon = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaAppointmentClientsList = styled.View`
  flex: 1;

  padding: 0 10px;
`;

export const AreaAppointmentClient = styled.View`
  height: 60px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 12px;

  padding-left: 5px;
`;

export const AreaPhoto = styled.View`
  width: 50px;
  height: 50px;

  border-radius: 25px;
  overflow: hidden;
`;

export const PhotoClientAppointment = styled(FastImage)`
  width: 50px;
  height: 50px;
`;

export const AreaAppointmentAddress = styled.View`
  flex: 1;

  margin-bottom: 10px;
`;

export const AreaAppointmentAddressInformation = styled.View`
  flex: 1;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 12px;
`;

export const AreaAppointmentAddressTitleIcon = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;

export const AreaStreetNumber = styled.View`
  flex: 1;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main};

  margin-bottom: 10px;
`;

export const AreaTextStreet = styled.View`
  flex: 3;
  padding-left: 10px;
`;

export const TextStreet = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaTextNumber = styled.View`
  flex: 1;
`;

export const TextNumber = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaDistrictComplement = styled.View`
  flex: 1;

  flex-direction: row;
  margin-bottom: 10px;
`;
export const AreaTextDistrict = styled.View`
  flex: 3;
  padding-left: 10px;
`;
export const TextDistrict = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaTextComplement = styled.View`
  flex: 1;
`;

export const TextComplement = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaTextCityStateReference = styled.View`
  flex: 1;

  flex-direction: row;

  padding-left: 10px;
  margin-bottom: 10px;
`;

export const AreaTextCityState = styled.View`
  flex: 1;
`;

export const TextCityState = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaTextReference = styled.View`
  flex: 1;
`;
export const TextReference = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AreaAppointmentTransport = styled.View`
  flex: 1;
`;

export const AreaAppointmentTransportTitleIcon = styled.View`
  flex-direction: row;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 12px;

  margin-bottom: 10px;
`;
export const AreaTitleTransportItem = styled.View`
  height: 40px;

  justify-content: center;
  align-items: center;

  margin-bottom: 10px;

  border-bottom-width: 4px;
  border-bottom-color: ${({ theme }) => theme.colors.background_primary};
`;

export const AreaAppointmentTransportInformation = styled.View`
  flex: 1;
`;
export const AreaTransportOriginAddress = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;

export const AreaTransportDestinationAddress = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;
export const AreaTitleTransportItemInformation = styled.View`
  height: 40px;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;

  padding-left: 10px;
  padding-right: 10px;

  border-top-width: 4px;
  border-top-color: ${({ theme }) => theme.colors.background_primary};
`;

export const AreaAppointmentServices = styled.View`
  flex: 1;

  padding: 0 10px;
`;

export const AreaAppointmentServicesList = styled.View`
  flex: 1;
`;

export const AreaTransactionService = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;

export const AreaAppointmentTransactionServiceInformation = styled.View`
  flex: 1;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 12px;
`;
export const AreaTitleTransactionItem = styled.View`
  height: 40px;

  justify-content: center;
  align-items: center;

  margin-bottom: 10px;

  border-bottom-width: 4px;
  border-bottom-color: ${({ theme }) => theme.colors.background_primary};
`;
// export const AreaAppointmentContent = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.background_primary};

//   border-radius: 12px;
//   justify-content: flex-start;

//   padding: 3px;

//   border: solid;
//   border-color: ${({ theme }) => theme.colors.header};
//   border-width: 5px;
// `;

// export const AreaLogoTitle = styled.View`
//   height: ${RFValue(300)}px;
//   width: ${RFValue(300)}px;
//   margin-top: 10px;
// `;

// export const List = styled(FlatList as new () => FlatList<Appointment>)``;

// export const AreaAppointmentButton = styled.TouchableOpacity<AreaInfoProps>`
//   height: 80px;

//   background-color: ${({ theme, color }) => color || theme.colors.header};

//   padding-top: 5px;
//   padding-bottom: 5px;

//   flex-direction: row;

//   justify-content: flex-start;

//   padding-left: 5px;

//   border-radius: 12px;

//   margin-bottom: 10px;
// `;

// export const AreaInfoLocalDate = styled.View`
//   flex: 4;

//   flex-direction: column;
// `;

// export const IconInfoDateLocal = styled.View`
//   justify-content: center;
//   align-items: center;

//   padding-left: 5px;
//   padding-right: 5px;

//   background-color: ${({ theme }) => theme.colors.blue_catalina_dark_shade};

//   border-radius: 6px;
// `;
// export const AreaTextInfoDateLocal = styled.View`
//   flex: 1;

//   justify-content: center;
//   align-items: center;
//   background-color: ${({ theme }) => theme.colors.blue_catalina_dark_shade};
//   border-radius: 6px;

//   margin-left: 5px;
// `;
// export const AreaInfoLocal = styled.View<AreaInfoProps>`
//   flex: 1;

//   flex-direction: row;

//   background-color: ${({ color }) => color};

//   border-radius: 12px;
// `;

// export const AreaInfoDate = styled.View<AreaInfoProps>`
//   flex: 1;

//   flex-direction: row;

//   background-color: ${({ color }) => color};

//   border-radius: 12px;
// `;

// export const IconInfoLocal = styled.View`
//   justify-content: center;
//   align-items: center;

//   padding-left: 5px;
//   padding-right: 5px;

//   background-color: ${({ theme }) => theme.colors.text_detail};

//   border-radius: 6px;
// `;
// export const AreaTextInfoLocal = styled.View`
//   flex: 2;

//   justify-content: center;

//   padding-left: 5px;

//   margin-left: 5px;

//   background-color: ${({ theme }) => theme.colors.text_detail};

//   border-radius: 6px;
// `;

// export const TextInfoLocal = styled.Text<AreaInfoDateProps>`
//   font-size: ${({ size }) => RFValue(size || 16)}px;
//   color: ${({ theme }) => theme.colors.shape};
// `;

// export const AreaAmount = styled.View`
//   flex: 1;
//   border-radius: 6px;
//   margin-left: 3px;
//   margin-right: 3px;
//   justify-content: center;
//   align-items: center;
//   background-color: ${({ theme }) => theme.colors.success_chateau_green};
// `;
// export const ValueAmount = styled.Text<AreaInfoDateProps>`
//   font-size: ${({ size }) => RFValue(size || 16)}px;
//   color: ${({ theme }) => theme.colors.shape};
//   text-align: center;
// `;
// export const AreaSymbolAmount = styled.View`
//   flex: 1;
//   flex-direction: row;
//   justify-content: flex-start;
// `;
// export const AreaValueAmount = styled.View`
//   flex: 1;

//   flex-direction: row;
// `;
