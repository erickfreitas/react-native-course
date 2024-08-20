import { StyleSheet, Text, View, Pressable } from 'react-native';

function GoalItem({ item, deleteGoalHandler }) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#dddddd' }}
        onPress={() => deleteGoalHandler(item.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{item.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default GoalItem;
