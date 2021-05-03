import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { loadPlant, PlantProps, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}`, [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants(oldData => oldData.filter(item => item.id !== plant.id)) //retorna e joga dentro do estado todos os elementos que nao possuem id igual ao que foi removido -> daria para fazer isso com Async Storage também
          } catch (error) {
            Alert.alert('Não foi possível remover')
            throw new Error(error)
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant(); //pega todas as plantas que a pessoa tem no async storage dela

      const nextTime = formatDistance( //função do date-fns que pega a distancia entre duas datas
        new Date(plantsStoraged[0].dateTimeNotification).getTime(), //pega o valor da próxima planta a ser regada já que está em ordem alfabética
        new Date().getTime(), //pega o tempo de agora
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}` //publica o que tem que ser publicado
      )
      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, [])

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image
          source={waterdrop}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecundary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})