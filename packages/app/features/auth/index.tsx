import { authInitializingAtom, userAtom } from '../../state'
import { useAtom } from 'jotai'
import { getAuth, loginWithEmailPassword } from 'api/firebase'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Button } from 'react-native'


export default function Auth() {
  const [authInitializing] = useAtom(authInitializingAtom)
  const [user, setUser] = useAtom(userAtom)
  if (authInitializing) return null

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Login</Text>
        <Button
          title={'Login'}
          onPress={() =>
            loginWithEmailPassword('TESTEMAIL@TESTING.COM', 'PASSWORD')
          }
        />
      </View>
    )
  }

  return (
    <View className=" flex-1 items-center justify-center bg-pink-400">
      <Text className={'text-2xl'}>
        Open up App.tfads st to start working o adsf sn y asdf our app!!
      </Text>
      <Button title={'Logout'} onPress={() => getAuth().signOut()} />
    </View>
  )
}
