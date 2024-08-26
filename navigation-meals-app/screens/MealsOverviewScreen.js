import { View, Text, StyleSheet } from 'react-native';
//import { useRoute } from '@react-navigation/native';

import { MEALS } from '../data/dummy-data';

function MealsOverviewScreen({ route }) {

  //Também é possível usar o useRoute para obter os parâmetros da rota.
  //const route = useRoute();
  //route.params;

  const categoryId = route.params.categoryId;

  return <View style={styles.container}>
    <Text>MealsOverviewScreen - {categoryId}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
})

export default MealsOverviewScreen;