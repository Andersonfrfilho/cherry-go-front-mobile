import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacityProps, Modal as ModalRN } from 'react-native';
import { useState } from 'react';
import { Container, Button, AreaButton, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  text: string;
  modalVisible: boolean;
  setModalVisible: () => {};
  titleButton: string;
  onPress: () => {};
}

export function Modal({
  title,
  text,
  modalVisible = true,
  titleButton,
  onPress,
  ...rest
}: Props) {
  return (
    <ModalRN animationType="slide" transparent={false} visible={modalVisible}>
      <Container>
        <Title>{title}</Title>
        <Text>{text}</Text>
        <Button onPress={onPress} {...rest}>
          <Text>{titleButton}</Text>
        </Button>
      </Container>
    </ModalRN>
  );
}
