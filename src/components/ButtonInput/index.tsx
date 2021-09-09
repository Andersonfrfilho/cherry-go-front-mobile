import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  AreaInput,
  AreaIcon,
  AreaIconButton,
  TextInputSC,
} from './styles';
import { colorFunction } from '../../utils/getColorInput';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  error?: string;
  iconButtonName: React.ComponentProps<typeof Feather>['name'];
  iconButtonSize?: number;
  functionOnPress: () => void;
  mask?: string;
  inputRef?: React.RefObject<unknown>;
}

export function ButtonInput({
  iconName,
  iconSize = 24,
  iconButtonName,
  iconButtonSize = 24,
  error,
  value,
  onChangeText,
  functionOnPress,
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
          mask={mask}
          ref={inputRef}
        />
      </AreaInput>
      <AreaIconButton
        isFocused={isFocused}
        isFilled={isFilled}
        onPress={functionOnPress}
        error={!!error}
      >
        <Feather
          name={iconButtonName}
          size={iconButtonSize}
          color={colorFunction({ error: !!error, isFilled })}
        />
      </AreaIconButton>
    </Container>
  );
}
