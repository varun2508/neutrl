module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities"
  },
  migrationsRun: false,
  extra: process.env.NODE_ENV === "production" ? { ssl: true, rejectUnauthorized: false } : {} 
}