import { httpBatchLink } from '@trpc/client'
import { getToken } from '../firebase'

export const TRPCConfigContext = {
  links: [
    httpBatchLink({
      /**
       * If you want to use SSR, you need to use the server's full URL
       * @link https://trpc.io/docs/ssr
       **/
      url: `http://localhost:3000/api/trpc`,
      async headers() {
        const token = await getToken()
        return token
          ? {
              Authorization: token,
            }
          : {}
      },
    }),
  ],
  /**
   * @link https://react-query-v3.tanstack.com/reference/QueryClient
   **/
  // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
}
