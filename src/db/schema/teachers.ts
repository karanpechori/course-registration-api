import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const teachers = mysqlTable("teachers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
});
