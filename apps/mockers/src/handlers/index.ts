import {graphql} from 'msw'

export const handlers = [
  graphql.query('GET_PRODUCTS', (_, res, ctx)=>{
    return res(ctx.data({
      Products: [{id: 1, name: 'asddsa'}]
    }))
  })
]
