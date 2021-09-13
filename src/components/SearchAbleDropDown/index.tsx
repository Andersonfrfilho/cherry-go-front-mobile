import React from 'react';

import {
  Container,
  AreaError,
  Error,
  AreaInputText,
  InputText,
  AreaList,
  AreaItemList,
  ItemContent,
} from './styles';

interface Item {
  id: number;
  name: string;
}
interface Props {
  placeholder: string;
  onTextChange: (value: string) => void;
  setItemSelected: (value: string) => void;
  selectedFindItem: string;
  items: string[];
  error: string;
  inputRef?: React.RefObject<unknown>;
}

export function SearchAbleDropDown({
  placeholder,
  onTextChange,
  setItemSelected,
  selectedFindItem,
  items,
  inputRef,
  error,
}: Props) {
  return (
    <Container>
      {error && (
        <AreaError>
          <Error>{error}</Error>
        </AreaError>
      )}
      <AreaInputText>
        <InputText
          placeholder={placeholder}
          onChangeText={onTextChange}
          value={selectedFindItem}
          ref={inputRef}
        />
      </AreaInputText>
      <AreaList contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
        {items.map((element, index) => (
          <AreaItemList
            key={String(index)}
            onPress={() => setItemSelected(element)}
          >
            <ItemContent>{element}</ItemContent>
          </AreaItemList>
        ))}
      </AreaList>
    </Container>
  );
}
