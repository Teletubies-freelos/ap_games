import Router from '@koa/router'
import 'dotenv/config'
import { knex } from "knex";
import { config } from "../../config";


const env = process.env.NODE_ENV ?? 'development'

export const router = new Router();

router.get('/migrate', async (ctx)=>{
  await knex(config[env]).migrate.latest()

  ctx.body = {
    status: 'ok'
  }
})
