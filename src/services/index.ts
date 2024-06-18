import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = (key: string, value: any) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error('Error to set Item');
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    throw new Error('Error to get Item');
  }
};

export const removeItem = (key: string) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error('Error to remove Item');
  }
};

export const clearStorage = () => {
  try {
    AsyncStorage.clear();
  } catch (error) {
    throw new Error('Error to clear storage');
  }
};
