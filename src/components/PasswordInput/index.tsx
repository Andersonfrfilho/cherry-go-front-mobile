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
  loading?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  error?: string;
}

export function PasswordInput({
  iconName,
  iconSize = 24,
  loading = false,
  error,
  value,
  ...rest
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
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

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <AreaIcon isFocused={isFocused} isFilled={isFilled} error={!!error}>
        <Feather
          name="lock"
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
          secureTextEntry={isPasswordVisible}
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
