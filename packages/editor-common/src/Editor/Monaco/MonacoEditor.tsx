import { useContext, useEffect, useRef } from 'react';
import type { editor } from 'monaco-editor';
import * as S from './MonacoEditor.styled';
import { getMonaco } from './Monaco';
import { EditorContext } from '../EditorContext';

export interface MonacoEditorProps {
  value?: string;
  language?: string;
}

export const MonacoEditor = ({ value, language }: MonacoEditorProps) => {
  const divEl = useRef<HTMLDivElement>(null);
  const { fontSize, setInstance } = useContext(EditorContext);

  useEffect(() => {
    let isMounted = true;
    let editor: editor.IStandaloneCodeEditor;

    getMonaco().then(monaco => {
      if (isMounted && divEl.current) {
        editor = monaco.editor.create(divEl.current, {
          value,
          language,
          theme: 'editorTheme',
          automaticLayout: true,
          fontSize: fontSize,
          minimap: {
            enabled: false,
          },
        });
        setInstance(editor);
      }
    });

    return () => {
      isMounted = false;
      editor?.dispose();
    };
    // TODO: chci mit v deps fontSize, value a language?
  }, [divEl, language, value, fontSize]);

  return <S.Code ref={divEl} />;
};
