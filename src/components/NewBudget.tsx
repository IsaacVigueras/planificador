import React, {FunctionComponent} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NewBudgetProps} from '../interfaces';
import globalStyles from '../styles';

const NewBudget: FunctionComponent<NewBudgetProps> = ({
  onPress,
  budget,
  setBudget,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={budget?.toString() || ''}
        onChangeText={value => setBudget(Number(value) || 0)}
      />
      <Pressable style={styles.btn} onPress={() => onPress(budget)}>
        <Text style={styles.btnText}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NewBudget;
