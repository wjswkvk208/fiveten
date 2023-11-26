import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getSession } from "next-auth/react";

import qs from "qs";

export function useList(arg: any) {
  const query = qs.stringify(arg);
  // console.log(arg, query);
  const fetcher = (url: string) =>
    fetch(url)
      //.then(res => res.headers.get("Last-page"))
      .then(res => res.json());

  const { data, mutate, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/board?${query}`, fetcher);
  return { data, mutate, error, isLoading };
}

export function useWrite() {
  const { data, trigger, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/board`, fetcherPOST);
  return { data, trigger, error };
}

export function useEdit(id: string) {
  const { data, trigger, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, fetcherPATCH);
  return { data, trigger, error };
}

export function useView(arg: any) {
  // const query = qs.stringify(arg);
  // // console.log(arg, query);
  const fetcher = (url: string) =>
    fetch(url)
      //.then(res => res.headers.get("Last-page"))
      .then(res => res.json());
  const { id, username } = arg;
  const { data, mutate, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, fetcher);
  return { data, mutate, error, isLoading };
}

export function useRemove(id: string) {
  const { trigger, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, fetcherDELETE);
  return { trigger, error };
}
const fetcherPOST = async (url: string, { arg }: { arg: any }) => {
  //const session = Session

  const session = await getSession();
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: session?.user.accessToken ?? "",
    },
    body: JSON.stringify({ ...arg }),
    // caches: "no-store",
  }).then(res => {
    if (res.status === 401) {
      const error = new Error("로그인을 해주세요.");
      throw error;
    }

    return res.json();
  });
};

const fetcherPATCH = async (url: string, { arg }: { arg: any }) => {
  //const session = Session

  const session = await getSession();
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: session?.user.accessToken ?? "",
    },
    body: JSON.stringify({ ...arg }),
    // caches: "no-store",
  }).then(res => {
    if (res.status === 401) {
      const error = new Error("로그인을 해주세요.");
      throw error;
    }

    return res.json();
  });
};

const fetcherDELETE = async (url: string, { arg }: { arg: any }) => {
  //const session = Session

  const session = await getSession();
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: session?.user.accessToken ?? "",
    },
    body: JSON.stringify({ ...arg }),
    // caches: "no-store",
  }).then(res => {
    if (res.status === 401) {
      const error = new Error("로그인을 해주세요.");
      throw error;
    }

    return res.text();
  });
};
