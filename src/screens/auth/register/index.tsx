import React, { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { Register } from './components';
import { useNavigation } from '@react-navigation/native';

export function RegisterScreen() {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleNewOrder = (patrimony: string, description: string) => {
    if(!patrimony || !description){
      return Alert.alert('Preencha todos os campos!');
    }
    setLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(()=> {
      Alert.alert('Solicitação registrada com sucesso!');
      navigation.goBack();
    }).catch((error)=>{
      setLoading(false);
      return Alert.alert('Desculpe, não foi possível registrar a solicitação.')
    })
  }

  return (
    <Register
      loading={loading}
      order={handleNewOrder}
    />
  );
}