import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const students = mysqlTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
});
