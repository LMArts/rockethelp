import { useState } from 'react';
import { Center, FlatList, Heading, HStack, Icon, IconButton, Text, useTheme, VStack } from 'native-base';
import {Entypo, Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import Logo from '../../../assets/logo_secondary.svg';
import { Filters } from '../../../components/filters';
import { Orders, OrderProps } from '../../../components/orders';
import { Button } from '../../../components/button';

export function Home() {

  const [statusSelect, setStatusSelect] = useState<'open' | 'closed'>('open');
  const [ordens, setOrdens] = useState<OrderProps[]>([
    {
      id: '123',
      patrimony: '12345',
      when: '18/07/2022 às 22:00',
      status: 'open'
    }
  ])

  const navigation = useNavigation();
  const {colors} = useTheme();

  const handleNavigationRegister = () => {
    navigation.navigate('register')
  }
  const handleNavigationDetails = (orderId: string) => {
    navigation.navigate('details', {orderId})
  }

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
            Solicitações
          </Heading>
          <Text
            color='gray.200'
          >
            {ordens.length}
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
          renderItem={({item}) => <Orders data={item} onPress={()=>handleNavigationDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
          ListEmptyComponent={()=> (
            <Center>
              <Icon size={10} as={<Ionicons name='chatbubbles-outline' color={colors.gray[300]} />} />
              <Text color={colors.gray[300]} fontSize='md' mt={4} textAlign='center'>
                Você ainda não possui {'\n'} 
                solicitações {statusSelect === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title='Nova solicitação' onPress={()=>handleNavigationRegister()}/>

      </VStack>
    </VStack>
  );
}