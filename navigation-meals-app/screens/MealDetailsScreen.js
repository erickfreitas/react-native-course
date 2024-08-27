import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';

import { MEALS } from '../data/dummy-data';

function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
    });
  }, [navigation, selectedMeal]);

  return <Text>{selectedMeal.title}</Text>;
}

export default MealDetailsScreen;
