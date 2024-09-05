import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

import Loading from '../components/UI/Loading';
import ErrorOutput from '../components/UI/ErrorOutput';

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  function errorHandler(error) {
    setError(null);
  }

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);

      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }

      setIsLoading(false);
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return <ErrorOutput message={error} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName='Last 7 days'
      fallbackText='No expenses registered for the last 7 days'
    />
  );
}

export default RecentExpenses;
