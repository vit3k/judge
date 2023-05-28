import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
//import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:adminadmin@0.0.0.0:5432/db");
const db: PostgresJsDatabase = drizzle(queryClient);

export default db;