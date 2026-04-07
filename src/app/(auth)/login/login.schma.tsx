import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.email().nonempty(),
  password: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    )
    .min(6)
    .nonempty(),
});
