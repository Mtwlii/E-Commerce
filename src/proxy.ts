import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export default async function proxy(req:NextRequest) {

  // useSession => client

  //getToken => proxy , api 
  const jwt= await  getToken({req})


  if(jwt==null){

    return NextResponse.redirect(new URL("/login", req.url))

  }
  return NextResponse.next()
}


export const config={
    matcher :[ "/shop" ,"/cart","/checkout","/allorders","/profile"]
}