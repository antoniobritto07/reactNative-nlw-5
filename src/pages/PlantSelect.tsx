import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator, //loading padrão do react-native
  FlatList // element é usado para redenrizar listas na tela
} from 'react-native';

import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Load } from '../components/Load'

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]); //tipando o tipo de variável
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  //paginação
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);
    if (environment === 'all') {
      return setFilteredPlants(plants)
    }
    const filtered = plants.filter(plant =>
      plant.environments.includes(environment) //filtro feito por aqui
    );
    setFilteredPlants(filtered)
  }

  async function fetchPlants() {
    const { data } = await api
      .get(`lants?_sort=title&order=asc&_page=${page}&_limit=8`)

    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]) //pega os valores antigos que ali estavama armazenados e junta com os novos
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }
    else {
      setPlants(data)
      setFilteredPlants(data)
    }
    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1) //esquema para pegar o valor antigo que estamos armazenado naquele estado
    fetchPlants();
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get("plants_environments?_sort=title&order=asc") //na rota a gente consegue fazer ordenação
      setEnvironment(
        [
          {
            key: "all",
            title: "Todos"
          },
          ...data
        ]
      )
    }
    fetchEnvironment();
  }, [])

  useEffect(() => { //dentro desse use Effect tem toda a lógica de pagincação e tambem das mostragens das animações
    fetchPlants();
  }, [])

  if (loading) {
    return <Load /> //enquanto os componentes nao carregarem, usamos este animação para mostrar em tela
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
      </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
      </Text>
      </View>
      <View>
        <FlatList
          data={environment}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => { handleEnvironmentSelected(item.key) }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false} //tirar a barra de scroll vertical
          numColumns={2} //numero de colunas se nao vai ficar uma so por padrao
          contentContainerStyle={styles.contentContainerStyle} //estilo padrão dos componentes do FlatList 
          onEndReachedThreshold={0.1} //quando o usuário chegar a 10% do final da tela
          onEndReached={({ distanceFromEnd }) => //o que vai fazer quando chegar nessa distancia passada no parametro acima
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={ //renderizar um component no footer
            loadingMore ?
              <ActivityIndicator /> //aparece apenas quando o loadingMore for true
              :
              <> </>
          }
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
  },
  contentContainerStyle: {

  }
})