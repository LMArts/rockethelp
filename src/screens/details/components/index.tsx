import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {DesktopTower, Clipboard, CircleWavyCheck} from 'phosphor-react-native';

import { Header } from '../../../components/header';
import { Loading } from '../../../components/loading';
import { OrderProps } from '../../../components/orders';
import { Cards } from '../../../components/cards';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { useState } from 'react';

export type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

type IDetailsProp = {
  orderDetailData: OrderDetails;
  loading: boolean;
  solution: (solution: string) => void;
  loadingClose: boolean;
}

export function Details({
  loading,
  orderDetailData,
  solution,
  loadingClose
}: IDetailsProp) {

  if(loading){
    return <Loading/>
  }

  const {colors} = useTheme();
  const statusColor = orderDetailData.status === 'open' ? colors.secondary[700] : colors.green[300];
  const [solutionText, setSolutionText] = useState('');

  return (
    <VStack flex={1} bg='gray.700'>
      <Box px={6} bg='gray.600'>
        <Header
          title='Solicitação'
        />
      </Box>

      <HStack bg='gray.500' justifyContent='center' alignItems='center' p={4}>
        {
          orderDetailData.status === 'closed'
          ? <AntDesign name='checkcircle' color={statusColor} size={20} />
          : <MaterialCommunityIcons name='timer-sand-empty' color={statusColor} size={20}/>
        }

        <Text
          fontSize='sm'
          color={statusColor}
          ml={2}
          textTransform='uppercase'
        >
          {orderDetailData.status === 'open' ? 'Em andamento' : 'Finalizado'}
        </Text>
      </HStack>
    
      <ScrollView
          mx={5}
          showsVerticalScrollIndicator={false}
        >
          <Cards
            title='equipamento'
            description={`Patrimônio: ${orderDetailData.patrimony}`}
            icon={DesktopTower}
            footer={orderDetailData.when}
          />
          <Cards
            title='descrição do problema'
            description={orderDetailData.description}
            icon={Clipboard}
          />
          <Cards
            title='solução'
            icon={CircleWavyCheck}
            description={orderDetailData.solution}
            footer={orderDetailData.closed && `Encerrado em ${orderDetailData.closed}`}
          >
            {
              orderDetailData.status === 'open' && (
                <Input
                  placeholder='Descrição da solução' 
                  h={24}
                  textAlignVertical='top'
                  multiline
                  onChangeText={setSolutionText}
                />
              )
            }
          </Cards>
      </ScrollView>

      {
        orderDetailData.status === 'open' && 
        <Button
          title='Encerrar solicitação'
          m={5}
          onPress={()=>solution(solutionText)}
          isLoading={loadingClose}
        />
      }
    </VStack>
  );
}