import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'
import { TRPCProvider } from './trpc-provider'
import AuthProvider from './auth'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <NavigationProvider>
        <AuthProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </AuthProvider>
      </NavigationProvider>
    </SafeArea>
  )
}
