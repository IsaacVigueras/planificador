import React, {FunctionComponent, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import globalStyles from '../styles';
import {ExpenseFormProps, PickerType} from '../interfaces';

const ExpenseForm: FunctionComponent<ExpenseFormProps> = ({
  setModal,
  handleExpens,
  setExpens,
  expense,
  handleDeleteExpense,
}) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<PickerType>(PickerType.emty);
  const [id, setId] = useState<string>('');
  const [date, setDate] = useState<number>(0);

  useEffect(() => {
    if (expense) {
      setName(expense.name);
      setQuantity(expense.quantity);
      setCategory(expense.category);
      setId(expense.id);
      setDate(expense.date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBtn}>
        <Pressable
          style={[styles.btn, styles.btmCancel]}
          onPress={() => {
            setModal(false);
            setExpens(undefined);
          }}>
          <Text style={styles.btnText}>Cancelar</Text>
        </Pressable>
        {expense && (
          <Pressable
            style={[styles.btn, styles.btnDelete]}
            onLongPress={() => handleDeleteExpense(id)}>
            <Text style={styles.btnText}>Eliminar</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>
          {`${expense ? 'Editar' : 'Nuevo'} Gasto`}
        </Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre del gasto. ej. Comida"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            value={quantity.toString()}
            onChangeText={value => setQuantity(Number(value))}
            keyboardType="numeric"
            placeholder="Cantidad del gasto. ej. 300"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Categoria Gasto</Text>
          <Picker selectedValue={category} onValueChange={setCategory}>
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos Varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
          </Picker>
        </View>
        <Pressable
          style={styles.btnSubmit}
          onPress={() =>
            handleExpens({
              id,
              name,
              quantity,
              category,
              date,
            })
          }>
          <Text style={styles.btnSubmitText}>{`${
            expense ? 'Guardar' : 'Agregar'
          } Gasto`}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    width: '50%',
    flex: 1,
  },
  btnDelete: {
    backgroundColor: 'red',
  },
  btmCancel: {
    backgroundColor: '#DB2777',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFF',
  },
  form: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnSubmit: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 20,
  },
  btnSubmitText: {
    textAlign: 'center',
    color: '#FFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ExpenseForm;
