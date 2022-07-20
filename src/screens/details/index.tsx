import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { Details, OrderDetails } from './components';
import { OrderDTO } from '../../DTOs/OrderDTO';
import { dateFormat } from '../../utils';

type RouteParams = {
  orderId: string;
}

export function DetailsScreen() {
  
  const route = useRoute();
  const {orderId} = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({} as OrderDetails);

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
      solution={solution}
    />
  );
}