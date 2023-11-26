import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Game } from "@/types/game.t";
import { genRandonString } from "@/utils/crypto";

export async function GET(request: Request) {
  const gameId = genRandonString(12);

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new Game({ id: gameId })),
      cache: "no-store",
    });
  } catch (error) {
    console.log(error);
  }

  const cookieStore = cookies();
  cookieStore.set("gameId", gameId);
  redirect("/players/" + gameId);
}
