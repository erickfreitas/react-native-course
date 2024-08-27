import { View, Text, StyleSheet, FlatList } from 'react-native';
//import { useRoute } from '@react-navigation/native';

import MealItem from '../components/MealItem';
import { MEALS } from '../data/dummy-data';

function MealsOverviewScreen({ route }) {
  //Também é possível usar o useRoute para obter os parâmetros da rota.
  //const route = useRoute();
  //route.params;

  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  function renderMealItem(itemData) {
    return <MealItem {...itemData.item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsOverviewScreen;
