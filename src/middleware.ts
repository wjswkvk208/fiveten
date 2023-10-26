import { NextRequest, NextResponse } from "next/server";
// import { setCookie } from "./app/actions";
import { genRandonString } from "./utils/crypto";
import { CreateGame } from "./hooks/Game";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  // const code = genRandonString(6);
  if (!req.cookies.has("gameId")) {
    const data = await CreateGame();
    response.cookies.set("gameId", data.id);
  }

  return response;
}
