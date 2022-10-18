import * as Firebase from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'KEY',
  authDomain: 'AUTHDOMAIN',
  projectId: 'PROJECT ID',
  storageBucket: 'STORAGEBUCKET',
  messagingSenderId: 'MESSAGINGSENDERID',
  appId: 'APPID',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

export function getAuth() {
  return Firebase.getAuth(app)
}

export function getUser() {
  return getAuth().currentUser
}

export function loginWithEmailPassword(email: string, password: string) {
  return Firebase.signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // ...
      console.log('User account signed in!')
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
      console.log(error)
    })
}

export function logout() {
  return Firebase.signOut(getAuth())
    .then(() => {
      // Sign-out successful.
      console.log('User account signed out!')
    })
    .catch((error) => {
      console.log(error)
    })
}

export function getToken() {
  const user = getUser()
  if (user == null) {
    return null
  }
  return Firebase.getIdToken(user).catch((error) => {
    console.log(error)
  })
}

export const implementOnAuthStateChanged = (callback: (user) => void) =>
  onAuthStateChanged(getAuth(), callback)
