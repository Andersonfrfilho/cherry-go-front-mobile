import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Modal,
  AreaInputSearch,
  AreaInputText,
  TextInput,
  AreaButtonIcon,
  Icon,
  AreaItens,
  Item,
  ItemTitle,
  AreaHeader,
  AreaButtonIconBack,
  AreaWithoutHeader,
} from './styles';

interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: () => void;
  handleSelectedItem: (value: string) => void;
  itens: Array<string>;
  titleWithoutItens: string;
  selected: boolean;
}

export function ModalSelectItens({
  modalVisible = true,
  handleClosedModal,
  handleSelectedItem,
  itens = [],
  titleWithoutItens = 'Não há itens',
  selected = false,
}: Props) {
  const [value, setValueText] = useState('');
  const [listFiltered, setListFiltered] = useState<Array<string>>(
    [] as Array<string>,
  );

  useEffect(() => {
    if (!!itens.length && itens.length >= 0) {
      setListFiltered(itens);
    }
  }, [itens]);

  useEffect(() => {
    if (value && value.length === 0) {
      setListFiltered(itens);
    } else if (!selected) {
      const itensFound = itens.filter((valueParam: string) =>
        valueParam.toLowerCase().includes(value.toLowerCase()),
      );
      setListFiltered(itensFound);
    } else {
      setListFiltered([]);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      setValueText('');
      setListFiltered([] as Array<string>);
    };
  }, []);

  const theme = useTheme();

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <Container>
        <AreaHeader>
          <AreaButtonIconBack onPress={handleClosedModal}>
            <Icon
              name="chevron-left"
              size={RFValue(25)}
              color={theme.colors.white_medium}
            />
          </AreaButtonIconBack>
          <AreaWithoutHeader />
        </AreaHeader>
        <AreaInputSearch>
          <AreaInputText>
            <TextInput
              onChangeText={(valueParam: string) => setValueText(valueParam)}
              value={value}
            />
          </AreaInputText>
          <AreaButtonIcon disabled>
            <Icon
              name="search"
              size={RFValue(25)}
              color={theme.colors.background_primary}
            />
          </AreaButtonIcon>
        </AreaInputSearch>
        <AreaItens>
          {listFiltered.length === 0 && (
            <Item disabled>
              <ItemTitle style={{ textAlign: 'center' }}>
                {titleWithoutItens}
              </ItemTitle>
            </Item>
          )}
          {listFiltered.map((item, index) => (
            <Item
              key={index.toString()}
              onPress={() => handleSelectedItem(item)}
            >
              <ItemTitle>{item}</ItemTitle>
            </Item>
          ))}
        </AreaItens>
      </Container>
    </Modal>
  );
}
