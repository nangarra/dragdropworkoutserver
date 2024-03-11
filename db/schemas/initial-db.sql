CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "login_tokens"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "token" TEXT NOT NULL,
  "expiredAt" timestamptz,
  "ip" TEXT,
  "userAgent" jsonb,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "users"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "profilePic" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "salt" TEXT,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz,
  "passwordResetAt" timestamptz
);

CREATE TABLE "super_user"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "workouts"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "thumbnail" TEXT,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz
);

CREATE TABLE "exercises"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkWorkoutId" uuid NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "thumbnail" TEXT,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz
);

CREATE TABLE "selected_exercises"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkExerciseId" uuid NOT NULL,
  "sets" INTEGER,
  "repititions" INTEGER,
  "seconds" INTEGER,
  "minutes" INTEGER,
  "sequence" INTEGER,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz
);

ALTER TABLE "super_user" ADD FOREIGN KEY ("fkUserId") REFERENCES "users" ("id");

ALTER TABLE "exercises" ADD FOREIGN KEY ("fkWorkoutId") REFERENCES "workouts" ("id");

ALTER TABLE "selected_exercises" ADD FOREIGN KEY ("fkExerciseId") REFERENCES "exercises" ("id");

ALTER TABLE "login_tokens" ADD FOREIGN KEY ("fkUserId") REFERENCES "users" ("id");
