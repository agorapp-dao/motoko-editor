import { useContext, useEffect, useRef, useState } from 'react';
import type { editor } from 'monaco-editor';
import * as S from './MonacoEditor.styled';
import { getMonaco } from './Monaco';
import { EditorContext } from '../EditorContext';

export interface MonacoEditorProps {
  language?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const MonacoEditor = ({ language, value, onValueChange }: MonacoEditorProps) => {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | undefined>(undefined);
  const divEl = useRef<HTMLDivElement>(null);
  const { fontSize } = useContext(EditorContext);

  useEffect(() => {
    let isMounted = true;
    let editor: editor.IStandaloneCodeEditor;

    getMonaco().then(monaco => {
      if (isMounted && divEl.current) {
        editor = monaco.editor.create(divEl.current, {
          value: '',
          language,
          theme: 'editorTheme',
          automaticLayout: true,
          fontSize: fontSize,
          minimap: {
            enabled: false,
          },
        });

        editor.onDidBlurEditorText(() => {
          onValueChange && onValueChange(editor.getValue());
        });

        setEditor(editor);
      }
    });

    return () => {
      isMounted = false;
      editor?.dispose();
    };
  }, [divEl, language, fontSize]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (editor.getValue() !== value) {
      // setValue will clear undo stack, so be careful when you're doing this
      editor.setValue(value || '');
    }
  }, [editor, value]);

  return <S.Code ref={divEl} />;
};
