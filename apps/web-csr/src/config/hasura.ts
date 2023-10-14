import { config } from "./config";

export const graphqlURL = config.getEnv('GRAPHQL_URL', {
  isRequired: true
})

export const masterToken = config.getEnv('MASTER_TOKEN') ?? localStorage.getItem('API_TOKEN')
