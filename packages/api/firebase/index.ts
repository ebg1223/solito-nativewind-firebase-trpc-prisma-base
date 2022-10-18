import auth from '@react-native-firebase/auth'

export function getAuth() {
  return auth()
}

export function getUser() {
  return getAuth().currentUser
}

export function loginWithEmailPassword(email: string, password: string) {
  return getAuth()
    .signInWithEmailAndPassword(email, password)
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
  return getAuth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('User account signed out!')
    })
    .catch((error) => {
      console.log(error)
    })
}

export function getToken() {
  const user = getAuth().currentUser
  return user?.getIdToken().catch((error) => {
    console.log(error)
  })
}

export const implementOnAuthStateChanged = (callback: (user) => void) =>
  getAuth().onAuthStateChanged(callback)
