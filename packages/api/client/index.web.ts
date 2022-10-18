import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '../routers/_app'
import { getToken } from '../firebase/index.web'
import { TRPCConfigContext } from './configcontext'

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return TRPCConfigContext
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})
// => { useQuery: ..., useMutation: ...}
