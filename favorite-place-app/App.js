import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import PlaceDetails from './screens/PlaceDetails';
import Map from './screens/Map';
import IconButtons from './components/ui/IconButtons';
import { Colors } from './constants/colors';
import { init } from './util/database';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
      SplashScreen.hideAsync(); 
    });
  }, []);

  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: (tintColor) => (
                <IconButtons
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlaces')}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlaces'
            component={AddPlaces}
            options={{
              title: 'Add a new place',
            }}
          />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title: 'Loading place...',
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
