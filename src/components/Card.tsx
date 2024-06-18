import React, {FunctionComponent} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {CardProps, PickerType, dictionaryIconsType} from '../interfaces';
import globalStyles from '../styles';
import {formatDate, formatQuantity} from '../helpers';

const dictionaryIcons: dictionaryIconsType = {
  [PickerType.ahorro]: require('../img/icono_ahorro.png'),
  [PickerType.comida]: require('../img/icono_comida.png'),
  [PickerType.casa]: require('../img/icono_casa.png'),
  [PickerType.gastos]: require('../img/icono_gastos.png'),
  [PickerType.ocio]: require('../img/icono_ocio.png'),
  [PickerType.salud]: require('../img/icono_salud.png'),
  [PickerType.suscripciones]: require('../img/icono_suscripciones.png'),
};

const Card: FunctionComponent<CardProps> = ({expens, setModal, setExpens}) => {
  const handleActions = () => {
    setModal(true);
    setExpens(expens);
  };

  return (
    <Pressable onPress={() => handleActions()}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentImg}>
            <Image
              style={styles.img}
              source={dictionaryIcons[PickerType[expens.category]]}
            />
            <View style={styles.contentText}>
              <Text style={styles.category}>{expens.category}</Text>
              <Text style={styles.name}>{expens.name}</Text>
              <Text style={styles.date}>{formatDate(expens.date)}</Text>
            </View>
          </View>
          <Text style={styles.quantity}>{formatQuantity(expens.quantity)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentImg: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  contentText: {
    flex: 1,
  },
  category: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    fontWeight: '700',
    color: '#DB2777',
  },
});

export default Card;
