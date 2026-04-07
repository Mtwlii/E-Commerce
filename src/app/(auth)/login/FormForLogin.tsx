"use client";
import React, { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdEmail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login.schma";
import { loginDataType } from "@/interfaces/signup.interface";
import { IoLockClosed } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginAction } from "./login.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function FromForLogin() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handelLogin(values: loginDataType) {


    const result = await signIn("credentials", {
      // email: values.email,
      // password: values.password,
      ...values,
      redirect: false,
    }, { callbackUrl: "/" });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("login successfully");
      router.push("/");
    }
  }

  return (
    <>
      <div>
        <form action="" onSubmit={form.handleSubmit(handelLogin)}>
          {/* ! Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-5">
                <FieldLabel className="text-lg " htmlFor={field.name}>
                  Email Address
                </FieldLabel>
                <div className="relative flex items-center">
                  <MdEmail
                    className="absolute left-3 text-gray-500"
                    size={20}
                  />
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email address"
                    autoComplete="off"
                    className="pl-10"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-5">
                <FieldLabel
                  className=" flext justify-between"
                  htmlFor={field.name}
                >
                  <div>Password</div>
                  <Link href="" className="text-green-600 hover:text-green-800">
                    Forgot Password ?
                  </Link>
                </FieldLabel>
                <div className="relative flex items-center">
                  <IoLockClosed
                    className="absolute left-3 text-gray-500 "
                    size={20}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3"
                  >
                    {showPassword ? (
                      <FaEyeSlash className=" text-gray-500" size={20} />
                    ) : (
                      <FaEye className=" text-gray-500" size={20} />
                    )}
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    className="pl-10"
                  />
                </div>
                <FieldDescription>
                  Must be at least 8 characters with numbers and symbols
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center gap-4 items-center mt-5">
            <Checkbox />
            <p>Keep me login </p>
          </div>

          <Button
            type="submit"
            className="w-full py-5 text-lg mt-4 bg-[#16a34a] hover:bg-[#15803d]  mb-5 cursor-pointer"
          >
            {" "}
            Login
          </Button>
          <div className="text-center  h-px bg-gray-200"></div>
          <div className="mt-5 flex items-center justify-center gap-2">
            {" "}
            <div>New to FreshCart?</div>
            <div>
              <Link href="/signup" className="text-[#16a34a]">
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
