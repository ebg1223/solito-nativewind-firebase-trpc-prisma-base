import { router, publicProcedure, protectedProcedure } from '../server/trpc'

export const appRouter = router({
  hello: publicProcedure.query(({}) => {
    return {
      greeting: 'hello world',
    }
  }),
  protected: protectedProcedure.query(async ({}) => {
    const data = {}
    return {
      data,
    }
  }),
})
// export type definition of API
export type AppRouter = typeof appRouter
