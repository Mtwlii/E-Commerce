import * as zod from "zod";
import { signupSchema } from './../app/(auth)/signup/signup.schma';
import { loginSchema } from "@/app/(auth)/login/login.schma";




export type signupDataType = zod.infer<typeof signupSchema>;
export type loginDataType = zod.infer<typeof loginSchema>;