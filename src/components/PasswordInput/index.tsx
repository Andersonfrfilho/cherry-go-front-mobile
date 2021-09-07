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
      <AreaIcon isFocused={isFocused} isFilled={isFilled}>
        <Feather
          name="lock"
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
          secureTextEntry={isPasswordVisible}
        />
      </AreaInput>
      <AreaIconEyes
        isFocused={isFocused}
        isFilled={isFilled}
        onPress={handlePasswordVisibilityChange}
      >
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={iconSize}
          color={
            (!!error && theme.colors.red_devil) || isFilled
              ? theme.colors.background_primary
              : theme.colors.bon_jour_dark_shade
          }
        />
      </AreaIconEyes>
    </Container>
  );
}
