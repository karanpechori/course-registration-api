import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { ubigint, uint } from "../lib";

export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  maxCapacity: uint("max-capacity").default(30),
});

export const courseRequirements = mysqlTable("course-requirements", {
  courseId: ubigint("cid").notNull(),
  requiredCourseId: ubigint("rcid").notNull(),
});
