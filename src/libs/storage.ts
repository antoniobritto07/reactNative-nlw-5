import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
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
  };
  hour: string,
  dateTimeNotification: Date;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationID: string;
  }
}

//algoritmo que salva as plantas que a pessoa selecionar no localStorage do celular dela
export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    //lógica de notificação para o usuário
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getTime() + interval);
    } else {
      nextTime.setDate(nextTime.getDate() + 1)
    }
    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
    )

    const notificationID = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌵', //peguei emoji do site getemoji.com
        body: `Está na hora de cuidar da sua ${plant.name}`, //corpo da notificação
        sound: true, //se vai tocar algum som quando notificar
        priority: Notifications.AndroidNotificationPriority.HIGH, //prioridade em cada dispositivo
        data: {
          plant //data que pode ir junto com as notificações
        },
      },
      trigger: { //aqui é onde vem a ideia da repetição da alerta
        seconds: seconds < 60 ? 60 : seconds, //tem que agendar pelo menos 60 segundos, por padrão
        repeats: true
      }
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationID
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

//algoritmo para fazer a remoção de uma planta do async storage do usuário
export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationID)
  delete plants[id];

  await AsyncStorage.setItem(
    '@plantmanager:plants',
    JSON.stringify(plants)
  );
}