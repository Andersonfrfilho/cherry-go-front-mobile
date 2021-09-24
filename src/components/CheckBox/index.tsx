import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { Button, IconContainer, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  iconColor?: string;
  loading?: boolean;
  iconSize?: number;
  buttonColor?: string;
  textColor?: string;
  active: boolean;
}

export function CheckBox({
  title,
  iconColor,
  loading = false,
  iconSize = 24,
  buttonColor,
  textColor,
  active = false,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Button color={buttonColor} {...rest}>
      <IconContainer title={!!title}>
        {!!title && <Title color={textColor}>{title}</Title>}
        <Feather
          name={active ? 'check-square' : 'square'}
          size={iconSize}
          color={iconColor || theme.colors.background_primary}
        />
      </IconContainer>
    </Button>
  );
}
