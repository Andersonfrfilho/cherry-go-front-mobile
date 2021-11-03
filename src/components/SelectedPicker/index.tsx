import React from 'react';

import { Picker } from '@react-native-picker/picker';
import { useTheme } from 'styled-components';
import { Container, AreaTitle, Title, AreaPicker, Error } from './styles';

interface Item {
  label: string;
  value: string;
}

interface Props {
  title: string;
  items: Array<Item>;
  setSelected: (param: string, index: number) => void | Promise<void>;
  selected: string;
  error: string;
  selectedRef: React.RefObject<unknown>;
  enabled: boolean;
}

export function SelectedPicker({
  title,
  items,
  setSelected,
  selected,
  error,
  selectedRef,
  enabled,
}: Props) {
  const theme = useTheme();
  return (
    <Container error={!!error}>
      {!!error && <Error>{error}</Error>}
      <AreaPicker enabled={enabled}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue, index) => setSelected(itemValue, index)}
          ref={selectedRef}
        >
          {items &&
            items.map((element, index) => {
              if (index === 0) {
                return (
                  <Picker.Item
                    key={index.toString()}
                    label={element.label}
                    value={element.value}
                    enabled={false}
                    style={{
                      color: enabled
                        ? theme.colors.background_primary
                        : theme.colors.main_light,
                      fontFamily: theme.fonts.primary_400,
                    }}
                  />
                );
              }
              return (
                <Picker.Item
                  key={index.toString()}
                  label={element.label}
                  value={element.value}
                  enabled={enabled}
                  style={{
                    color: enabled
                      ? theme.colors.background_primary
                      : theme.colors.main_light,
                    fontFamily: theme.fonts.primary_400,
                  }}
                />
              );
            })}
        </Picker>
      </AreaPicker>
    </Container>
  );
}
