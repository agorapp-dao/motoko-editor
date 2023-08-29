import { createStore, StoreApi, useStore } from 'zustand';
import { TEditorFile } from '../types/TEditorFile';
import { TEditorTab } from '../types/TEditorTab';
import { EEditorSectionType } from '../constants';
import { createContext, useContext } from 'react';
import { TTestResponse } from '../types/TTestResponse';
import { TEditorConfig } from '../types/TEditorConfig';

interface EditorState {
  courseSlug: string;
  activeLessonSlug: string;
  config: TEditorConfig;
  apiUrl?: string;
  authenticated?: boolean;

  /**
   * All lesson files.
   */
  files: TEditorFile[];

  /**
   * Files opened in tabs.
   */
  tabs: TEditorTab[];

  activeTab: number;

  currentSection: EEditorSectionType;

  output: string;
  testResults: TTestResponse | undefined;

  fontSize: number;

  actions: {
    setAuthenticated: (authenticated: boolean) => void;
    setEnableLessonsWithProgress: (state: boolean) => void;
    setActiveLessonSlug: (slug: string) => void;
    setOutput: (value: string) => void;
    setTestResults: (value: TTestResponse) => void;
    setFiles: (files: TEditorFile[]) => void;
    setTabs: (tabs: TEditorTab[]) => void;
    setActiveTab: (index: number) => void;
    setCurrentSection: (section: EEditorSectionType) => void;
    setFontSize: (size: number) => void;
  };
}

function createEditorStore(props: EditorStoreProviderProps) {
  return createStore<EditorState>()(set => ({
    courseSlug: props.courseSlug,
    activeLessonSlug: props.activeLessonSlug,
    apiUrl: props.apiUrl,
    config: props.config,
    authenticated: props.authenticated,

    files: [],
    tabs: [],
    activeTab: 0,
    currentSection: EEditorSectionType.LESSON,

    output: '',
    testResults: undefined,

    fontSize: 14,
    fullscreen: false,

    actions: {
      setAuthenticated(authenticated: boolean) {
        set({ authenticated });
      },
      setEnableLessonsWithProgress(state: boolean) {
        set({ config: { ...props.config, enableLessonsWithProgress: state } });
      },
      setOutput(value: string) {
        set({ output: value });
      },
      setTestResults(value: TTestResponse) {
        set({ testResults: value });
      },
      setFiles(files: TEditorFile[]) {
        set({ files });
      },
      setTabs(tabs: TEditorTab[]) {
        set({ tabs });
      },
      setActiveTab(index: number) {
        set({ activeTab: index });
      },
      setCurrentSection(section: EEditorSectionType) {
        set({ currentSection: section });
      },
      setFontSize(size: number) {
        set({ fontSize: size });
      },
      setActiveLessonSlug(slug: string) {
        set({ activeLessonSlug: slug });
      },
    },
  }));
}

const EditorStoreContext = createContext<StoreApi<EditorState> | null>(null);

interface EditorStoreProviderProps {
  courseSlug: string;
  activeLessonSlug: string;
  children: JSX.Element | JSX.Element[];
  config: TEditorConfig;
  apiUrl?: string;
  authenticated?: boolean;
}

export function EditorStoreProvider(props: EditorStoreProviderProps) {
  return (
    <EditorStoreContext.Provider value={createEditorStore(props)}>
      {props.children}
    </EditorStoreContext.Provider>
  );
}

export function useEditorStore() {
  const store = useContext(EditorStoreContext);
  if (!store) {
    throw new Error('useEditorStore must be used within EditorStoreProvider.');
  }
  return useStore(store);
}

export function useEditorStoreWithSelector<U>(
  selector: (state: EditorState) => U,
  equalityFn?: (a: U, b: U) => boolean,
) {
  const store = useContext(EditorStoreContext);
  if (!store) {
    throw new Error('useEditorStore must be used within EditorStoreProvider.');
  }
  return useStore(store, selector, equalityFn);
}

export const useEditorActions = () => useEditorStoreWithSelector(state => state.actions);
