import 'dotenv/config'
import type { Knex } from "knex";

// Update with your config settings.

 const defaultOptions = {
  migrations: {
    directory: "./src/migrations"
  },
  seeds:{
    directory: "./src/seeds"
  },
}

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    ...defaultOptions,
    connection: {
      filename: "./dev.sqlite3"
    }
  },

  staging: {
    ...defaultOptions,
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB ?? 'postgres',
      user: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
