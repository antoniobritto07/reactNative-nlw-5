import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import weteringIMG from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Feather } from "@expo/vector-icons"
// expo install @expo/vector-icons ->importação para mexer com icones importanto diretamente pelo expo

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      {/* esse safeAreaView serve apenas para ficar em torno de todos os elementos da página, porem ele é melhor porque ele leva em consideração aquela borda preta que tem em cima do iphone */} */
      {/* não conseguimos dar padding no SafeAreaView */}
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
        suas plantas de {'\n'}
        forma fácil
        </Text>

        <Image
          source={weteringIMG}
          style={styles.image}
          resizeMode="contain" //isso para a imagem ficar contida dentro da window, e nao ser tratada como um elemento comum
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar as plantas.
          Nós cuidamos de lembrar você sempre que precisar
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
        >
          {/* esse elemento do "TouchableOpacity" serve como uma espécie de botão que muda a opacidade sempre que é pressionado */}
          <Feather
            name="chevron-right"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1, // para ocupar todo espaço da tela
    alignItems: 'center',
    justifyContent: 'space-around', //quando usa o between ele nao cola os elementos na borda e fica melhor
    paddingHorizontal: 20 // isso serve para apenas nao encostar nas bordas do celular
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34 //altura de cada linha do texto
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    width: 56,
    height: 56,
  },
  image: { // react native trabalha com densidade de pixel e nao de pixel diretamente
    height: Dimensions.get("window").width * 0.7 // isso é bom para trablhar melhor com responsividade, obtendo o tamanho da tela de forma dinâmica
    //na linha de cima basicamente ele pega o tamanha da janela e multiplica por 0.7
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  },
  buttonIcon: {
    fontSize: 22,
    color: colors.white
  }
})