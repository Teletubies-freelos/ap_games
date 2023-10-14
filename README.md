# AP_GAMES

If you are planning to develop with all the stack in development mode you should

1. Navigate to migrations
2. Set the proper enviroments into an .env file
3. Navigate to migrations/docker/hasura
4. Set the proper enviroments
5. Run the following

```bash
docker compose up
```

6. In case you need to change configuration, delete with admin privileges the data fodler that is created and
repeat the necessary steps

7. Run the migration files, generally is

```bash
pnpm knex migrate:latest --env=staging
```

8. Seed the database if wanted

```bash
pnpm knex seed:run --env=staging
```
