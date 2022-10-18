// utils/trpc.ts
import { createTRPCReact } from '@trpc/react'
import type { AppRouter } from '../routers/_app'

export const trpc = createTRPCReact<AppRouter>()

import React, { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getToken } from '../firebase'
import { TRPCConfigContext } from './configcontext'

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() => trpc.createClient(TRPCConfigContext))
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
