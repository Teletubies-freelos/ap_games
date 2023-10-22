class RequiredEnvError extends Error{
  constructor(envName: string){
    super(`
      ${envName} is required, please check your env file
    `)
  }
}

interface GetEnvOptions {
  isRequired?: boolean;
  prefix?: string;
}

export const getEnv = (
  envName: string, 
  {isRequired = true ,prefix = 'VITE_'}: GetEnvOptions = {}
)=>{
  const resolvedName = `${prefix}${envName}`

  const value =  import.meta.env[resolvedName]

  if(isRequired && !value)
    throw new RequiredEnvError(resolvedName)

  return value
}
