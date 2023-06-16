import useSWR from 'swr';
import { MOTOKO_TUTORIAL_COURSE } from '@/src/features/editor/constants/motokoTutorial';

const fetcher = async (path: string) => {
  if (path === '/api/course/motoko-tutorial') {
    return MOTOKO_TUTORIAL_COURSE;
  }
  return fetch(path).then(res => res.json());
};

export function useJson<T>(path: string) {
  return useSWR<T>(path, fetcher);
}
