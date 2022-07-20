import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { Details, OrderDetails } from './components';
import { OrderDTO } from '../../DTOs/OrderDTO';
import { dateFormat } from '../../utils';
import { Alert } from 'react-native';

type RouteParams = {
  orderId: string;
}

export function DetailsScreen() {
  
  const navigation = useNavigation();
  const route = useRoute();
  const {orderId} = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [loadingClose, setLoadingClose] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({} as OrderDetails);

  const handleOrderClose = (solution: string) => {
    if(!solution){
      return Alert.alert('Informe a solução para encerrar a solicitação!')
    }

    setLoadingClose(true);

    firestore()
    .collection<OrderDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    }).then(()=>{
      Alert.alert('Solicitação encerrada com sucesso!')
      navigation.goBack();
    }).catch((error)=>{
      Alert.alert('Desculpe, não foi possível encerrar a solicitação')
    })

    setLoading(false)
  }

  useEffect(()=>{
    firestore()
    .collection<OrderDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc)=>{
      const {patrimony, description, status, created_at, closed_at, solution} = doc.data();

      const closed = closed_at ? dateFormat(closed_at) : null;

      setOrderDetails({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed
      });
      setLoading(false);
    })
  },[orderId]);

  return (
    <Details
      loading={loading}
      orderDetailData={orderDetails}
      solution={handleOrderClose}
      loadingClose={loadingClose}
    />
  );
}