import { InferModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    name: varchar('name').notNull(),
  });

export type User = InferModel<typeof users>; // return type when queried
export type NewUser = InferModel<typeof users, 'insert'>; // insert type

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: text('description')
});

export const tasksRelations = relations(tasks, ({ many }) => ({
	testcases: many(testcases),
}));

export type Task = InferModel<typeof tasks>;

export const testcases = pgTable('testcase', {
  id: serial('id').primaryKey(),
  taskId: integer('taskId').references(() => tasks.id),
  input: varchar('input'),
  expected: varchar('expected')
});

export const testcasesRelations = relations(testcases, ({ one }) => ({
	task: one(tasks, {
		fields: [testcases.taskId],
		references: [tasks.id],
	}),
}));

export type Testcase = InferModel<typeof testcases>;



