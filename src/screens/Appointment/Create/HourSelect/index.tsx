import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Body,
  AreaButtons,
  AreaButtonServices,
  AreaButtonBackNext,
  AreaButtonBack,
  TitleButtonBack,
  AreaButtonNext,
  TitleButtonNext,
  AreaHours,
  ListHours,
  AreaHour,
  HourTitle,
  AreaDaysSelect,
  AreaAfterDay,
  AreaTitleDay,
  TitleDay,
  AreaBeforeDay,
  Icon,
  AreaWithout,
} from './styles';

import { useAuth } from '../../../../hooks/auth';

import { useCommon } from '../../../../hooks/common';

import { useError } from '../../../../hooks/error';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import {
  FormattedHoursDays,
  HourSelectInterface,
  useClientUser,
} from '../../../../hooks/clientUser';
import { UserProvider } from '../../../../hooks/providerUser';
import { useTag } from '../../../../hooks/tag';
import { getOldest } from '../../../../utils/getOldest';
import { firstLetterUppercase } from '../../../../utils/firstLetterUppercase';
import {
  ModalServices,
  ServiceFormattedModalService,
} from '../../../../components/ModalServices';
import { DAYS_PT_BR } from '../../../../enums/daysProviders.enum';
import { Load } from '../../../../components/Load';
import { formattedDateToCompare } from '../../../../utils/formattedDateToCompare';
import { addMillisecondsToDate } from '../../../../utils/addMil';
import { compareIfBetweenEqual } from '../../../../utils/compareIfBetweenEqual';

interface HandleSelectHourAppointmentDTO {
  duration: number;
  hours: HourSelectInterface[];
}
export interface Focusable {
  focus(): void;
}

export const DAYS_WEEK_DATE_NUMBER = {
  '0': 'MONDAY',
  '1': 'TUESDAY',
  '2': 'WEDNESDAY',
  '3': 'THURSDAY',
  '4': 'FRIDAY',
  '5': 'SATURDAY',
  '6': 'SUNDAY',
};
interface Params {
  providerSelect: UserProvider;
  servicesSelect: ServiceFormattedModalService[];
  necessaryMilliseconds: number;
}

