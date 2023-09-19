import { boolean, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { ubigint } from "../lib";

export const register = mysqlTable("register", {
  id: serial("id").primaryKey(),
  studentId: ubigint("sid").notNull(),
  courseId: ubigint("cid").notNull(),
  isCompleted: boolean("is-completed").default(false),
});
