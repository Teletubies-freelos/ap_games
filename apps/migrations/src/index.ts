import 'dotenv/config'
import Koa from 'koa'
import { host, port } from './config/server';
import { router } from './server/routes';


const app = new Koa()

app
  .use(router.routes())
  .listen({
    host,
    port
  })
