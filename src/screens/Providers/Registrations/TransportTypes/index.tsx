import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaLocalClient,
  AreaTextInfoDateLocal,
  AreaAppointmentButton,
  AreaIcon,
  AreaPhoto,
  PhotoClientAppointment,
  IconInfoDateLocal,
  AreaInfoLocalDate,
  AreaInfoLocal,
  IconInfoLocal,
  AreaTextInfoLocal,
  TextInfoLocal,
  AreaAmount,
  ValueAmount,
  AreaInfoDate,
  AreaLocals,
  AreaLocalTitle,
  AreaLocalsContent,
  AreaCheckBox,
  AreaTitleLocalType,
  TitleLocalType,
  AreaLocalOwn,
  AreaLocalOwners,
  AreaLocalOwnLocals,
  AreaLocalOwnLocal,
  IconMaterialCommunity,
  AreaCheckBoxAddAddress,
  AreaCheckBoxLocal,
  AreaLocalsAvailable,
  AreaIconRemoveLocal,
  TitleLocal,
  TitleAddLocal,
  AreaTransportTypeProvider,
  AreaIconMark,
  AreaTransportTypeProviderTitle,
  TransportTypeProviderTitle,
  AreaInputAmount,
  TextInputSC,
  AreaButtonSave,
  TitleButtonSave,
} from './styles';
import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../../hooks/providerUser';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { useLocal } from '../../../../hooks/local';
import { LOCALS_TYPES_ENUM } from '../../../../enums/localsTypes.enum';
import { useClientUser } from '../../../../hooks/clientUser';
import { getValueAmount } from '../../../../utils/formatValueAmount';
import { useTransport } from '../../../../hooks/transport';
import {
  TransportTypeProviderEnum,
  TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM,
} from '../../../../enums/transportTypeProvider.enum';
import { onlyNumber } from '../../../../utils/onlyNumber';

export interface Focusable {
  focus(): void;
}

interface TransportsAvailableType {
  selected: boolean;
  id: string;
  name: TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM;
  description: null;
  active: boolean;
  amount?: string;
}

