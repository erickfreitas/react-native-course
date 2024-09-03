import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from './Input';
import Button from '../UI/Button';
import { getUSFormattedDate } from '../../util/date';

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getUSFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    console.log(inputIdentifier, enteredValue);
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toDateString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevInputs) => {
        return {
          amount: {
            value: prevInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: prevInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: prevInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (enteredValue) => {
              inputChangedHandler('amount', enteredValue);
            },
            value: inputs.amount.value,
            invalid: !inputs.amount.isValid,
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (enteredValue) => {
              inputChangedHandler('date', enteredValue);
            },
            value: inputs.date.value,
            invalid: !inputs.date.isValid,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          // autoCorrect: true, default is true
          // autoCapitalize: 'none'
          onChangeText: (enteredValue) => {
            inputChangedHandler('description', enteredValue);
          },
          value: inputs.description.value,
          invalid: !inputs.description.isValid,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode='flat' style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    margin: 8,
  },
});
