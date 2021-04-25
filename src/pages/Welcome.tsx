import React from 'react';
import { Image, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import weteringIMG from "../assets/watering.png";
import colors from "../styles/colors";

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      {/* esse safeAreaView serve da mesma forma que a View para contornar todos os elementos da página, porem ele é melhor porque ele leva em consideração aquela borda preta que tem em cima do iphone */}
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
        </Text>

      <Image source={weteringIMG} style={styles.image} />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar as plantas.
        Nós cuidamos de lembrar você sempre que precisar
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        {/* esse elemento serve como uma espécie de botão que muda a opacidade sempre que é pressionado */}
        <Text style={styles.buttonText}>
          ENZO
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "center",
    color: colors.heading,
    marginTop: 38
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  image: {
    width: 292,
    height: 284
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  }
})