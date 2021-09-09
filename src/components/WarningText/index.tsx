import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, AreaIcon, AreaTitle, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  titleColor?: string;
  titleSize?: number;
  iconName?: React.ComponentProps<typeof Feather>['name'];
  iconColor?: string;
  iconSize?: number;
}

export function WarningText({
  title,
  titleColor,
  titleSize,
  iconName,
  iconColor,
  iconSize,
}: Props) {
  const theme = useTheme();
  return (
    <Container>
      <AreaIcon>
        <Feather
          name={iconName || 'alert-triangle'}
          size={iconSize || 24}
          color={iconColor || theme.colors.red_devil}
        />
      </AreaIcon>
      <AreaTitle>
        <Title color={titleColor} size={titleSize}>
          {title}
        </Title>
      </AreaTitle>
    </Container>
  );
}
