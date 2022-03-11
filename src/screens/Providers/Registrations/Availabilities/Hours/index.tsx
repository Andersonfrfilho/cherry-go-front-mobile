import React, { useEffect, useState, createRef } from 'react';
import brazilLocale from 'date-fns/locale/pt-BR';
import { Button, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import {
  Container,
  AreaDaysAvailabilityTitle,
  AreaDaysAvailability,
  AreaDaysAvailabilityContent,
  AreaTitle,
  Title,
  Form,
  Icon,
  SelectedDayButton,
  AreaIcon,
  List,
  AreaTextDayAvailability,
  TextInfoLocal,
  AreaButtonSave,
  AreaHour,
  HourTitle,
  AreaSelectedTimeRange,
  AreaSelectedTimeStart,
  AreaSelectedTimeEnd,
  AreaSendImage,
  AreaViewTimeStart,
  AreaViewTimeEnd,
  AreaExcludeTime,
  AreaAlreadyTimeRange,
  AreaViewRange,
  AreaSendHourAvailable,
} from './styles';

import { useCommon } from '../../../../../hooks/common';
import { WarningText } from '../../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../../routes';
import { HeaderProfile } from '../../../../../components/HeaderProfile';
import {
  Appointment,
  useProviderUser,
} from '../../../../../hooks/providerUser';
import { getPlatformDate } from '../../../../../utils/getPlatformDate';
import { getValueAmount } from '../../../../../utils/formatValueAmount';
import { Load } from '../../../../../components/Load';
import { useError } from '../../../../../hooks/error';
import { ButtonIcon } from '../../../../../components/ButtonIcon';
import { DaySelected } from '../Days';
import { SelectedPicker } from '../../../../../components/SelectedPicker';
import { getHoursAvailable } from '../../../../../utils/getHourAvailable';

interface ItemSelected {
  label: string;
  value: string;
}
interface HandleAddHoursAvailableParam {
  startHour: string;
  endHour: string;
}
export interface HoursSelected {
  hour: string;
  selected: boolean;
}
interface HourSelectedFunctionParamDTO {
  indexSelected: number;
  hoursParam: Array<HoursSelected>;
  orderButton: number;
}
interface Params {
  hoursForSelected: Array<HoursSelected>;
}

export interface Focusable {
  focus(): void;
}
export function RegistrationsAvailabilitiesHoursProvider() {
  const [hourListSelectedAvailable, setHourListSelectedAvailable] = useState([
    { value: '', label: 'Inicio:' },
  ] as Array<ItemSelected>);
  const [hourListSelectedEndAvailable, setHourListSelectedEndAvailable] =
    useState([{ value: '', label: 'Fim:' }] as Array<ItemSelected>);
  const [hourInitialSelected, setHourInitialSelected] = useState<string>('');
  const [hourEndSelected, setHourEndSelected] = useState<string>('');
  const [selectedHoursProvider, setSelectedHoursProvider] = useState(
    [] as HoursSelected[],
  );
  const [countSelected, setCountSelected] = useState(0);
  const [firstIndex, setFirstIndex] = useState<number | null>(null);

  const refInitialHour = createRef<Focusable>();
  const refFinalHour = createRef<Focusable>();

  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const {
    userProvider,
    loadUserData,
    availableDaysToProviderWork,
    hoursAvailable,
    addHoursProviderWorkAvailable,
    removeHourProviderWorkAvailable,
  } = useProviderUser();

  const route = useRoute();
  const { hoursForSelected } = route.params as Params;
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    hours,
  } = userProvider;

  useEffect(() => {
    setSelectedHoursProvider(hoursForSelected);

    const hoursFormatted = hoursAvailable
      .filter(hourAvailable =>
        hoursForSelected.some(
          hourForSelected =>
            hourForSelected.hour === hourAvailable && !hourForSelected.selected,
        ),
      )
      .map(hour => ({
        value: hour,
        label: hour,
      }));

    const listFormattedStartInterval = hoursFormatted.slice(
      0,
      hoursFormatted.length - 1,
    );
    setHourListSelectedAvailable([
      { value: '', label: 'Inicio:' },
      ...listFormattedStartInterval,
    ]);
  }, []);

  async function handleSendSelectedHours({
    indexSelected,
    hoursParam,
    orderButton,
  }: HourSelectedFunctionParamDTO) {
    if (orderButton === 0) {
      hoursSelected = hoursParam.map(hour => ({
        ...hour,
        selected: !hour.selected,
      }));
      setFirstIndex(indexSelected);
      setCountSelected(countSelected + 1);
    }

    if (orderButton === 1) {
      hoursSelected = hoursParam.map(hour => ({
        ...hour,
        selected: !hour.selected,
      }));
      setFirstIndex(indexSelected);
      setCountSelected(countSelected + 1);
    }
  }

  function handleHourInitialSelected(value: string, index: number) {
    setHourInitialSelected(value);
    setHourEndSelected('');
    setHourListSelectedEndAvailable([
      { value: '', label: 'Fim:' },
      ...hourListSelectedAvailable.slice(index + 1),
      {
        value: hoursAvailable[hoursAvailable.length - 1],
        label: hoursAvailable[hoursAvailable.length - 1],
      },
    ]);
  }

  function handleHourEndSelected(value: string) {
    setHourEndSelected(value);
  }

  async function handleAddHoursAvailable({
    endHour,
    startHour,
  }: HandleAddHoursAvailableParam) {
    await addHoursProviderWorkAvailable({ endHour, startHour });
    setHourInitialSelected('');
    setHourEndSelected('');
    setHourListSelectedEndAvailable([
      { value: '', label: 'Fim:' },
    ] as Array<ItemSelected>);
  }

  async function handleRemoveHoursAvailable(idHours: string) {
    await removeHourProviderWorkAvailable(idHours);
  }

  useEffect(() => {
    const hoursNewForSelected = getHoursAvailable({ hoursAvailable, hours });
    setSelectedHoursProvider(hoursNewForSelected);

    const hoursFormatted = hoursAvailable
      .filter(hourAvailable =>
        hoursNewForSelected.some(
          hourNewForSelected =>
            hourNewForSelected.hour === hourAvailable &&
            !hourNewForSelected.selected,
        ),
      )
      .map(hour => ({
        value: hour,
        label: hour,
      }));

    const listFormattedStartInterval = hoursFormatted.slice(
      0,
      hoursFormatted.length - 1,
    );
    setHourListSelectedAvailable([
      { value: '', label: 'Inicio:' },
      ...listFormattedStartInterval,
    ]);
  }, [hoursAvailable, userProvider]);

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
          imageProfile && imageProfile[0].image && imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading && <Load color={theme.colors.white_medium} />}
        {!isLoading && (
          <AreaDaysAvailability>
            <AreaDaysAvailabilityTitle>
              {appError && appError.message && (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              )}
              {!appError.code && (
                <>
                  <AreaTitle>
                    <Title>Horários disponiveis</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <Icon
                      name="calendar"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaDaysAvailabilityTitle>
            <AreaDaysAvailabilityContent>
              <AreaSelectedTimeRange>
                <AreaSelectedTimeStart>
                  <SelectedPicker
                    title="Inicio"
                    items={hourListSelectedAvailable}
                    selected={hourInitialSelected}
                    setSelected={(value: string, index: number) =>
                      handleHourInitialSelected(value, index)
                    }
                    error=""
                    selectedRef={refInitialHour}
                    enabled={!isLoading}
                  />
                </AreaSelectedTimeStart>
                <AreaSelectedTimeEnd>
                  <SelectedPicker
                    title="Fim"
                    items={hourListSelectedEndAvailable}
                    selected={hourEndSelected}
                    setSelected={(value: string) =>
                      handleHourEndSelected(value)
                    }
                    error=""
                    selectedRef={refFinalHour}
                    enabled={!isLoading && !!hourInitialSelected}
                  />
                </AreaSelectedTimeEnd>
                <AreaSendHourAvailable
                  onPress={() =>
                    handleAddHoursAvailable({
                      startHour: hourInitialSelected,
                      endHour: hourEndSelected,
                    })
                  }
                  disabled={!hourInitialSelected || !hourEndSelected}
                >
                  <Icon
                    name="plus"
                    size={RFValue(40)}
                    color={theme.colors.white_medium}
                  />
                </AreaSendHourAvailable>
              </AreaSelectedTimeRange>
              {hours &&
                hours?.map((hour, index) => (
                  <AreaAlreadyTimeRange key={index.toString()}>
                    <AreaViewTimeStart>
                      <Title>{hour.start_time}</Title>
                    </AreaViewTimeStart>
                    <AreaViewRange>
                      <Title> | </Title>
                    </AreaViewRange>
                    <AreaViewTimeEnd>
                      <Title>{hour.end_time}</Title>
                    </AreaViewTimeEnd>
                    <AreaExcludeTime
                      onPress={() => handleRemoveHoursAvailable(hour.id)}
                    >
                      <Icon
                        name="trash"
                        size={RFValue(28)}
                        color={theme.colors.white_medium}
                      />
                    </AreaExcludeTime>
                  </AreaAlreadyTimeRange>
                ))}
              <List
                keyExtractor={(item, index) => index.toString()}
                data={selectedHoursProvider}
                ListEmptyComponent={() => (
                  <AreaTitle>
                    <Title>Sem agendamentos no momento</Title>
                  </AreaTitle>
                )}
                renderItem={({ item, index }) => {
                  return (
                    <AreaHour
                      onPress={() => {
                        handleSendSelectedHours({
                          indexSelected: index,
                          hoursParam: selectedHoursProvider,
                          orderButton: countSelected,
                        });
                      }}
                      selected={item.selected}
                    >
                      <HourTitle>{item.hour}</HourTitle>
                    </AreaHour>
                  );
                }}
                numColumns={4}
              />
              <AreaButtonSave>
                <ButtonIcon
                  iconName="save"
                  title="Salvar"
                  disabled={isLoading}
                  loading={isLoading}
                  light
                  buttonColor={theme.colors.background_secondary}
                  textColor={theme.colors.background_primary}
                  iconColor={theme.colors.background_primary}
                  onPress={() => handleSendSelectedHours(selectedHoursProvider)}
                />
              </AreaButtonSave>
            </AreaDaysAvailabilityContent>
          </AreaDaysAvailability>
        )}
      </Form>
    </Container>
  );
}
