import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import ControlBadget from './src/components/ControlBadget';
import {PickerType, expenseType} from './src/interfaces';
import ExpenseForm from './src/components/ExpenseForm';
import ListExpense from './src/components/ListExpense';
import {generateId} from './src/helpers';
import Filter from './src/components/Filter';
import {clearStorage, getItem, setItem} from './src/services';

function App(): React.JSX.Element {
  const [isValidBudget, setIsValidBudget] = useState<boolean>(false);
  const [budget, setBudget] = useState<number>(0);
  const [expenses, setExpenses] = useState<expenseType[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [expense, setExpens] = useState<expenseType | undefined>();

  const [filter, setFilter] = useState<PickerType>(PickerType.emty);
  const [filterData, setFilterData] = useState<expenseType[]>([]);

  useEffect(() => {
    getBudgetStorage();
    getExpensesStorage();
  }, []);

  useEffect(() => {
    isValidBudget && budget && setItem('budget', budget);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidBudget]);

  const getBudgetStorage = async () => {
    const budgetStorage: number = (await getItem('budget')) || 0;

    if (budgetStorage) {
      setBudget(budgetStorage);
      setIsValidBudget(true);
    }
  };

  const getExpensesStorage = async () => {
    const expensesStorage: expenseType[] = (await getItem('expenses')) || [];

    setExpenses(expensesStorage);
  };

  useEffect(() => {
    setItem('expenses', expenses);
  }, [expenses]);

  const handleNewBudget = (badget: number) => {
    if (badget) {
      setIsValidBudget(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', [
        {text: 'OK'},
      ]);
    }
  };

  const handleExpens = (expense: expenseType) => {
    if ([expense.category, expense.name, expense.quantity].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (expense.id) {
      const updateExpense = expenses.map(item =>
        item.id === expense.id ? expense : item,
      );

      setExpenses(updateExpense);
      setExpens(undefined);
    } else {
      expense.id = generateId();
      expense.date = Date.now();

      setExpenses([...expenses, expense]);
    }

    setModal(!modal);
  };

  const handleDeleteExpense = (id: string) => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Si, Continuar',
          onPress: () => {
            const filterExpenses = expenses.filter(item => item.id !== id);
            setExpenses(filterExpenses);
            setExpens(undefined);
            setModal(false);
          },
        },
      ],
    );
  };

  const resetApp = () => {
    Alert.alert(
      '¿Deseas resetear la App?',
      'Esto eliminará presupuesto y gastos',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Si, continuar',
          onPress: () => {
            clearStorage();
            setIsValidBudget(false);
            setExpenses([]);
            setFilterData([]);
            setBudget(0);
            setFilter(PickerType.emty);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidBudget ? (
            <ControlBadget
              resetApp={resetApp}
              expenses={expenses}
              budget={budget}
            />
          ) : (
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              onPress={handleNewBudget}
            />
          )}
        </View>
        {isValidBudget && (
          <>
            <Filter
              expenses={expenses}
              filter={filter}
              setFilter={setFilter}
              setFilterData={setFilterData}
            />
            <ListExpense
              setExpens={setExpens}
              setModal={setModal}
              expenses={filterData}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          animationType="fade"
          visible={modal}
          onRequestClose={() => setModal(!modal)}>
          <ExpenseForm
            expense={expense}
            setExpens={setExpens}
            handleExpens={handleExpens}
            setModal={setModal}
            handleDeleteExpense={handleDeleteExpense}
          />
        </Modal>
      )}
      {isValidBudget && (
        <Pressable onPress={() => setModal(!modal)} style={styles.btnAdd}>
          <Image
            style={styles.img}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  img: {
    width: 60,
    height: 60,
  },
  btnAdd: {
    position: 'absolute',
    right: 40,
    bottom: 20,
  },
});

export default App;
