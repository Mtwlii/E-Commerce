"use server";
import { loginDataType } from "@/interfaces/signup.interface";
// import { cookies } from "next/headers";
// import { toast } from "sonner";

export async function loginAction(values: loginDataType) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const finalRes = await res.json();
  // const myCookies = await cookies();
  // myCookies.set("token",finalRes.token,{
  //   expires: new Date(Date.now() + 60 * 60 * 1000 ),
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  // })
  console.log("finalRes", finalRes);
  return finalRes.ok;
}
