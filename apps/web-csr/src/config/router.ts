import { config } from "./config";

export const isHashProvider = !!config.getEnv('IS_HASH_PROVIDER')

