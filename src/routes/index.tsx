import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import { LoginScreen } from "../screens/auth/login";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/loading";

export function Routes(){

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(res => {
      setUser(res);
      setLoading(false);
    });
    return subscriber;
  },[]);

  if(loading){
    return <Loading/>
  }

  return(
    <NavigationContainer>
      {user ? <AppRoutes/> : <LoginScreen/>}
    </NavigationContainer>
  )
}