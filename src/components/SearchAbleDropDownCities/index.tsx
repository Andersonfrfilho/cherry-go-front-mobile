import React from 'react';
import { useTheme } from 'styled-components';
import {
  Container,
  AreaError,
  Error,
  AreaInputTextIcon,
  InputText,
  AreaList,
  AreaItemList,
  ItemContent,
  AreaInputText,
  AreaIcon,
  Icon,
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
  activeInput: boolean;
  selectedItemInput: boolean;
  handleEnableInputSearch: () => void;
  handleDisableAndClearInputSearch: () => void;
}

export function SearchAbleDropDownCities({
  placeholder,
  onTextChange,
  setItemSelected,
  selectedFindItem,
  items,
  inputRef,
  error,
  activeInput,
  selectedItemInput,
  handleEnableInputSearch,
  handleDisableAndClearInputSearch,
}: Props) {
  const theme = useTheme();
  return (
    <Container active={activeInput}>
      {error && (
        <AreaError>
          <Error>{error}</Error>
        </AreaError>
      )}
      <AreaInputTextIcon>
        <AreaInputText>
          <InputText
            placeholder={placeholder}
            onChangeText={onTextChange}
            value={selectedFindItem}
            ref={inputRef}
            editable={activeInput}
          />
        </AreaInputText>
        {selectedItemInput ? (
          <AreaIcon onPress={handleDisableAndClearInputSearch}>
            <Icon name="x" size={24} color={theme.colors.bon_jour_dark_shade} />
          </AreaIcon>
        ) : (
          <AreaIcon onPress={handleEnableInputSearch}>
            <Icon
              name="search"
              size={24}
              color={theme.colors.bon_jour_dark_shade}
            />
          </AreaIcon>
        )}
      </AreaInputTextIcon>
      {true &&
        items.map((element, index) => (
          <AreaItemList
            key={String(index)}
            onPress={() => setItemSelected(element)}
          >
            <ItemContent numberOfLines={2}>{element}</ItemContent>
          </AreaItemList>
        ))}
    </Container>
  );
}
