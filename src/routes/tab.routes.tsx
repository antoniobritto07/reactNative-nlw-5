import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

import { MaterialIcons } from '@expo/vector-icons';

import colors from '../styles/colors';

const AppTab = createBottomTabNavigator();

const BottomTabRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{ //estiização padrao de todos que contem estes estilos de rota
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon', //isso para a label das rotas embaixo ficar logo embaixo do icone
        style: {
          paddingVertical: 20,
          height: 88
        },
      }}>

      <AppTab.Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => ( //pega a cor e o tamanho dinamicamente que ele definiu de forma geral para todos lá em cima
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default BottomTabRoutes;