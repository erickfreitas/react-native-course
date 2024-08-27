import { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
//import { useRoute } from '@react-navigation/native';

import MealItem from '../components/MealItem';
import { MEALS, CATEGORIES } from '../data/dummy-data';

function MealsOverviewScreen({ route, navigation }) {
  //Também é possível usar o useRoute para obter os parâmetros da rota.
  //const route = useRoute();
  //route.params;

  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  useLayoutEffect(() => {
    const category = CATEGORIES.find((category) => category.id === categoryId);
    navigation.setOptions({ title: category.title });
  }, [categoryId, navigation]);

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
