import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Button, IconContainer, Title } from './styles';

interface Props {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  size?: number;
}

export function ButtonIcon({
  title,
  color,
  loading = false,
  light = false,
  iconName,
  size = 24,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Button {...rest}>
      <IconContainer>
        <Title>{title}</Title>
        <Feather
          name={iconName}
          size={size}
          color={color || theme.colors.main}
        />
      </IconContainer>
    </Button>
    // <Container
    //   color={color || theme.colors.main}
    //   enabled={enabled}
    //   style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    //   {...rest}
    // >
    //   {loading ? (
    //     <ActivityIndicator color={theme.colors.shape} />
    //   ) : (
    //     <Title light={light}>{title}</Title>
    //   )}
    // </Container>
  );
}
