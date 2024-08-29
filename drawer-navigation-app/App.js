import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserScreen from './screens/UserScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default function App() {

  const Drawer = createDrawerNavigator();

  return <NavigationContainer>
    <Drawer.Navigator initialRouteName="Welcome">
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
    </Drawer.Navigator>
  </NavigationContainer>;
}
