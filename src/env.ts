import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().gte(1).lte(65535).default(3000),
  DB_URI: z.string().regex(new RegExp("mysql://.*")),
});

export default envSchema.parse(process.env);
