import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp){
  if(timestamp){
    const date = new Date(timestamp.toDate());

    const day = date.toLocaleDateString('pt-BR').slice(0,2);
    const mounth = date.toLocaleDateString('pt-BR').slice(3,5);
    const year = date.toLocaleDateString('pt-BR').slice(6,8);
    const hour = date.toLocaleTimeString('pt-BR');

    return `${mounth}/${day}/${year} às ${hour}`
  }
}