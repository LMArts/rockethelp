import React from 'react';
import auth from '@react-native-firebase/auth';

import { Home } from './components';
import { Alert } from 'react-native';

export function HomeScreen() {

  const handleLogout = () => {
    auth()
    .signOut()
    .catch((error)=> {
      return Alert.alert('Desculpe, não foi possível realizar o logout.')
    })
  }

  return (
    <Home
      logout={handleLogout}
    />
  );
}