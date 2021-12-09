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
import { MoneyInput } from '../MoneyInput';

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
  percentWidth?: number;
  prefix?: string;
  delimiter?: string;
  separator?: string;
  precision?: number;
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
  percentWidth = 100,
  prefix,
  delimiter,
  separator,
  precision,
  ...rest
}: Props) {
  return (
    <Container percent={percentWidth}>
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

          if (type === TextInputTypeEnum.money) {
            return (
              <MoneyInput
                error={error}
                iconColor={iconColor}
                {...rest}
                inputRef={inputRef}
                value={value}
                onChangeValue={onChange}
                prefix="R$ "
                signPosition="beforePrefix"
                delimiter="."
                precision={2}
                separator=","
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
