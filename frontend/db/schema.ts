import { InferModel } from 'drizzle-orm';
import { pgEnum, pgTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
//import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    name: varchar('name').notNull(),
  });

export type User = InferModel<typeof users>; // return type when queried
export type NewUser = InferModel<typeof users, 'insert'>; // insert type

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:adminadmin@0.0.0.0:5432/db");
export const db: PostgresJsDatabase = drizzle(queryClient);

//migrate(db, { migrationsFolder: "drizzle" });

