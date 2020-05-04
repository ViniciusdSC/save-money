import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import header from '~/components/Header';

import SetMoney from '~/pages/SetMoney';
import AddSpent from '~/pages/AddSpent';
import Main from '~/pages/Main';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header,
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerTitle: 'Save Money',
          }}
        />
        <Stack.Screen
          name="SetMoney"
          component={SetMoney}
          options={{
            headerTitle: 'Ajuste sua renda',
          }}
        />
        <Stack.Screen
          name="AddSpent"
          component={AddSpent}
          options={{
            headerTitle: 'Adicione um gasto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
