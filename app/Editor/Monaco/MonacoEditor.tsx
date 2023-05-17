import { useContext, useEffect, useRef, useState } from 'react';
import { getMonaco } from '@/app/Editor/Monaco/Monaco';
import { EditorSettingsContext } from '@/app/context/EditorSettingsContext';
import type { editor } from 'monaco-editor';
import { EditorInstanceContext } from '@/app/context/EditorInstanceContext';
import * as S from './MonacoEditor.styled';

export interface MonacoEditorProps {
  value?: string;
  language?: string;
}

export const MonacoEditor = ({ value, language }: MonacoEditorProps) => {
  const divEl = useRef<HTMLDivElement>(null);
  const { fontSize } = useContext(EditorSettingsContext);
  const { instance, setInstance } = useContext(EditorInstanceContext);

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
