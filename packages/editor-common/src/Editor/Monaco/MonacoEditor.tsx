import { useContext, useEffect, useRef, useState } from 'react';
import type { editor } from 'monaco-editor';
import * as S from './MonacoEditor.styled';
import { getMonaco } from './Monaco';
import { EditorContext } from '../EditorContext';
import { editorService } from '../editorService';
import { IEditorFile } from '../../types/IEditorFile';

export interface MonacoEditorProps {
  model?: editor.ITextModel;
}

export const MonacoEditor = ({ model }: MonacoEditorProps) => {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | undefined>(undefined);
  const divEl = useRef<HTMLDivElement>(null);
  const { fontSize, files, tabs, activeTab } = useContext(EditorContext);

  useEffect(() => {
    let isMounted = true;
    let editor: editor.IStandaloneCodeEditor;
    let checkTimeout: any;

    getMonaco().then(monaco => {
      if (isMounted && divEl.current) {
        editor = monaco.editor.create(divEl.current, {
          model: null,
          theme: 'editorTheme',
          automaticLayout: true,
          fontSize: fontSize,
          minimap: {
            enabled: false,
          },
          tabSize: 2,
          suggest: {
            // Without this, the first suggestion won't be selected automatically when snippet is active
            // https://github.com/microsoft/vscode/issues/173387
            snippetsPreventQuickSuggestions: false,
          },
        });

        editor.onDidChangeModelContent(() => {
          if (checkTimeout) {
            clearTimeout(checkTimeout);
          }
          checkTimeout = setTimeout(() => {
            const tab = tabs[activeTab];
            const file: IEditorFile = {
              path: tab.path,
              content: tab.model.getValue(),
            };
            editorService.check(file, files);
          }, 300);
        });

        setEditor(editor);
      }
    });

    return () => {
      isMounted = false;
      editor?.dispose();
    };
  }, [divEl, fontSize]);

  useEffect(() => {
    if (!editor || !model) {
      return;
    }
    // TODO: keep view state, see https://github.com/Microsoft/monaco-editor/issues/604#issuecomment-344214706
    editor.setModel(model);
  }, [editor, model]);

  return <S.Code ref={divEl} />;
};
