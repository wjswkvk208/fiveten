import useSWRMutation from "swr/mutation";

export const InputScore = (id: string) => {
  const fetcher = (url: string, { arg }: { arg: { score: object } }) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...arg }),
    }).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/score/${id}`, fetcher);
  return { data, trigger, isMutating };
};
