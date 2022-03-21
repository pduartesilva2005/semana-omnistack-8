import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services/api';

import logoImg from '../../assets/logo.png';
import likeImg from '../../assets/like.png';
import dislikeImg from '../../assets/dislike.png';
import itsamatchImg from '../../assets/itsamatch.png';

import { styles } from './styles';

export function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: id }
    });

    socket.on('match', dev => {
      setMatchDev(null);
    });
  }, [id]);

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logoImg} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {users.length === 0 ? (
          <Text style={styles.empty}>Acabou :(</Text>
        ) : (
          users.map((user, index) => (
            <View
              key={user._id}
              style={[styles.card, { zIndex: users.length - index }]}
            >
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <View style={styles.footer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>
                  {user.bio}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislikeImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={likeImg} />
          </TouchableOpacity>
        </View>
      )}

      {matchDev && (
        <View style={styles.matchContainer}>
          <Image source={itsamatchImg} style={styles.matchImage} />
          <Image source={{ uri: matchDev.avatar }} style={styles.matchAvatar} />

          <Text style={styles.matchName}>{matchDev.name}</Text>
          <Text style={styles.matchName}>{matchDev.bio}</Text>

          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.closeMatch}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
