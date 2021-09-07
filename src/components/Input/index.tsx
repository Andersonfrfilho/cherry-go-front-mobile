import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, AreaInput, AreaIcon, TextInputSC } from './styles';

interface Props extends TextInputProps {
  loading?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  error?: string;
}

export function Input({
  iconName,
  iconSize = 24,
  loading = false,
  error,
  value,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <AreaIcon isFocused={isFocused} isFilled={isFilled}>
        <Feather
          name={iconName}
          size={iconSize}
          color={
            (!!error && theme.colors.red_devil) || isFilled
              ? theme.colors.background_primary
              : theme.colors.bon_jour_dark_shade
          }
        />
      </AreaIcon>
      <AreaInput isFocused={isFocused} isFilled={isFilled}>
        <TextInputSC
          editable={!loading}
          {...rest}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          error={!!error}
          isFilled={isFilled}
        />
      </AreaInput>
    </Container>
  );
}