export function ClientAppointmentCreateHourSelect() {
  const route = useRoute();
  const theme = useTheme();
  const [listDaysHoursFormatted, setListDaysHoursFormatted] = useState<
    FormattedHoursDays[]
  >([] as FormattedHoursDays[]);
  const [listHoursFormatted, setListHoursFormatted] = useState<
    HourSelectInterface[]
  >([] as HourSelectInterface[]);
  const [listHoursOriginalFormatted, setListHoursOriginalFormatted] = useState<
    HourSelectInterface[]
  >([] as HourSelectInterface[]);
  const [handleContinued, setHandleContinued] = useState<boolean>(false);
  const [handleIndexPage, setHandleIndexPage] = useState<number>(0);
  const [initialHour, setInitialHour] = useState<
    HourSelectInterface | undefined
  >(undefined);
  const [endHour, setEndHour] = useState<HourSelectInterface | undefined>(
    undefined,
  );
  const [isLoadingHourSelect, setIsLoadingHourSelect] =
    useState<boolean>(false);

  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const {
    userClient,

    setAppointmentStageClient,
    getHoursProvidersSelect,
  } = useClientUser();
  const { getTags, tags } = useTag();
  const { signIn, signOut } = useAuth();

  const navigation = useNavigation<ScreenNavigationProp>();
  const { providerSelect, necessaryMilliseconds, servicesSelect } =
    route.params as Params;
  const { hours, days, id: providerId } = providerSelect;
  const { name, last_name: lastName, image_profile: imageProfile } = userClient;

  async function handleLogout() {
    await signOut();
  }

  useEffect(() => {
    let unmounted = false;
    async function getHoursProvider() {
      if (!unmounted) {
        setIsLoadingHourSelect(true);
        const data = await getHoursProvidersSelect({
          duration: necessaryMilliseconds,
          providerId,
        });
        setListDaysHoursFormatted(data);
        if (!!data.length && data.length > 1) {
          setListHoursFormatted(data[0].hours);
        }
        setIsLoadingHourSelect(false);
      }
    }
    getHoursProvider();
    return () => {
      unmounted = true;
      setListDaysHoursFormatted([] as FormattedHoursDays[]);
      setListHoursFormatted([] as HourSelectInterface[]);
      setHandleContinued(false);
      setIsLoadingHourSelect(false);
    };
  }, []);

  function handleBackClientSelect() {
    navigation.goBack();
  }

  async function handleSelectHour() {
    setHandleContinued(false);

    if (!!initialHour && !!endHour) {
      const hoursSelect = {
        start: initialHour,
        end: endHour,
      };

      await setAppointmentStageClient({
        provider: providerSelect,
        services: servicesSelect,
        stage: {
          route: 'ClientAppointmentStackRoutes',
          children: 'ClientAppointmentStagesProviderSelectLocalStack',
          params_name: 'providerSelect',
        },
        necessaryMilliseconds,
        hours: hoursSelect,
      });

      navigation.navigate('ClientAppointmentStagesProviderSelectLocalStack', {
        providerSelect,
        servicesSelect,
        necessaryMilliseconds,
        hours: hoursSelect,
      });
    }
  }

  function handlePageNext() {
    if (handleIndexPage <= listDaysHoursFormatted.length - 1) {
      setHandleIndexPage(handleIndexPage + 1);
    }
  }

  function handlePageBack() {
    if (handleIndexPage >= 0) {
      setHandleIndexPage(handleIndexPage - 1);
    }
  }

  useEffect(() => {
    if (listDaysHoursFormatted.length > 0) {
      setListHoursFormatted(listDaysHoursFormatted[handleIndexPage].hours);
    }
  }, [handleIndexPage]);

  function handleSelectHourAppointment(
    hourSelectInterface: HourSelectInterface,
  ) {
    const [hour_initial, minutes_initial] = hourSelectInterface.hour.split(':');
    const dateInitialCompare = formattedDateToCompare(
      hour_initial,
      minutes_initial,
    );
    const dateFinalCompare = addMillisecondsToDate(
      dateInitialCompare,
      necessaryMilliseconds,
    );

    setInitialHour(hourSelectInterface);

    const dateFinalHour = { ...hourSelectInterface };

    dateFinalHour.date = addMillisecondsToDate(
      new Date(hourSelectInterface.date),
      necessaryMilliseconds,
    ).getTime();

    const newList = listHoursFormatted.map(element => {
      const [hour_compare, minutes_compare] = element.hour.split(':');
      const dateCurrentCompare = formattedDateToCompare(
        hour_compare,
        minutes_compare,
      );

      return {
        ...element,
        time_blocked: compareIfBetweenEqual(
          dateCurrentCompare,
          dateInitialCompare,
          dateFinalCompare,
        ),
      };
    });
    const finalMinutes = newList.filter(element => element.time_blocked);

    dateFinalHour.hour =
      finalMinutes.length > 0 ? finalMinutes.pop()?.hour : '00:00';

    setEndHour(dateFinalHour);
    setListHoursFormatted(newList);
    setHandleContinued(true);
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
        image={imageProfile && imageProfile.link}
      />
      <Body>
        {isLoadingHourSelect || isLoading ? (
          <Load />
        ) : (
          <>
            <AreaDaysSelect>
              {handleIndexPage > 0 ? (
                <AreaAfterDay onPress={handlePageBack}>
                  <Icon
                    name="chevron-left"
                    size={RFValue(48)}
                    color={theme.colors.white_medium}
                  />
                </AreaAfterDay>
              ) : (
                <AreaWithout />
              )}
              <AreaTitleDay>
                {listDaysHoursFormatted &&
                  listDaysHoursFormatted.length > 0 && (
                    <TitleDay>
                      {
                        DAYS_PT_BR[
                          listDaysHoursFormatted[handleIndexPage].day.day
                        ]
                      }
                    </TitleDay>
                  )}
              </AreaTitleDay>
              {handleIndexPage < listDaysHoursFormatted.length - 1 ? (
                <AreaBeforeDay onPress={handlePageNext}>
                  <Icon
                    name="chevron-right"
                    size={RFValue(48)}
                    color={theme.colors.white_medium}
                  />
                </AreaBeforeDay>
              ) : (
                <AreaWithout />
              )}
            </AreaDaysSelect>

            <AreaHours>
              <ListHours
                data={listHoursFormatted}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <AreaHour
                      disabled={!item.available || item.time_blocked}
                      onPress={() => handleSelectHourAppointment(item)}
                      available={item.available}
                      availablePeriod={item.available_period}
                      blockedTime={item.time_blocked}
                    >
                      <HourTitle>{item.hour}</HourTitle>
                    </AreaHour>
                  );
                }}
              />
            </AreaHours>
            <AreaButtons>
              <AreaButtonBack onPress={handleBackClientSelect}>
                <TitleButtonBack>Voltar</TitleButtonBack>
              </AreaButtonBack>
              {handleContinued && (
                <AreaButtonNext onPress={handleSelectHour}>
                  <TitleButtonNext>Avançar</TitleButtonNext>
                </AreaButtonNext>
              )}
            </AreaButtons>
          </>
        )}
      </Body>
    </Container>
  );
}
