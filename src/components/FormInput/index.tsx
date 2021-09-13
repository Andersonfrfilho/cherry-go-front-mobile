import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Input } from '../Input';
import { Container, Error } from './styles';
import { PasswordInput } from '../PasswordInput';
import { MaskInput } from '../MaskInput';
import { ButtonInput } from '../ButtonInput';
import { TextInputTypeEnum } from '../../enums/TextInputType.enum';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  iconColor?: string;
  loading?: boolean;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  iconButtonName?: React.ComponentProps<typeof Feather>['name'];
  iconButtonSize?: number;
  functionOnPress?: () => void;
  password?: boolean;
  mask?: string;
  type?: TextInputTypeEnum;
  inputRef?: React.RefObject<unknown>;
}

export function FormInput({
  control,
  name,
  error,
  mask,
  iconColor,
  iconButtonName = 'user-plus',
  iconButtonSize = 24,
  functionOnPress = () => {},
  type = TextInputTypeEnum.default,
  inputRef,
  ...rest
}: Props) {
  return (
    <Container>
      {error && <Error>{error}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          if (type === TextInputTypeEnum.mask) {
            return (
              <MaskInput
                onChangeText={onChange}
                mask={mask}
                value={value}
                error={error}
                iconColor={iconColor}
                {...rest}
                inputRef={inputRef}
              />
            );
          }

          if (type === TextInputTypeEnum.password) {
            return (
              <PasswordInput
                onChangeText={onChange}
                value={value}
                error={error}
                {...rest}
                inputRef={inputRef}
              />
            );
          }

          if (type === TextInputTypeEnum.button) {
            return (
              <ButtonInput
                onChangeText={onChange}
                value={value}
                error={error}
                mask={mask}
                iconButtonName={iconButtonName}
                iconButtonSize={iconButtonSize}
                functionOnPress={functionOnPress}
                inputRef={inputRef}
                {...rest}
              />
            );
          }

          return (
            <Input
              onChangeText={onChange}
              value={value}
              error={error}
              {...rest}
              inputRef={inputRef}
            />
          );
        }}
        name={name}
      />
    </Container>
  );
}
