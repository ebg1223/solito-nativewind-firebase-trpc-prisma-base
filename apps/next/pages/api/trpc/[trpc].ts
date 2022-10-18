import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from 'api/routers/_app'
import { createContext } from 'api/server/context'
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: (props) => createContext(props),
})
