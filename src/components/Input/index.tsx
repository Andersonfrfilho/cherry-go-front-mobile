import React, { useState, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, AreaInput, AreaIcon, TextInputSC } from './styles';
import { colorFunction } from '../../utils/getColorInput';

interface Props extends TextInputProps {
  loading?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  error?: string;
  inputRef?: React.RefObject<unknown>;
}

export function Input({
  iconName,
  iconSize = 24,
  error,
  onChangeText,
  value,
  inputRef,
  editable,
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

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);
  return (
    <Container editable={editable}>
      <AreaIcon isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <Feather
          name={iconName}
          size={iconSize}
          color={colorFunction({ error: !!error, isFilled })}
        />
      </AreaIcon>
      <AreaInput isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <TextInputSC
          {...rest}
          onChangeText={onChangeText}
          value={value}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          error={!!error}
          isFilled={isFilled}
          ref={inputRef}
        />
      </AreaInput>
    </Container>
  );
}
