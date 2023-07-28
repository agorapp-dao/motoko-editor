import { createStore, StoreApi, useStore } from 'zustand';
import { IEditorFile } from '../types/IEditorFile';
import { IEditorTab } from '../types/IEditorTab';
import { EEditorSectionType } from '../constants';
import { createContext, useContext } from 'react';

interface EditorState {
  courseSlug: string | undefined;
  activeLessonSlug: string | undefined;

  /**
   * All lesson files.
   */
  files: IEditorFile[];

  /**
   * Files opened in tabs.
   */
  tabs: IEditorTab[];

  activeTab: number;

  currentSection: EEditorSectionType;

  output: string;

  fontSize: number;

  actions: {
    setActiveLessonSlug: (slug: string) => void;
    setOutput: (value: string) => void;
    setFiles: (files: IEditorFile[]) => void;
    setTabs: (tabs: IEditorTab[]) => void;
    setActiveTab: (index: number) => void;
    setCurrentSection: (section: EEditorSectionType) => void;
    setFontSize: (size: number) => void;
  };
}

function createEditorStore(props: EditorStoreProviderProps) {
  return createStore<EditorState>()(set => ({
    courseSlug: props.courseSlug,
    activeLessonSlug: props.activeLessonSlug,

    files: [],
    tabs: [],
    activeTab: 0,
    currentSection: EEditorSectionType.LESSON,

    output: '',

    fontSize: 14,
    fullscreen: false,

    actions: {
      setOutput(value: string) {
        set({ output: value });
      },
      setFiles(files: IEditorFile[]) {
        set({ files });
      },
      setTabs(tabs: IEditorTab[]) {
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
  activeLessonSlug: string | undefined;
  children: JSX.Element | JSX.Element[];
}

export function EditorStoreProvider(props: EditorStoreProviderProps) {
  return (
    <EditorStoreContext.Provider value={createEditorStore(props)}>
      {props.children}
    </EditorStoreContext.Provider>
  );
}

export function useEditorStore<T>(selector: (state: EditorState) => T) {
  const store = useContext(EditorStoreContext);
  if (!store) {
    throw new Error('useEditorStore must be used within EditorStoreProvider.');
  }
  return useStore(store, selector);
}

export const useEditorCourseSlug = () => useEditorStore(state => state.courseSlug);
export const useEditorActiveLessonSlug = () => useEditorStore(state => state.activeLessonSlug);
export const useEditorFiles = () => useEditorStore(state => state.files);
export const useEditorTabs = () => useEditorStore(state => state.tabs);
export const useEditorActiveTab = () => useEditorStore(state => state.activeTab);
export const useEditorActions = () => useEditorStore(state => state.actions);
export const useEditorOutput = () => useEditorStore(state => state.output);
export const useEditorCurrentSection = () => useEditorStore(state => state.currentSection);
export const useEditorFontSize = () => useEditorStore(state => state.fontSize);
