'use client';

import { useContext } from 'react';
import { EditorContext } from '@/app/context/EditorContext';

export function Child() {
  const { course } = useContext(EditorContext);

  return <pre>{JSON.stringify(course)}</pre>;
}
