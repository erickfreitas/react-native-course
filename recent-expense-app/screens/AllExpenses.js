import { Text } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
  return <ExpensesOutput expenses={[]} periodName="Total" />
}

export default AllExpenses;