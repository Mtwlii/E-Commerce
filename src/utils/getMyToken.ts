import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const myCookies = await cookies();

  const tokenFromCookies = myCookies.get("next-auth.session-token")?.value;

  if (tokenFromCookies == null) {
    return undefined;
  }
  //   console.log("tokenFromCookies", tokenFromCookies);

  const myTokenAfterDecode = await decode({
    token: tokenFromCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  //   console.log("myTokenAfterDecode", myTokenAfterDecode);
  //   console.log(
  //     "myTokenAfterDecodeFromJWT ==>",
  //     myTokenAfterDecode.realTokenFromJWT,
  //   );

  if (!myTokenAfterDecode) {
    return undefined;
  }

  return myTokenAfterDecode.realTokenFromJWT;
}