import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  },
  hour: string,
  dateTimeNotification: Date;
}

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
  }
}

//algoritmo que salva as plantas que a pessoa selecionar no localStorage do celular dela
export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      }));
  } catch (error) {
    throw new Error(error);
  }
}

//algoritmo que carrega as plantas que a pessoa tem no localStorage do celular dela
export async function loadPlant() {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
    const plantsSorted = Object
      .keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm') //incluindo o horario já formatado
        }
      })
      //fazendo a ordenação das plantas pela data
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      )
    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}