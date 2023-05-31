import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from 'dotenv'
dotenv.config({path: '.env.local'})
 
const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql);
 

await migrate(db, { migrationsFolder: "drizzle" });

console.log('migrated')

process.exit(0);
