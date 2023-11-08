"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Game } from "@/types/game.t";
import { genRandonString } from "@/utils/crypto";

export async function GET(request: Request) {
  const gameId = genRandonString(12);

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new Game({ id: gameId })),
    cache: "no-store",
  });
  // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(new Player({ obj: { gameId, name: "최사장" } })),
  // });

  // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(new Player({ obj: { gameId, name: "김프로" } })),
  // });
  const cookieStore = cookies();
  cookieStore.set("gameId", gameId);
  redirect("/players/" + gameId);
}
