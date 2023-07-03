import type { editor } from 'monaco-editor';

export interface IEditorTab {
  path: string;
  model: editor.ITextModel;
}
