import { createContext, useReducer } from 'react';

import { DUMMY_EXPENSES } from '../data/expenses';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount }) => { },
  setExpenses: (expenses) => { },
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      // find the index of the expense to be updated
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      // get the expense to be updated
      const updatableExpense = state[updatableExpenseIndex];
      // update the expense
      const updateditem = { ...updatableExpense, ...action.payload.data };
      // create a new array with the updated expense
      const updatedExpenses = [...state];
      // replace the old expense with the updated one
      updatedExpenses[updatableExpenseIndex] = updateditem;
      // return the new array
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload.id);
    case 'SET':
      return action.payload
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: { id } });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
