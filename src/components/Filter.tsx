import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles';
import {Picker} from '@react-native-picker/picker';
import {FilterProps, PickerType, expenseType} from '../interfaces';

const Filter: FunctionComponent<FilterProps> = ({
  setFilter,
  setFilterData,
  filter,
  expenses,
}) => {
  useEffect(() => {
    let newData: expenseType[] = expenses;

    if (filter !== PickerType.emty) {
      newData = expenses.filter(
        item => PickerType[item.category] === PickerType[filter],
      );
    }

    setFilterData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, expenses]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <Picker selectedValue={filter} onValueChange={setFilter}>
        <Picker.Item label="-- Seleccione --" value="emty" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos Varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
});

export default Filter;