export function RegistrationsAvailabilitiesTransportTypesProvider() {
  const [transportTypeListOriginal, setTransportTypeListOriginal] = useState<
    TransportsAvailableType[]
  >([] as TransportsAvailableType[]);
  const [transportTypeList, setTransportTypeList] = useState<
    TransportsAvailableType[]
  >([] as TransportsAvailableType[]);
  const [changeTransportType, setChangeTransportType] =
    useState<boolean>(false);
  const [amountTransport, setAmountTransport] = useState<string>('0');
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { getAllTransportTypes, transportTypes } = useTransport();
  const { userProvider, loadUserData, createUpdateTransportTypeByProvider } =
    useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    transports_types: transportsTypesProvider,
  } = userProvider;

  useEffect(() => {
    loadUserData();
    getAllTransportTypes();
    const transportsAvailable = transportTypes.map(transport => {
      if (
        TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM[transport.name] ===
        TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM.provider
      ) {
        const amount =
          transportsTypesProvider &&
          transportsTypesProvider?.find(
            transport_type_provider =>
              transport_type_provider.transport_type_id === transport.id,
          )?.amount;

        setAmountTransport(
          !!amount && Number(amount) > 0 ? String(Number(amount) / 100) : '0',
        );
        return {
          ...transport,
          selected:
            transportsTypesProvider &&
            transportsTypesProvider.some(
              transportTypeProvider =>
                transportTypeProvider.transport_type_id === transport.id,
            ),
          amount:
            !!amount && Number(amount) > 0 ? String(Number(amount) / 100) : '0',
        };
      }

      return {
        ...transport,
        selected:
          transportsTypesProvider &&
          transportsTypesProvider.some(
            transportTypeProvider =>
              transportTypeProvider.transport_type_id === transport.id,
          ),
      };
    });
    setTransportTypeListOriginal(transportsAvailable);
    setTransportTypeList(transportsAvailable);
    return () => {
      // deixar variaveis no default
    };
  }, []);

  useEffect(() => {
    const transportsAvailable = transportTypes.map(transport => {
      if (
        TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM[transport.name] ===
        TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM.provider
      ) {
        const amount =
          transportsTypesProvider &&
          transportsTypesProvider?.find(
            transport_type_provider =>
              transport_type_provider.transport_type_id === transport.id,
          )?.amount;

        setAmountTransport(
          !!amount && Number(amount) > 0
            ? String(Number(amount) / (10 * 10 * 10))
            : '0',
        );
        return {
          ...transport,
          selected:
            transportsTypesProvider &&
            transportsTypesProvider.some(
              transportTypeProvider =>
                transportTypeProvider.transport_type_id === transport.id,
            ),
          amount:
            !!amount && Number(amount) > 0
              ? String(Number(amount) / (10 * 10 * 10))
              : '0',
        };
      }

      return {
        ...transport,
        selected:
          transportsTypesProvider &&
          transportsTypesProvider.some(
            transportTypeProvider =>
              transportTypeProvider.transport_type_id === transport.id,
          ),
      };
    });
    setTransportTypeListOriginal(transportsAvailable);
    setTransportTypeList(transportsAvailable);
  }, [transportTypes]);

  useEffect(() => {
    setChangeTransportType(
      !transportTypeList.every(transportType =>
        transportTypeListOriginal.some(
          transportTypeOriginal =>
            transportType.id === transportTypeOriginal.id &&
            transportType.selected === transportTypeOriginal.selected &&
            transportType.amount === transportTypeOriginal.amount,
        ),
      ),
    );
  }, [transportTypeList]);

  useEffect(() => {
    setChangeTransportType(
      transportTypeListOriginal.some(
        transportTypeOriginal =>
          transportTypeOriginal.amount &&
          transportTypeOriginal.amount !== amountTransport,
      ),
    );
  }, [amountTransport]);

  function handleSelectedUnselect(item: TransportsAvailableType) {
    const newItemListSelected = transportTypeList.map(transportType => ({
      ...transportType,
      selected:
        transportType.id === item.id
          ? !transportType.selected
          : transportType.selected,
    }));
    setTransportTypeList(newItemListSelected);
  }

  async function handleUpdateTransportTypes() {
    try {
      const transportsSelects = transportTypeList
        .filter(transportType => transportType.selected)
        .map(transportType => ({
          transport_type_id: transportType.id,
          amount: transportType.amount && onlyNumber(String(amountTransport)),
        }));
      await createUpdateTransportTypeByProvider(transportsSelects);
      setChangeTransportType(false);
      navigation.replace('HomeProviderStack');
    } catch {
      setChangeTransportType(true);
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
                image={
          imageProfile &&
          imageProfile.length > 0 &&
          imageProfile[0].image &&
          imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaLocals>
            <AreaLocalTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Transportes habilitados</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <Icon
                      name="send"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaLocalTitle>
            <AreaLocalsContent>
              {transportTypeList &&
                transportTypeList.map((transportTypeProvider, index) => (
                  <AreaTransportTypeProvider
                    key={index.toString()}
                    selected={!!transportTypeProvider.selected}
                  >
                    <AreaIconMark
                      onPress={() =>
                        handleSelectedUnselect(transportTypeProvider)
                      }
                    >
                      <Icon
                        name={
                          transportTypeProvider.selected
                            ? 'check-square'
                            : 'square'
                        }
                        size={RFValue(25)}
                        color={
                          transportTypeProvider.selected
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    </AreaIconMark>
                    <AreaTransportTypeProviderTitle>
                      <TransportTypeProviderTitle
                        selected={!!transportTypeProvider.selected}
                      >
                        {
                          TRANSPORT_TYPE_PROVIDER_TRANSLATE_ENUM[
                            transportTypeProvider.name
                          ]
                        }
                      </TransportTypeProviderTitle>
                    </AreaTransportTypeProviderTitle>
                    <AreaInputAmount>
                      {transportTypeProvider &&
                        TransportTypeProviderEnum[
                          transportTypeProvider.name
                        ] === TransportTypeProviderEnum.provider && (
                          <TextInputSC
                            value={amountTransport}
                            onChangeValue={setAmountTransport}
                            placeholder="valor / km"
                            editable={transportTypeProvider.selected}
                            error={false}
                            prefix="R$ "
                            suffix="/km"
                            signPosition="beforePrefix"
                            delimiter="."
                            precision={2}
                            separator=","
                          />
                        )}
                    </AreaInputAmount>
                  </AreaTransportTypeProvider>
                ))}
              {changeTransportType && (
                <AreaTransportTypeProvider
                  selected={!!changeTransportType}
                  onPress={handleUpdateTransportTypes}
                >
                  <AreaTransportTypeProviderTitle>
                    <TransportTypeProviderTitle selected={changeTransportType}>
                      Salvar
                    </TransportTypeProviderTitle>
                  </AreaTransportTypeProviderTitle>
                </AreaTransportTypeProvider>
              )}
            </AreaLocalsContent>
          </AreaLocals>
        )}
      </Form>
    </Container>
  );
}
