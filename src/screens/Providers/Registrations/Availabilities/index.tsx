import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { isAfter, isBefore, isEqual } from 'date-fns';
import {
  Container,
  AreaAvailabilityTitle,
  AreaAvailabilities,
  AreaAvailabilityContent,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaIcon,
  AreaOptions,
  Option,
} from './styles';

import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../../hooks/providerUser';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { Button } from '../../../../components/Button';
import { ButtonIcon } from '../../../../components/ButtonIcon';
import { DAYS_PT_BR } from '../../../../enums/daysProviders.enum';

export interface Focusable {
  focus(): void;
}
export function RegistrationsAvailabilitiesProvider() {
  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError } = useError();
  const {
    userProvider,
    loadUserData,
    loadAvailableDaysToProviderWork,
    daysAvailable,
    hoursAvailable,
  } = useProviderUser();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    days,
    hours,
  } = userProvider;

  async function handleSelectedDaysAvailability() {
    const daysAvailabilityWithProviderDaysSelected = daysAvailable.map(
      dayWeekend => {
        if (
          days &&
          days.some(
            dayProvider =>
              dayProvider.day.toString() === dayWeekend.day.toString(),
          )
        ) {
          return {
            ...dayWeekend,
            selected: true,
            label: DAYS_PT_BR[dayWeekend.day],
          };
        }
        return {
          ...dayWeekend,
          selected: false,
          label: DAYS_PT_BR[dayWeekend.day],
        };
      },
    );

    navigation.navigate('RegistrationsAvailabilitiesDaysProviderStack', {
      daysForSelected: daysAvailabilityWithProviderDaysSelected,
    });
  }

  function handleSelectedHoursAvailability() {
    setIsLoading(true);
    const hoursSelected = hoursAvailable.map(hourDay => {
      const dateHourDay = new Date(2000, 0, 1);
      const [hourDayFormatted, minuteDayFormatted] = hourDay.split(':');
      dateHourDay.setHours(
        Number(hourDayFormatted),
        Number(minuteDayFormatted),
        0,
        0,
      );
      if (
        hours &&
        hours.some(period => {
          const startDate = new Date(2000, 0, 1);
          const [startDateHour, startDateMinute] = period.start_time.split(':');
          startDate.setHours(
            Number(startDateHour),
            Number(startDateMinute),
            0,
            0,
          );
          const endDate = new Date(2000, 0, 1);
          const [endDateHour, endDateMinute] = period.end_time.split(':');
          endDate.setHours(Number(endDateHour), Number(endDateMinute), 0, 0);

          return (
            (isAfter(dateHourDay, startDate) &&
              isBefore(dateHourDay, endDate)) ||
            isEqual(dateHourDay, startDate) ||
            isEqual(dateHourDay, endDate)
          );
        })
      ) {
        return {
          hour: hourDay,
          selected: true,
        };
      }
      return {
        hour: hourDay,
        selected: false,
      };
    });

    setIsLoading(false);
    navigation.navigate('RegistrationsAvailabilitiesHoursProviderStack', {
      hoursForSelected: hoursSelected,
    });
  }

  useEffect(() => {
    loadAvailableDaysToProviderWork();
  }, []);

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
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaAvailabilities>
            <AreaAvailabilityTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Disponibilidades</Title>
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
            </AreaAvailabilityTitle>
            <AreaAvailabilityContent>
              <AreaOptions>
                <ButtonIcon
                  iconName="sun"
                  title="Dias"
                  disabled={isLoading}
                  loading={isLoading}
                  light
                  buttonColor={theme.colors.background_secondary}
                  textColor={theme.colors.background_primary}
                  iconColor={theme.colors.background_primary}
                  onPress={handleSelectedDaysAvailability}
                />
                <ButtonIcon
                  iconName="watch"
                  title="Horarios"
                  disabled={isLoading}
                  loading={isLoading}
                  light
                  buttonColor={theme.colors.background_secondary}
                  textColor={theme.colors.background_primary}
                  iconColor={theme.colors.background_primary}
                  onPress={handleSelectedHoursAvailability}
                />
              </AreaOptions>
            </AreaAvailabilityContent>
          </AreaAvailabilities>
        )}
      </Form>
    </Container>
  );
}
