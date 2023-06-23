import useSWR from 'swr';

const fetcher = (path: string) => fetch(path).then(res => res.text());

export function useText(path: string | undefined) {
  return useSWR(path, fetcher);
}
