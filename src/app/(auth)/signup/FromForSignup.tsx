"use client";
import React from "react";
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
import { MdPersonAddAlt1 } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import {  signupSchema } from "./signup.schma";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signupDataType } from "@/interfaces/signup.interface";


export default function FromForSignup() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  async function handelSignup(valus : signupDataType) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(valus),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const finalRes = await res.json();
    if (res.ok) {
      toast.success("signup successfully");
      router.push("/login");
    } else {
      toast.error("signup failed");
    }
    return finalRes;
  }

  return (
    <>
      <div>
        <form action="" onSubmit={form.handleSubmit(handelSignup)}>
          {/* ! Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-3">
                <FieldLabel
                  className="text-lg  font-bold "
                  htmlFor={field.name}
                >
                  Name*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ali"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ! Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-3">
                <FieldLabel
                  className="text-lg  font-bold "
                  htmlFor={field.name}
                >
                  Email*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ! password */}

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-3">
                <FieldLabel
                  className="text-lg  font-bold "
                  htmlFor={field.name}
                >
                  Password*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Create a Strong Password"
                  autoComplete="off"
                  type="password"
                />
                <FieldDescription>
                  Must be at least 8 characters with numbers and symbols
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ! rePassword */}

          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-3">
                <FieldLabel
                  className="text-lg  font-bold "
                  htmlFor={field.name}
                >
                  Confirm Password*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your rePassword"
                  autoComplete="off"
                  type="password"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ! phone */}

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-3 mb-5">
                <FieldLabel
                  className="text-lg  font-bold "
                  htmlFor={field.name}
                >
                  Your Phone
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="+1 234 564 8900"
                  autoComplete="off"
                  type="tel"
                />
                {/* <FieldDescription>{fieldState.error?.message}</FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center gap-2">
            <Checkbox />
            <p className="text-lg">
              I agree to the
              <Link className="text-green-500 hover:underline" href="/terms">
                {" "}
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-green-500 hover:underline" href="/privacy">
                {" "}
                Privacy Policy
              </Link>
            </p>
          </div>

          <Button
            type="submit"
            className="w-full py-5 text-lg mt-4 bg-[#16a34a] hover:bg-[#15803d]  mb-5 cursor-pointer"
          >
            {" "}
            <MdPersonAddAlt1 className="" />
            Create My Account
          </Button>
        </form>
      </div>
    </>
  );
}
