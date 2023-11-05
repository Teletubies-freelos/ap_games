import { getEnv } from "../tools/env";


const notRequired  =  {
  isRequired: false
}

export const env = {
  IS_AUTH_DISABLED: getEnv('IS_AUTH_DISABLED', notRequired),
  IS_MSW_ON: getEnv('IS_MSW_ON', notRequired),
  AUTH0_DOMAIN: getEnv('AUTH0_DOMAIN'),
  AUTH0_ID: getEnv('AUTH0_ID'),
  HASURA_GRAPHQL_URL: getEnv('HASURA_GRAPHQL_URL'),
  HASURA_GRAPHQL_MASTER_TOKEN: getEnv('HASURA_GRAPHQL_MASTER_TOKEN', notRequired),
  PHOTO_UPLOAD_URL: getEnv('PHOTO_UPLOAD_URL'),
  ABLY_SUBSCRIBER_TOKEN: getEnv('ABLY_SUBSCRIBER'),
}
