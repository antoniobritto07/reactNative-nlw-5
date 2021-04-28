import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler' //instalando quando a gente instalou o react navigation

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean //interrogação quer dizer que passar essa props nao é obrigatorio
}

export function EnvironmentButton({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.activeContainer
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.activeText
      ]}>
        {title}
      </Text>
    </RectButton>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 5
  },
  activeContainer: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  activeText: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
})