import { atom, PrimitiveAtom } from 'jotai'
//import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from 'firebase/auth'

export const authInitializingAtom = atom(true)

export const userAtom = atom</*FirebaseAuthTypes.User |*/ User | null>(
  null
) as PrimitiveAtom</*FirebaseAuthTypes.User |*/ User | null>
