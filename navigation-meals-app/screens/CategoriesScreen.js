import { StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

import CategoryGridTile from '../components/CategoryGridTile';

function CaregoriesScreen({ navigation }) {

  function renderCategoryItem(itemData) {
    function pressHandler() {
      console.log(itemData.item.id);
      navigation.navigate('MealsOverview');
    }
  
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({});

export default CaregoriesScreen;
