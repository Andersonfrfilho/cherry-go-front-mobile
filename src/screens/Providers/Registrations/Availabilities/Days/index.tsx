import React, { useEffect, useState } from 'react';
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
} from './styles';

import { useCommon } from '../../../../../hooks/common';
import { WarningText } from '../../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../../routes';
import { HeaderProfile } from '../../../../../components/HeaderProfile';
import {
  Appointment,
  ResponseGetAllAvailableDaysToProviderWorkService,
  useProviderUser,
} from '../../../../../hooks/providerUser';
import { getPlatformDate } from '../../../../../utils/getPlatformDate';
import { getValueAmount } from '../../../../../utils/formatValueAmount';
import { Load } from '../../../../../components/Load';
import { useError } from '../../../../../hooks/error';
import { ButtonIcon } from '../../../../../components/ButtonIcon';
import { navigate } from '../../../../../routes/RootNavigation';
import { DAYS_WEEK_ENUM } from '../../../../../enums/DaysProviders.enum';

export interface DaySelected {
  day: DAYS_WEEK_ENUM;
  selected: boolean;
  label: string;
}
interface Params {
  daysForSelected: Array<DaySelected>;
}

export interface Focusable {
  focus(): void;
}
export function RegistrationsAvailabilitiesDaysProvider() {
  const [selectedDaysProvider, setSelectedDaysProvider] = useState(
    [] as DaySelected[],
  );
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { userProvider, loadUserData, availableDaysToProviderWork } =
    useProviderUser();
  const route = useRoute();
  const { daysForSelected } = route.params as Params;
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;

  function handleSelectedDay(indexParam: number) {
    const newDaysSelected = selectedDaysProvider.map((day, index) => ({
      ...day,
      selected: indexParam === index ? !day.selected : day.selected,
    }));
    setSelectedDaysProvider(newDaysSelected);
  }

  useEffect(() => {
    setSelectedDaysProvider(daysForSelected);
  }, []);

  async function handleSendSelectedDays(days: DaySelected[]) {
    const daysSelected = days.filter(day => day.selected).map(day => day.day);

    await availableDaysToProviderWork(daysSelected);
    navigation.replace('RegistrationsProviderRoutesProviderStack');
  }

  function handleBackPage() {
    navigation.replace('RegistrationsAvailabilitiesProviderStack');
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
          <AreaDaysAvailability>
            <AreaDaysAvailabilityTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Dias disponiveis</Title>
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
              {selectedDaysProvider.map((day, index) => {
                return (
                  <SelectedDayButton
                    selected={day.selected}
                    onPress={() => handleSelectedDay(index)}
                    key={index.toString()}
                  >
                    <AreaIcon>
                      {day.selected ? (
                        <Icon
                          name="check-square"
                          size={RFValue(25)}
                          color={theme.colors.white_medium}
                        />
                      ) : (
                        <Icon
                          name="square"
                          size={RFValue(25)}
                          color={theme.colors.white_medium}
                        />
                      )}
                    </AreaIcon>
                    <AreaTextDayAvailability>
                      <TextInfoLocal size={20}>{day.label}</TextInfoLocal>
                    </AreaTextDayAvailability>
                  </SelectedDayButton>
                );
              })}
              <AreaButtonSave>
                <ButtonIcon
                  iconName="chevron-left"
                  title="Voltar"
                  disabled={isLoading}
                  loading={isLoading}
                  light
                  buttonColor={theme.colors.background_secondary}
                  textColor={theme.colors.background_primary}
                  iconColor={theme.colors.background_primary}
                  onPress={handleBackPage}
                />
                <ButtonIcon
                  iconName="save"
                  title="Salvar"
                  disabled={isLoading}
                  loading={isLoading}
                  light
                  buttonColor={theme.colors.background_secondary}
                  textColor={theme.colors.background_primary}
                  iconColor={theme.colors.background_primary}
                  onPress={() => handleSendSelectedDays(selectedDaysProvider)}
                />
              </AreaButtonSave>
            </AreaDaysAvailabilityContent>
          </AreaDaysAvailability>
        )}
      </Form>
    </Container>
  );
}
