import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// npm i react-native-iphone-x-helper --save -> instalação que vai ajudar a fazer a aplicação para iphone pois ela leva varias coisas do dispositivo em consideração como por exemplo a partezinha preta que tem em cima
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; //esse aqui pega a altura daquela partezinha preta que tem na parte de cima de todo iphone

import imageJPG from '../assets/imagemperfil.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '')
    }
    loadStorageUserName();
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>
          {userName}
        </Text>
      </View>

      <Image
        source={imageJPG}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(), //seta uma margin para as coisas nao ficarem escondidas atras daquela partezinha preta do iphone
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40, //metade da altura e da largura para arredondar pelo menos
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
})