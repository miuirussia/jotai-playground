import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";

export const bigAtom = atom(async (_, { signal }) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1?_delay=2000",
    { signal }
  );

  return response.json() as Promise<{
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    website: string;
  }>;
});

export const smallAtom = atom(async (get) => {
  const result = get(bigAtom);

  return (await result).username;
});

export const suspenseAtom = atomWithSuspenseQuery(() => ({
  queryKey: ["suspense", { ponos: true }],
  queryFn: async ({ queryKey: [, query], signal }) => {
    console.log(query);

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1?_delay=2000",
      { signal }
    );

    return response.json() as Promise<{
      id: number;
      name: string;
      email: string;
      phone: string;
      username: string;
      website: string;
    }>;
  },
}));
