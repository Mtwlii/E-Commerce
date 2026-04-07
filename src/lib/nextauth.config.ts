import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    realTokenFromBackend?: string;
  }
}

export const nextAuthConfig: NextAuthOptions = {

  providers: [
    Credentials({
      name: "fresh cart",
      credentials: {
        email: {},
        password: { }
      },

      //  authorize function to check the credentials and return the user if the credentials are correct
      authorize: async (credentials, req) => {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const finalRes = await res.json();

        if (finalRes.message === "success") {
          return {
            id: finalRes.user.id ?? finalRes.user._id ?? finalRes.user.email,
            name: finalRes.user.name, // this name will be used to display the user in the protected routes
            email: finalRes.user.email,
            realTokenFromBackend: finalRes.token, // ! this token will be used to authenticate the user in the protected routes
          };
        } else {
          return null;
        }
      },
    })
  ],


  pages: {
    signIn: "/login",
    newUser: "/signup",
  },


  callbacks: {
    // afer login (authorize) , refresh , navigation
    // jwt(params){

    //   params.token.realTokenFromBackend= params.user.realTokenFromBackend
    //   console.log("paramsFromJWT",params)
    //   return params.token

    jwt({ token, user }) {
      if (user?.realTokenFromBackend) {
        token.realTokenFromJWT = user.realTokenFromBackend;
      }
      return token;

    },

    // api/auth/session   , useSession , getServerSession

    session(params) {
      // console.log("Params from session", params);

      return params.session

    },
  },


  session: {
    maxAge: 60 * 60 * 24 * 7

  }
  // secret : process.env.BETTER_AUTH_SECRET  --- لو ما عملتهوش في ال Env بالطريقه التقليديه اللي هي NEXTAUTH_SECRET هعوز في الحاله دي اضيف السطر ده
};
