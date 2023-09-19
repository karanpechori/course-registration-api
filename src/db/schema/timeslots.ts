import { date, mysqlTable, time } from "drizzle-orm/mysql-core";
import { ubigint, uint } from "../lib";

export const timeslots = mysqlTable("timeslots", {
  courseId: ubigint("cid").notNull(),
  teacherId: ubigint("tid").notNull(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  durationMinutes: uint("duration-minutes").default(59),
});
