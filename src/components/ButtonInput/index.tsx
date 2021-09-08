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
  loading?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  error?: string;
  iconButtonName: React.ComponentProps<typeof Feather>['name'];
  iconButtonSize?: number;
  functionOnPress: () => void;
  mask?: string;
}

export function ButtonInput({
  iconName,
  iconSize = 24,
  iconButtonName,
  iconButtonSize = 24,
  loading = false,
  error,
  value,
  functionOnPress,
  mask,
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
          mask={mask}
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
