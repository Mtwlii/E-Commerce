import * as zod from "zod";

export const signupSchema = zod.object({
  name: zod.string().min(3).nonempty(),
  email: zod.email().nonempty(),
  password: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    )
    .min(6)
    .nonempty(),
  rePassword: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    )
    .min(6)
    .nonempty(),
  phone: zod.string("enter your egyptian phone").min(9).regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/),
}).refine(function(params){
 return params.password === params.rePassword 

},{
  message:"password not match",
  path:["rePassword"]
})
