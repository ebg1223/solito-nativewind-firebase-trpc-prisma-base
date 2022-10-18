import * as trpc from '@trpc/server'
import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { checkToken } from 'next-app/firebase'

//used on server to process incoming requests and attach a context.

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      console.log(req.headers.authorization)
      console.log(await checkToken(req.headers.authorization))
      //TOKEN LOGIC HERE!!!!
      return { email: 'dummy@email.com' }
      //const user = await (
      //  req.headers.authorization.split(' ')[1],
      //);
      //return user;
    }

    return null
  }

  const user = await getUserFromHeader()
  return {
    user,
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
