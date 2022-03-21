import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services/api';

import logoImg from '../../assets/logo.png';

import { styles } from './styles';

export function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logoImg} />

      <TextInput
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
