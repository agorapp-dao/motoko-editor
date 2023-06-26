export * from './services/courseService';
export * from './hooks/useJson';
export * from './hooks/useText';
export * from './Editor/Editor';
export * from './Editor/editorService';
export * from './Editor/Monaco/Monaco';
export * from './types/IEditorLanguagePlugin';
export * from './types/IEditorFile';

// rexexport Monaco type
import type TMonaco from 'monaco-editor';
export type Monaco = typeof TMonaco;
