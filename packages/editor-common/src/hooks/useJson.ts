import useSWR from 'swr';

const fetcher = async (path: string) => {
  return fetch(path).then(res => res.json());
};

export function useJson<T>(path: string) {
  return useSWR<T>(path, fetcher);
}
