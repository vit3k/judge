CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"input" varchar NOT NULL,
	"expectedOutput" varchar NOT NULL
);
