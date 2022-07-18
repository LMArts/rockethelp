import { useState } from 'react';
import { FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import {Entypo} from '@expo/vector-icons'

import Logo from '../../../assets/logo_secondary.svg';
import { Filters } from '../../../components/filters';
import { Orders, OrderProps } from '../../../components/orders';

export function Home() {

  const [statusSelect, setStatusSelect] = useState<'open' | 'closed'>('open');
  const [ordens, setOrdens] = useState<OrderProps[]>([{
    id: '123',
    patrimony: '123456',
    when: '18/07/2022 at 10:00',
    status: 'open'
  }])

  const {colors} = useTheme();

  return (
    <VStack
      flex={1}
      pb={6}
      bg='gray.700'
    >
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo/>
        <IconButton icon={<Entypo name='log-out' color={colors.gray[300]} size={18} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack 
          w='full'
          mt={8}
          mb={4}
          justifyContent='space-between'
          alignItems='center'
        >
          <Heading color='gray.100'>
            Meus chamados
          </Heading>
          <Text
            color='gray.200'
          >
            3
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filters
            type='open'
            title='Em andamento'
            onPress={()=> setStatusSelect('open')}
            isActive={statusSelect === 'open'}
          />

          <Filters
            type='closed'
            title='Finalizados'
            onPress={()=>setStatusSelect('closed')}
            isActive={statusSelect === 'closed'}
          />
        </HStack>

        <FlatList
          data={ordens}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Orders data={item} />}
        />

      </VStack>
    </VStack>
  );
}