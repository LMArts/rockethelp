import React, { useState } from "react";
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native";

import { SignIn } from "./components";

export function LoginScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (user: string, pass: string): void => {
    if(!user || !pass){
      return Alert.alert('E-mail e senha são obrigatórios!');
    }
    setIsLoading(true);
    auth().signInWithEmailAndPassword(user, pass)
    .catch((error)=> {
      setIsLoading(false)

      if(error.code === 'auth/user-not-found') {
        return Alert.alert('E-mail ou senha inválidos!')
      }
      if(error.code === 'auth/invalid-email') {
        return Alert.alert('E-mail ou senha inválidos!')
      }
      if(error.code === 'auth/wrong-password') {
        return Alert.alert('E-mail ou senha inválidos!')
      }

      return Alert.alert('Desculpe, não foi possível acessar.')
    })
  }

  return(
    <SignIn
      signIn={handleSignIn}
      loading={isLoading}
    />
  )
}