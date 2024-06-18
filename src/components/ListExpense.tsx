import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListExpenseProps} from '../interfaces';
import Card from './Card';

const ListExpense: FunctionComponent<ListExpenseProps> = ({
  expenses,
  setModal,
  setExpens,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos</Text>
      {!expenses.length ? (
        <Text style={styles.emtyData}>No hay gastos</Text>
      ) : (
        expenses.map(item => (
          <Card
            setExpens={setExpens}
            setModal={setModal}
            key={item.id}
            expens={item}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 100,
  },
  title: {
    color: '#64748b',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  emtyData: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
});

export default ListExpense;
