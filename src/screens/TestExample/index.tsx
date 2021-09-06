import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function TestExample() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        value="Rodrigo"
        autoCorrect={false}
      />
      <TextInput
        testID="input-last-name"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Gonçalves"
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
