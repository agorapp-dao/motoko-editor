import { useContext, useEffect, useRef, useState } from 'react';
import type { editor } from 'monaco-editor';
import * as S from './MonacoEditor.styled';
import { useMonaco } from './Monaco';
import { EditorContext } from '../EditorContext';
import { editorService } from '../editorService';
import { IEditorFile } from '../../types/IEditorFile';

export interface MonacoEditorProps {
  model?: editor.ITextModel;
}

export const MonacoEditor = ({ model }: MonacoEditorProps) => {
  const monaco = useMonaco();
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | undefined>(undefined);
  const divEl = useRef<HTMLDivElement>(null);
  const { fontSize, files, tabs, activeTab } = useContext(EditorContext);

  useEffect(() => {
    let editor: editor.IStandaloneCodeEditor;
    let isMounted = true;

    if (monaco && divEl.current) {
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

      setEditor(editor);
    }

    return () => {
      isMounted = false;
      editor?.dispose();
    };
  }, [monaco, divEl, fontSize]);

  useEffect(() => {
    if (!editor || !model) {
      return;
    }
    // TODO: keep view state, see https://github.com/Microsoft/monaco-editor/issues/604#issuecomment-344214706
    editor.setModel(model);
  }, [editor, model]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    let isMounted = true;

    let checkTimeout: any;

    const checkModelDebounced = () => {
      if (checkTimeout) {
        clearTimeout(checkTimeout);
      }
      checkTimeout = setTimeout(() => {
        if (!isMounted) {
          return;
        }

        // sync opened tab content with files in memory
        for (const tab of tabs) {
          const file = files.find(file => file.path === tab.path);
          if (!file) {
            throw new Error(`File for tab not found: ${tab.path}`);
          }
          if (!tab.model.isDisposed()) {
            file.content = tab.model.getValue();
          }
        }

        const tab = tabs[activeTab];

        editorService.check(tab.path, files);
      }, 300);

      return () => {
        isMounted = false;
        clearTimeout(checkTimeout);
      };
    };

    editor.onDidChangeModel(checkModelDebounced);
    editor.onDidChangeModelContent(checkModelDebounced);
  }, [activeTab, editor, files, tabs]);

  return <S.Code ref={divEl} />;
};
