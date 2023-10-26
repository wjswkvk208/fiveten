"use server";
import { cookies } from "next/headers";

export async function setCookie() {
  console.log("액션쿠키");
  // cookies().set("foo", "sex");
}

export async function getCookie() {
  console.log("겟쿠키");
  return "123123";
  // cookies().set("foo", "sex");
}
