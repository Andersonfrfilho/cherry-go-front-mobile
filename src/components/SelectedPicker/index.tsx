import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { Container, AreaTitle, Title, AreaPicker } from './styles';

interface Item {
  label: string;
  value: string;
}

interface Props {
  title: string;
  items: Item[];
  setSelected: (param: string) => void;
  selected: string;
}

export function SelectedPicker({ title, items, setSelected, selected }: Props) {
  return (
    <Container>
      <AreaTitle>
        <Title>{title}</Title>
      </AreaTitle>
      <AreaPicker>
        <Picker
          selectedValue={selected}
          onValueChange={itemValue => setSelected(itemValue)}
        >
          {items &&
            items.map(element => (
              <Picker.Item
                key={element.value}
                label={element.label}
                value={element.value}
              />
            ))}
        </Picker>
      </AreaPicker>
    </Container>
  );
}
