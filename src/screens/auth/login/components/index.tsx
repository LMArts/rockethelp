import React from "react";
import {Heading, Icon, useTheme, VStack } from "native-base";
import {EvilIcons, Ionicons} from '@expo/vector-icons'

import Logo from '../../../../assets/logo_primary.svg'
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";

export function SignIn () {

  const {colors} = useTheme();

  return(
    <VStack
      flex={1}
      alignItems='center'
      bg='gray.600'
      px={8}
      pt={24}
    >
      <Logo/>

      <Heading 
        color='gray.100'
        fontSize='xl'
        mt={20}
        mb={6}
      >
        Acesse sua conta
      </Heading>

      <Input
        placeholder='E-mail'
        mb={4}
        InputLeftElement={<Icon size={6} ml={4} as={<EvilIcons name="envelope" color={colors.gray[300]}/>}/>}
      />
      <Input
        placeholder='Senha'
        mb={8}
        InputLeftElement={<Icon size={5} ml={4} as={<Ionicons name="key-outline" color={colors.gray[300]}/>}/>}
        secureTextEntry
      />

      <Button
        title="Entrar"
        w='full'
      />

    </VStack>
  )
}