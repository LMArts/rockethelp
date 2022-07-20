import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Home } from './components';
import { Alert } from 'react-native';
import { dateFormat } from '../../utils';
import { OrderProps } from '../../components/orders';

export function HomeScreen() {

  const [loading, setLoading] = useState(true);
  const [statusSelect, setStatusSelect] = useState<'open' | 'closed'>('open');
  const [order, setOrders] = useState<OrderProps[]>([]);

  const handleLogout = () => {
    auth()
    .signOut()
    .catch((error)=> {
      return Alert.alert('Desculpe, não foi possível realizar o logout.')
    })
  }

  const handleChangeStatus = (status: any) => {
    setStatusSelect(status);
  }

  useEffect(()=> {
    setLoading(true);
    const subscriber = firestore()
    .collection('orders')
    .where('status', '==', statusSelect)
    .onSnapshot(snaphot => {
      const data = snaphot.docs.map(doc => {
        const {patrimony, description, status, created_at} = doc.data();

        return {
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at)
        }
      });
      setOrders(data);
      setLoading(false);
    });

    return subscriber;
  },[statusSelect])

  return (
    <Home
      logout={handleLogout}
      status={statusSelect}
      statusChange={handleChangeStatus}
      loading={loading}
      orderData={order}
    />
  );
}