import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, AreaInput, AreaIcon, TextInputSC } from './styles';
import { colorFunction } from '../../utils/getColorInput';

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

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <AreaIcon isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <Feather
          name={iconName}
          size={iconSize}
          color={colorFunction({ error: !!error, isFilled })}
        />
      </AreaIcon>
      <AreaInput isFocused={isFocused} isFilled={isFilled} error={!!error}>
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
