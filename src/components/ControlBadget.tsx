import React, {FunctionComponent, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles';
import {ControlBudgetProps} from '../interfaces';
import {formatQuantity} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlBadget: FunctionComponent<ControlBudgetProps> = ({
  budget,
  expenses,
  resetApp,
}) => {
  const [available, setAvailable] = useState<number>(0);
  const [spent, setSpent] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (current, value) => current + value.quantity,
      0,
    );

    const totalAvailable: number = budget - totalExpenses;
    const newPercent = ((budget - totalAvailable) / budget) * 100;

    setPercent(newPercent);

    setAvailable(totalAvailable);
    setSpent(totalExpenses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  return (
    <View style={styles.container}>
      <View style={styles.centerGraph}>
        <CircularProgress
          value={percent}
          duration={1100}
          radius={150}
          valueSuffix="%"
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          activeStrokeColor="#3B82F6"
          inActiveStrokeWidth={15}
          activeStrokeWidth={15}
          titleStyle={styles.circularProgress}
          titleColor="#64748B"
        />
      </View>
      <View style={styles.containerText}>
        <Pressable style={styles.btnReset} onPress={resetApp}>
          <Text style={styles.btnResetText}>Reiniciar App</Text>
        </Pressable>
        <Text style={styles.values}>
          <Text style={styles.label}>Presupuesto: {''}</Text>
          {formatQuantity(budget)}
        </Text>
        <Text style={styles.values}>
          <Text style={styles.label}>Disponible: {''}</Text>
          {formatQuantity(available)}
        </Text>
        <Text style={styles.values}>
          <Text style={styles.label}>Gastado: {''}</Text>
          {formatQuantity(spent)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  centerGraph: {
    alignItems: 'center',
  },
  circularProgress: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnReset: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 10,
  },
  btnResetText: {
    textAlign: 'center',
    color: '#FFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  img: {
    width: 250,
    height: 250,
  },
  containerText: {
    marginTop: 50,
  },
  values: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});

export default ControlBadget;
