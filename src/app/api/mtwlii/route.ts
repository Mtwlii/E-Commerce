import { NextRequest, NextResponse } from "next/server";

export function GET(req : NextRequest) {

    
    const users = [
      {
        name: "ali",
        age: 20,
      },
      {
        name: "ahmed",
        age: 25,
      },
      {
        name: "mohamed",
        age: 33,
      },
      {
        name: "ebrahim",
        age: 30,
      },
    ];
  return NextResponse.json(users);
}
