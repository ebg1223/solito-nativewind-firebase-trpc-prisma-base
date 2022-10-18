import { useAtom } from 'jotai'
import { authInitializingAtom, userAtom } from '../../state'
import React from 'react'
import { implementOnAuthStateChanged } from 'api/firebase'

export default function AuthProvider({ children }) {
  const [user, setUser] = useAtom(userAtom)
  const [initializing, setInitializing] = useAtom(authInitializingAtom)

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = implementOnAuthStateChanged(
      (userC) => {
        if (initializing) {
          setInitializing(false)
        }
        if (userC) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(userC)
        } else {
          // User is signed out
          setUser(null)
        }
      }
    )
    return unsubscribeFromAuthStatuChanged
  }, [])
  return <>{children}</>
}
