export interface GetEnvOptions {
  prefix?: string;
  isRequired?: boolean;
}

export class RequiredEnvError extends Error {
  constructor(envName: string) {
    super(`
      Env variable ${envName} is required to start project,
      check your .env file
    `)
  }
}

export class Config {
  constructor(private defaultOptions: GetEnvOptions) { }

  private mergeOptions(options: GetEnvOptions) {
    return {
      ...this.defaultOptions,
      ...options
    }
  }


  getEnv(envName: string, options: GetEnvOptions = {}) {
    const { isRequired, prefix = '' } = this.mergeOptions(options)
    const envCompleteName = `${prefix}${envName}`

    //@ts-expect-error dev just
    const value = import.meta.env[envCompleteName]

    if (isRequired && !value)
      throw new RequiredEnvError(envCompleteName)

    return value
  }
}

