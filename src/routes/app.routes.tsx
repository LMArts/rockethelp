import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { RegisterScreen } from "../screens/auth/register";
import { DetailsScreen } from "../screens/details";
import { HomeScreen } from "../screens/home";


const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes () {
 return(
  <Navigator screenOptions={{ headerShown: false}}>
    <Screen name='home' component={HomeScreen}/>
    <Screen name='register' component={RegisterScreen}/>
    <Screen name='details' component={DetailsScreen}/>
  </Navigator>
 ) 
}