import React from 'react';
import AppLoading from 'expo-app-loading';
//usando fonts diretamente com uma funcionalidade do expo chamada @expo google fonts

import Routes from './src/routes';

import {
  useFonts,
  Jost_600SemiBold,
  Jost_400Regular
} from '@expo-google-fonts/jost';

// expo install expo-app-loading -> instalação para conseguir segurar a tela de splash enquanto a tela estiver carregando( basicamente enquanto os elementos nao tenham ainda carregados )
// fica aparecendo a imagem enquanto as coisas, como a fonte, nao estiver carregada ainda

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if (!fontsLoaded) {
    <AppLoading />
  }
  return (
    <Routes />
  )
}