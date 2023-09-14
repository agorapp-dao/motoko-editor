import { createStore, StoreApi, useStore } from 'zustand';
import { TEditorFile } from '../types/TEditorFile';
import { TEditorTab } from '../types/TEditorTab';
import { EEditorSectionType } from '../constants';
import { createContext, useContext, useEffect, useState } from 'react';
import { TTestResponse } from '../types/TTestResponse';
import { TEditorConfig } from '../types/TEditorConfig';
import { ETopic } from '@agorapp-dao/content-common/src/types/ETopic';
import { EColorMode } from '@agorapp-dao/react-common/src/types/misc';

interface EditorState {
  topic: ETopic;
  courseSlug: string;
  activeLessonSlug: string;
  config: TEditorConfig;
  apiUrl?: string;
  authenticated?: boolean;
  colorMode: EColorMode;

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
    setColorMode: (mode: EColorMode) => void;
  };
}

function createEditorStore(props: EditorStoreProviderProps) {
  return createStore<EditorState>()(set => ({
    topic: props.topic,
    courseSlug: props.courseSlug,
    activeLessonSlug: props.activeLessonSlug,
    apiUrl: props.apiUrl,
    config: props.config,
    authenticated: props.authenticated,
    colorMode: props.colorMode || EColorMode.light,

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
      setColorMode(mode: EColorMode) {
        set({ colorMode: mode });
      },
    },
  }));
}

const EditorStoreContext = createContext<StoreApi<EditorState> | null>(null);

interface EditorStoreProviderProps {
  topic: ETopic;
  courseSlug: string;
  activeLessonSlug: string;
  children: JSX.Element | JSX.Element[];
  config: TEditorConfig;
  apiUrl?: string;
  authenticated?: boolean;
  colorMode?: EColorMode;
}

export function EditorStoreProvider(props: EditorStoreProviderProps) {
  const [store, setStore] = useState(createEditorStore(props));

  useEffect(() => {
    // recreate the store when the lesson changes to start with a fresh state
    setStore(createEditorStore(props));
  }, [props.activeLessonSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  return <EditorStoreContext.Provider value={store}>{props.children}</EditorStoreContext.Provider>;
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
