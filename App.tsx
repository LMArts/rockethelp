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

export default function App() {
  const [fontLoad] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontLoad ? <LoginScreen/> : <Loading/>}
    </NativeBaseProvider>
  );
}
