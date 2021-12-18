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
  AreaHeader,
  AreaButtonIconBack,
  AreaWithoutHeader,
  Item,
  ItemTitle,
  AreaButtonCheckIcon,
  AreaItemTitle,
} from './styles';

export interface ItensListCheckBox {
  label: string;
  selected: boolean;
  id: string;
}
interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: () => void;
  handleSaveChanges: (itens: Array<ItensListCheckBox>) => void;
  itens: Array<ItensListCheckBox>;
  titleWithoutItens: string;
}

export function ModalCheckBox({
  modalVisible = true,
  handleClosedModal,
  itens = [],
  titleWithoutItens = 'Não há itens',
  handleSaveChanges,
}: Props) {
  const [valueText, setValueText] = useState('');
  const [listFiltered, setListFiltered] = useState<Array<ItensListCheckBox>>(
    [] as Array<ItensListCheckBox>,
  );
  const [listOriginal, setListOriginal] = useState<Array<ItensListCheckBox>>(
    [] as Array<ItensListCheckBox>,
  );
  const [listFilteredOriginal, setListFilteredOriginal] = useState<
    Array<ItensListCheckBox>
  >([] as Array<ItensListCheckBox>);
  const [changeListItem, setChangeListItem] = useState<boolean>(false);
  const [allMarkedItems, setAllMarkedItems] = useState<boolean>(false);

  const theme = useTheme();
  useEffect(() => {
    if (itens && itens.length > 0) {
      setListFiltered(itens);
      setListOriginal(itens);
    }
  }, []);

  useEffect(() => {
    if (itens && itens.length > 0) {
      setListFiltered(itens);
      setListOriginal(itens);
    }
  }, [itens]);

  function handleSelectedItem(id: string) {
    const newOriginalList = listFilteredOriginal.map(item => ({
      ...item,
      selected: item.id === id ? !item.selected : item.selected,
    }));
    setListFilteredOriginal(newOriginalList);
    setListFiltered(newOriginalList);
    setValueText('');
  }

  useEffect(() => {
    if (
      listFiltered &&
      listFiltered.length > 0 &&
      listOriginal &&
      listOriginal.length > 0
    ) {
      setChangeListItem(
        !listFiltered.every(itemFilterList =>
          listOriginal.some(
            itemListOriginal =>
              itemListOriginal.id === itemFilterList.id &&
              itemListOriginal.selected === itemFilterList.selected,
          ),
        ),
      );
      setAllMarkedItems(
        listFiltered.every(itemFilterList => itemFilterList.selected),
      );
    }
    if (valueText.length <= 0) {
      setListFilteredOriginal(listFiltered);
    }
  }, [listFiltered]);

  function handleSelectedAllItems() {
    const newList = listFiltered.map(item => ({
      ...item,
      selected: !allMarkedItems,
    }));
    setListFiltered(newList);
  }

  useEffect(() => {
    if (valueText.length > 0) {
      const filteredList = listFilteredOriginal.filter(itemListFilter =>
        itemListFilter.label.toLowerCase().includes(valueText.toLowerCase()),
      );
      setListFiltered(filteredList);
    } else {
      setListFiltered(listFilteredOriginal);
    }
  }, [valueText]);

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
          <AreaWithoutHeader changeItem={changeListItem} />
          {changeListItem && (
            <AreaButtonIconBack
              onPress={() => handleSaveChanges(listFilteredOriginal)}
            >
              <Icon
                name="save"
                size={RFValue(25)}
                color={theme.colors.white_medium}
              />
            </AreaButtonIconBack>
          )}
        </AreaHeader>
        <AreaInputSearch>
          <AreaButtonCheckIcon onPress={handleSelectedAllItems}>
            <Icon
              name={allMarkedItems ? 'check-square' : 'square'}
              size={RFValue(25)}
              color={theme.colors.background_primary}
            />
          </AreaButtonCheckIcon>
          <AreaInputText>
            <TextInput
              onChangeText={(valueParam: string) => setValueText(valueParam)}
              value={valueText}
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
              onPress={() => handleSelectedItem(item.id)}
              selected={item.selected}
            >
              <AreaButtonIcon disabled>
                <Icon
                  name={item.selected ? 'check-square' : 'square'}
                  size={RFValue(25)}
                  color={
                    item.selected
                      ? theme.colors.main_light
                      : theme.colors.background_primary
                  }
                />
              </AreaButtonIcon>
              <AreaItemTitle>
                <ItemTitle selected={item.selected}>{item.label}</ItemTitle>
              </AreaItemTitle>
            </Item>
          ))}
        </AreaItens>
      </Container>
    </Modal>
  );
}
