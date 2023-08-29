import loader, { Monaco } from '@monaco-editor/loader';
export type { Monaco } from '@monaco-editor/loader';
import type { editor } from 'monaco-editor';
import { useEffect, useState } from 'react';

let monaco: Promise<Monaco>;

export async function getMonaco() {
  if (!monaco) {
    loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs' } });
    // loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs' } });
    monaco = loader.init();
  }

  return monaco;
}

export function useMonaco(): Monaco | null {
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    getMonaco().then(monaco => setMonaco(monaco));
  }, []);

  return monaco;
}

export async function monacoDefineTheme(themeData: editor.IStandaloneThemeData) {
  if (typeof window === 'undefined') {
    // do nothing on server-side
    return;
  }

  const monaco = await getMonaco();
  monaco.editor.defineTheme('editorTheme', themeData);
}
