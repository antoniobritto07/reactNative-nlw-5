import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Welcome } from './src/pages/Welcome';
//usando fonts diretamente com uma funcionalidade do expo chamada @expo google fonts
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import AppLoading from 'expo-app-loading';
// expo install expo-app-loading -> instalação para conseguir segurar a tela de splash enquanto a tela estiver carregando( basicamente enquanto os elementos nao tenham ainda carregados )
// fica aparecendo a imagem enquanto as coisas, como a fonte, nao estiver carregada ainda

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <Welcome />
  )
}