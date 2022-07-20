import { VStack } from 'native-base';
import { useState } from 'react';
import { Button } from '../../../../components/button';

import { Header } from '../../../../components/header';
import { Input } from '../../../../components/input';

type IRegisterProps = {
  order: (patrimony: string, description: string) => void;
  loading: boolean;
}

export function Register({
  loading,
  order
}: IRegisterProps) {
  
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Solicitação' />

      <Input
        placeholder='Patrimônio'
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
      />

      <Button
        title='Cadastrar'
        mt={5}
        isLoading={loading}
        onPress={()=>order(patrimony, description)}
      />
    </VStack>
  );
}