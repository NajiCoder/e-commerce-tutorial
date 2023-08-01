import zod from "zod";

export const envSchema = zod.object({
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTH_SECRET: zod.string().nonempty(),
  DATABASE_URL: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
