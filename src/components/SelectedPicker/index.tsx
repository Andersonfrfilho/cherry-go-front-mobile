import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { Container, AreaTitle, Title, AreaPicker, Error } from './styles';

interface Item {
  label: string;
  value: string;
}

interface Props {
  title: string;
  items: Item[];
  setSelected: (param: string) => void;
  selected: string;
  error: string;
  selectedRef: React.RefObject<unknown>;
}

export function SelectedPicker({
  title,
  items,
  setSelected,
  selected,
  error,
  selectedRef,
}: Props) {
  return (
    <Container error={!!error}>
      <AreaTitle>
        <Title>{title}</Title>
      </AreaTitle>
      {!!error && <Error>{error}</Error>}
      <AreaPicker>
        <Picker
          selectedValue={selected}
          onValueChange={itemValue => setSelected(itemValue)}
          ref={selectedRef}
        >
          {items &&
            items.map((element, index) => {
              if (index === 0) {
                return (
                  <Picker.Item
                    key={element.value}
                    label={element.label}
                    value={element.value}
                    enabled={false}
                  />
                );
              }
              return (
                <Picker.Item
                  key={element.value}
                  label={element.label}
                  value={element.value}
                />
              );
            })}
        </Picker>
      </AreaPicker>
    </Container>
  );
}
