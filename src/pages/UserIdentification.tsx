import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView, //podemos com este personalizar o comportamento de acordo com o dispositivo ao qual a pesosa está usando
  Platform,
  TouchableWithoutFeedback, // isso aqui serve para, do jeito que foi usado para quando a pessoa abrir o teclado, e apertar em alguma coisa fora, ela conseguir fechar o teclado
  Keyboard,  // tem que ser usado da forma com que foi usado lá embaixo na linha 55
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from "../components/Button";
import { Entypo } from '@expo/vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>(); // declarar como uma string vazia dá no mesmo
  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value); //converte em bool, ou seja, se estiver preenchido vai ser true, caso nao, vai ser false
    setName(value)
  }

  async function handleSubmit() {
    if (!!name) {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate("Confirmation");
    }
    else {
      Alert.alert("Me diz como podemos chamar você :(")
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text>
                  <Entypo
                    name="emoji-happy"
                    size={44}
                    color="black"
                  />
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'}chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur} //é basicamente quando o user sai do text imput
                onFocus={handleInputFocus} // é basicamente quando o user foca no text input
                onChangeText={handleInputChange} // ele já passa por padrão o texto passado, nao precisando assim passar como parametro
              >
              </TextInput>
              <View style={styles.footer}>
                <Button
                  title="Confirmar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
})