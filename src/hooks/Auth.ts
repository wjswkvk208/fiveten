import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const fetcherCheck = (url: string) => fetch(url).then(r => r.json());

export function useCheck() {
  const { data, trigger, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, fetcherCheck);
  return { data, trigger, error };
}

export function useRegister() {
  const fetcherRegister = (url: string, { arg }: { arg: any }) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...arg }),
      // caches: "no-store",
    }).then(res => {
      if (res.status === 409) {
        const error = new Error("이미 존재하는 이메일입니다.");
        // 에러 객체에 부가 정보를 추가합니다.
        // error.info = res.json();
        // error.status = res.status;
        throw error;
      }

      return res.json();
    });
  };

  const { data, trigger, error, reset } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, fetcherRegister);
  return { data, trigger, error, reset };
}

export function useLogin() {
  const fetcherLogin = (url: string, { arg }: { arg: any }) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...arg }),
      // caches: "no-store",
    }).then(res => {
      if (res.status === 401) {
        const error = new Error("일치하는 계정 정보가 없습니다.");
        throw error;
      }

      return res.json();
    });
  };

  const { data, trigger, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, fetcherLogin);
  return { data, trigger, error };
}
