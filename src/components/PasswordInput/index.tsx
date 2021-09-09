import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  AreaInput,
  AreaIcon,
  AreaIconEyes,
  TextInputSC,
} from './styles';
import { colorFunction } from '../../utils/getColorInput';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  error?: string;
  inputRef?: React.RefObject<unknown>;
}

export function PasswordInput({
  iconSize = 24,
  error,
  value,
  onChangeText,
  inputRef,
  editable,
  ...rest
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container editable={editable}>
      <AreaIcon isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <Feather
          name="lock"
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
          secureTextEntry={isPasswordVisible}
          ref={inputRef}
        />
      </AreaInput>
      <AreaIconEyes
        isFocused={isFocused}
        isFilled={isFilled}
        onPress={handlePasswordVisibilityChange}
        error={!!error}
      >
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={iconSize}
          color={colorFunction({ error: !!error, isFilled })}
        />
      </AreaIconEyes>
    </Container>
  );
}
