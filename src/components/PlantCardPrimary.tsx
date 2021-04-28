import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'
// expo install react-native-svg -> essa biblioteca é usada para a gente conseguir carregar imagens do tipo SVG no native, porque elas estao vindo assim da api que estamos consumindo
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantsProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({ data, ...rest }: PlantsProps) {
  return (
    <RectButton style={styles.container}
      {...rest}
    >
      <SvgFromUri //jeito que importa as fotos em svg
        uri={data.photo} //uri indica a referencia da imagem
        width={70}
        height={70}
      />
      <Text style={styles.text}>
        {data.name}
      </Text>
    </RectButton>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})