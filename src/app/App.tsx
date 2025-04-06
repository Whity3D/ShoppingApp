import Icon from '@react-native-vector-icons/material-design-icons';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { CartScreen } from '../screens/cart';
import { CatalogScreen } from '../screens/catalog';
import type { RootStackParamsList } from '../shared/types';

const Tab = createMaterialBottomTabNavigator<RootStackParamsList>();

export const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Catalog"
              activeColor="#6200ee"
              inactiveColor="gary"
              barStyle={{ backgroundColor: '#fff' }}
            >
              <Tab.Screen
                name="Catalog"
                component={CatalogScreen}
                options={{
                  tabBarLabel: 'Catalog',
                  tabBarIcon: ({ color }: { color: string }) => {
                    return <Icon name="store" size={24} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                  tabBarLabel: 'Cart',
                  tabBarIcon: ({ color }: { color: string }) => {
                    return <Icon name="cart" size={24} color={color} />;
                  },
                }}
              />
            </Tab.Navigator>
            <Toast visibilityTime={1500} />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  );
};
