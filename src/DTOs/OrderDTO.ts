import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export type OrderDTO = {
  patrimony: string,
  description: string,
  status: 'open' | 'closed',
  created_at: FirebaseFirestoreTypes.Timestamp,
  solution?: string,
  closed_at?: FirebaseFirestoreTypes.Timestamp,
}