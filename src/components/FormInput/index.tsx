import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Input } from '../Input';
import { Container, Error } from './styles';
import { PasswordInput } from '../PasswordInput';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  iconColor?: string;
  loading?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  password?: boolean;
}

export function FormInput({
  control,
  name,
  error,
  password = false,
  ...rest
}: Props) {
  return (
    <Container>
      {error && <Error>{error}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) =>
          password ? (
            <PasswordInput
              onChangeText={onChange}
              value={value}
              error={error}
              {...rest}
            />
          ) : (
            <Input
              onChangeText={onChange}
              value={value}
              error={error}
              {...rest}
            />
          )
        }
        name={name}
      />
    </Container>
  );
}
