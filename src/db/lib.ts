import { customType } from "drizzle-orm/mysql-core";

export const ubigint = customType<{
  data: number;
  notNull: true;
  default: true;
}>({
  dataType() {
    return "bigint unsigned";
  },
});

export const uint = customType<{
  data: number;
  notNull: true;
  default: true;
}>({
  dataType() {
    return "int unsigned";
  },
});
