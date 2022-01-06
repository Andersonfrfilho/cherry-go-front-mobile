import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Modal,
  Icon,
  AreaItens,
  AreaHeader,
  AreaButtonIconBack,
  AreaWithoutHeader,
  Item,
  ItemTitle,
  List,
  AreaItemTag,
  ImageItemTag,
  AreaImageTag,
  TitleItemTag,
  TitleTag,
} from './styles';
import { Tag } from '../../hooks/tag';

export interface ItensListSelectTagInterface extends Tag {
  select: boolean;
}

interface Props extends TouchableOpacityProps {
  modalVisible: boolean;
  handleClosedModal: () => void;
  handleSaveChanges: (itens: Array<ItensListSelectTagInterface>) => void;
  itens: Array<ItensListSelectTagInterface>;
  titleWithoutItens: string;
}

export function ModalTagSelect({
  modalVisible = true,
  handleClosedModal,
  itens = [],
  titleWithoutItens = 'Não há itens',
  handleSaveChanges,
}: Props) {
  const [list, setList] = useState<Array<ItensListSelectTagInterface>>(
    [] as Array<ItensListSelectTagInterface>,
  );
  const [listOriginal, setListOriginal] = useState<
    Array<ItensListSelectTagInterface>
  >([] as Array<ItensListSelectTagInterface>);
  const [changeListItem, setChangeListItem] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    if (itens && itens.length > 0) {
      setList(itens);
      setListOriginal(itens);
    }
  }, [itens]);

  function handleSelectItem(id: string) {
    const newList = list.map(item => {
      if (item.id === id) return { ...item, select: !item.select };
      return item;
    });

    setList(newList);
  }

  useEffect(() => {
    const data = list.every(item =>
      listOriginal.some(
        itemOriginal =>
          item.id === itemOriginal.id && item.select === itemOriginal.select,
      ),
    );
    setChangeListItem(!data);
  }, [list]);

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
            <AreaButtonIconBack onPress={() => handleSaveChanges(list)}>
              <Icon
                name="save"
                size={RFValue(25)}
                color={theme.colors.white_medium}
              />
            </AreaButtonIconBack>
          )}
        </AreaHeader>

        <AreaItens>
          {list.length === 0 && (
            <Item disabled>
              <ItemTitle style={{ textAlign: 'center' }}>
                {titleWithoutItens}
              </ItemTitle>
            </Item>
          )}
          {list.length > 0 && (
            <List
              data={list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <AreaItemTag
                    select={item.select}
                    onPress={() => handleSelectItem(item.id)}
                  >
                    <AreaImageTag>
                      <ImageItemTag
                        source={{
                          uri: item.image.link,
                        }}
                      />
                    </AreaImageTag>

                    <TitleItemTag>
                      <TitleTag numberOfLines={1}>{item.name}</TitleTag>
                    </TitleItemTag>
                  </AreaItemTag>
                );
              }}
              numColumns={3}
            />
          )}
        </AreaItens>
      </Container>
    </Modal>
  );
}
