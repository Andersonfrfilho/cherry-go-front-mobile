import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Modal,
  Container,
  Header,
  TitleHeader,
  Body,
  AreaInfoItem,
  AreaNameDurationPrice,
  AreaName,
  Name,
  AreaDurationPrice,
  AreaDuration,
  AreaPrice,
  Duration,
  Price,
  AreaItemExpand,
  Icon,
  AreaDetails,
  Details,
  AreaItemInfoDetails,
  AreaCheckItem,
  AreaIconBack,
  AreaTitle,
  AreaIconSave,
} from './styles';
import { Services } from '../../hooks/providerUser';
import { getValueAmount } from '../../utils/formatValueAmount';
import { formattedMillisecondsToMinutes } from '../../utils/convertMillisecondsToMinutes';

export interface ServiceFormattedModalService extends Services {
  select: boolean;
  expand: boolean;
}

interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: () => void;
  handleSaveChanges: (itens: Array<ServiceFormattedModalService>) => void;
  services: Array<ServiceFormattedModalService>;
  titleWithoutItens: string;
}

export function ModalServices({
  modalVisible = true,
  handleClosedModal,
  services = [],
  titleWithoutItens = 'Não há itens',
  handleSaveChanges,
}: Props) {
  const theme = useTheme();

  const [listFiltered, setListFiltered] = useState<
    Array<ServiceFormattedModalService>
  >([] as Array<ServiceFormattedModalService>);
  const [listOriginal, setListOriginal] = useState<
    Array<ServiceFormattedModalService>
  >([] as Array<ServiceFormattedModalService>);
  const [isChangeList, setIsChangeList] = useState<boolean>(false);
  useEffect(() => {
    if (!!services.length && services.length > 0) {
      setListFiltered(services);
      setListOriginal(services);
    }
  }, []);
  useEffect(() => {
    if (!!services.length && services.length > 0) {
      setListFiltered(services);
      setListOriginal(services);
    }
  }, [services]);

  function handleSelect(id: string) {
    const newListFiltered = listFiltered.map(item => ({
      ...item,
      select: id === item.id ? !item.select : item.select,
    }));
    setIsChangeList(
      !newListFiltered.every(item =>
        listOriginal.some(
          service => service.id === item.id && service.select === item.select,
        ),
      ),
    );
    setListFiltered(newListFiltered);
  }

  function handleExpand(id: string) {
    const newListFiltered = listFiltered.map(item => ({
      ...item,
      expand: id === item.id ? !item.expand : false,
    }));

    setListFiltered(newListFiltered);
  }

  function handleSaveChange() {
    handleSaveChanges(listFiltered);
  }
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <Container>
        <Header>
          <AreaIconBack onPress={handleClosedModal}>
            <Icon
              name="chevron-left"
              size={RFValue(25)}
              color={theme.colors.background_primary}
            />
          </AreaIconBack>
          <AreaTitle>
            <TitleHeader>Serviços</TitleHeader>
          </AreaTitle>
          <AreaIconSave disabled={!isChangeList} onPress={handleSaveChange}>
            {isChangeList && (
              <Icon
                name="check"
                size={RFValue(25)}
                color={theme.colors.main_light}
              />
            )}
          </AreaIconSave>
        </Header>
        <Body>
          {listFiltered.length === 0 && (
            <AreaTitle>
              <TitleHeader>{titleWithoutItens}</TitleHeader>
            </AreaTitle>
          )}
          {!!listFiltered.length &&
            listFiltered.length > 0 &&
            listFiltered.map((service, index) => (
              <AreaItemInfoDetails
                key={index.toString()}
                select={service.select}
                expand={service.expand}
              >
                <AreaInfoItem>
                  <AreaItemExpand onPress={() => handleSelect(service.id)}>
                    <Icon
                      name={service.select ? 'check-square' : 'square'}
                      size={RFValue(25)}
                      color={
                        service.select
                          ? theme.colors.main_light
                          : theme.colors.background_primary
                      }
                    />
                  </AreaItemExpand>
                  <AreaNameDurationPrice>
                    <AreaName>
                      <Name select={service.select} numberOfLines={2}>
                        {service.name}
                      </Name>
                    </AreaName>
                    <AreaDurationPrice>
                      <AreaDuration>
                        <Duration select={service.select}>
                          {`${formattedMillisecondsToMinutes(
                            service.duration,
                          )}`}
                        </Duration>
                      </AreaDuration>
                      <AreaPrice>
                        <Price select={service.select}>{`${getValueAmount(
                          String(service.amount),
                        )}`}</Price>
                      </AreaPrice>
                    </AreaDurationPrice>
                  </AreaNameDurationPrice>
                  <AreaCheckItem
                    disabled={!service?.details?.description}
                    onPress={() => handleExpand(service.id)}
                  >
                    {service?.details?.description && (
                      <Icon
                        name={service.expand ? 'chevron-up' : 'chevron-down'}
                        size={RFValue(25)}
                        color={
                          service.select
                            ? theme.colors.main_light
                            : theme.colors.background_primary
                        }
                      />
                    )}
                  </AreaCheckItem>
                </AreaInfoItem>
                {service.expand && service?.details?.description && (
                  <AreaDetails>
                    <Details select={service.select}>
                      {service?.details?.description}
                    </Details>
                  </AreaDetails>
                )}
              </AreaItemInfoDetails>
            ))}
        </Body>
      </Container>
    </Modal>
  );
}
