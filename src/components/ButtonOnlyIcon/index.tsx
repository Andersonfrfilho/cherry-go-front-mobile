import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { Button, IconContainer, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  iconColor?: string;
  loading?: boolean;
  light?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  buttonColor?: string;
  textColor?: string;
  iconPosition?: 'left' | 'right';
  titleSize?: number;
  disabled: boolean;
}

export function ButtonOnlyIcon({
  title,
  iconColor,
  loading = false,
  light = false,
  iconName,
  iconSize = 24,
  titleSize = 16,
  buttonColor,
  textColor,
  iconPosition = 'right',
  disabled = false,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Button color={buttonColor} {...rest} disabled={disabled}>
      <IconContainer>
        {iconPosition === 'left' && (
          <Feather
            name={iconName}
            size={iconSize}
            color={iconColor || theme.colors.background_primary}
          />
        )}
      </IconContainer>
    </Button>
  );
}
