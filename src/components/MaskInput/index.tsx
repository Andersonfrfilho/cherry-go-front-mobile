import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, AreaInput, AreaIcon, TextInputSC } from './styles';
import { colorFunction } from '../../utils/getColorInput';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  iconColor?: string;
  error?: string;
  mask?: string;
  inputRef?: React.RefObject<unknown>;
}

export function MaskInput({
  iconName,
  iconSize = 24,
  iconColor,
  error,
  value,
  mask,
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

  return (
    <Container editable={editable}>
      <AreaIcon isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <Feather
          name={iconName}
          size={iconSize}
          color={colorFunction({ error: !!error, isFilled, color: iconColor })}
        />
      </AreaIcon>
      <AreaInput isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <TextInputSC
          {...rest}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          error={!!error}
          isFilled={isFilled}
          mask={mask}
          ref={inputRef}
        />
      </AreaInput>
    </Container>
  );
}
