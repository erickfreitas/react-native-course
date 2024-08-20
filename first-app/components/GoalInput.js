import { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

function GoalInput({ addGoalHandler }) {
  const [enteredGoal, setEnteredGoal] = useState('');

  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder='Enter text'
        onChangeText={goalInputHandler}
        value={enteredGoal}
      ></TextInput>
      <Button
        title='Add Goal'
        onPress={() => {
          addGoalHandler(enteredGoal);
          setEnteredGoal('');
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});

export default GoalInput;
