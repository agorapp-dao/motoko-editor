import useSWR from 'swr';
import motokoTutorial from '@agorapp/content-motoko-tutorial';

const fetcher = async (path: string) => {
  if (path === '/api/course/motoko-tutorial') {
    return motokoTutorial;
  }
  return fetch(path).then(res => res.json());
};

export function useJson<T>(path: string) {
  return useSWR<T>(path, fetcher);
}
