import React, {FunctionComponent} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const Header: FunctionComponent = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: '#ffff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});

export default Header;
