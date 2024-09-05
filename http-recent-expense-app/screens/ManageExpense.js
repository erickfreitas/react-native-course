import { useLayoutEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Loading from '../components/UI/Loading';
import ErrorOutput from '../components/UI/ErrorOutput';

import { ExpensesContext } from '../store/expenses-context';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

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

  async function deleteExpenseHandler() {
    console.log('Delete');

    setIsSubmitting(true);

    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later.');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    console.log('Cancel');
    navigation.goBack();
  }

  async function confirmHandler({ description, amount, date }) {
    console.log('Confirm');

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await updateExpense(expenseId, {
          description: description,
          amount: amount,
          date: date,
        });

        expensesCtx.updateExpense(expenseId, {
          description: description,
          amount: amount,
          date: date,
        });
      } else {
        const id = await storeExpense({
          description: description,
          amount: amount,
          date: date,
        });

        expensesCtx.addExpense({
          id: id,
          description: description,
          amount: amount,
          date: date,
        });
      }

      navigation.goBack();
    }
    catch (error) {
      setError('Could not save data - please try again later.');
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (isSubmitting) {
    return <Loading />;
  }

  if(error && !isSubmitting) {
    return <ErrorOutput message={error} onConfirm={errorHandler} />;
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
