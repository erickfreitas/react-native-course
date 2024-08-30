import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import UserScreen from './screens/UserScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            headerStyle: { backgroundColor: '#3c0a6b' },
            headerTintColor: '#fff',
            drawerActiveBackgroundColor: '#2c0451',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#ffffff',
            drawerContentStyle: {
              backgroundColor: '#3c0a6b',
            },
          }}
        >
          <Drawer.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{
              drawerLabel: 'Welcome Screen',
              drawerIcon: ({ color, size }) => {
                return <Ionicons name='home' color={color} size={size} />;
              },
            }}
          />
          <Drawer.Screen
            name='User'
            component={UserScreen}
            options={{
              drawerIcon: ({ color, size }) => {
                return <FontAwesome5 name='users' color={color} size={size} />;
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
