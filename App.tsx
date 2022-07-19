import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { LoginScreen } from './src/screens/auth/login';
import { THEME } from './src/styles/theme';
import { Loading } from './src/components/loading';
import { HomeScreen } from './src/screens/home';
import { RegisterScreen } from './src/screens/auth/register';
import { Routes } from './src/routes';

export default function App() {
  const [fontLoad] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontLoad ? <Routes/> : <Loading/>}
    </NativeBaseProvider>
  );
}

