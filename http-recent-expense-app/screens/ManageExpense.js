import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

import { ExpensesContext } from '../store/expenses-context';
import { storeExpense } from '../util/http';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    console.log('Delete');
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    console.log('Cancel');
    navigation.goBack();
  }

  function confirmHandler({ description, amount, date }) {
    console.log('Confirm');

    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: description,
        amount: amount,
        date: date,
      });
    } else {
      storeExpense({ description: description, amount: amount, date: date });

      expensesCtx.addExpense({
        description: description,
        amount: amount,
        date: date,
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing ? (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      ) : null}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
