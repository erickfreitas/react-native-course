import { useLayoutEffect } from 'react';
//import { useRoute } from '@react-navigation/native';

import MealsList from '../components/MealsList/MealsList';
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

  return (
    <MealsList items={displayedMeals} />
  );
}

export default MealsOverviewScreen;