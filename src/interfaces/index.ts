import {ViewStyle} from 'react-native';

export type NewBudgetProps = {
  onPress: (budget: number) => void;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
};

export type ControlBudgetProps = {
  budget: number;
  expenses: expenseType[];
  resetApp: () => void;
};

export type styles = {
  container: ViewStyle;
};

export type ExpenseFormProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleExpens: (expense: expenseType) => void;
  setExpens: React.Dispatch<React.SetStateAction<expenseType | undefined>>;
  expense: expenseType | undefined;
  handleDeleteExpense: (id: string) => void;
};

export type ListExpenseProps = {
  expenses: expenseType[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpens: React.Dispatch<React.SetStateAction<expenseType | undefined>>;
};

export type CardProps = {
  expens: expenseType;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpens: React.Dispatch<React.SetStateAction<expenseType | undefined>>;
};

export type FilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<PickerType>>;
  filter: PickerType;
  expenses: expenseType[];
  setFilterData: React.Dispatch<React.SetStateAction<expenseType[]>>;
};

export type expenseType = {
  category: PickerType;
  date: number;
  id: string;
  name: string;
  quantity: number;
};

export type dictionaryIconsType = {
  [key: string]: number;
};

export enum PickerType {
  ahorro,
  comida,
  casa,
  gastos,
  ocio,
  salud,
  suscripciones,
  emty = 'emty',
}
