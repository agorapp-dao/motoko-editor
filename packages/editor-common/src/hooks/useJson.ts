import useSWR from 'swr';

const fetcher = async <T>(path: string, transformer?: (data: any) => T) => {
  return fetch(path)
    .then(res => res.json())
    .then(data => {
      if (transformer) {
        return transformer(data);
      }
      return data;
    });
};

export function useJson<T>(path: string, transformer?: (data: any) => T) {
  return useSWR<T>(path, path => fetcher(path, transformer));
}
