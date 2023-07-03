'use client';

import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { EEditorSectionType } from '../constants';
import { IEditorTab } from '../types/IEditorTab';
import { IEditorFile } from '../types/IEditorFile';

export type TEditorContext = {
  /**
   * All lesson files.
   */
  files: IEditorFile[];
  setFiles: Dispatch<SetStateAction<IEditorFile[]>>;
  /**
   * Open tabs.
   */
  tabs: IEditorTab[];
  setTabs: Dispatch<SetStateAction<IEditorTab[]>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  output: string;
  setOutput: (text: string) => void;
  currentSection: EEditorSectionType;
  setCurrentSection: (section: EEditorSectionType) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  courseSlug: string | undefined;
  activeLessonSlug: string | undefined;
  setActiveLessonSlug: (slug: string) => void;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
};

const initialState: TEditorContext = {
  files: [],
  setFiles: (files: IEditorFile[] | ((prevState: IEditorFile[]) => IEditorFile[])) => {},
  tabs: [],
  setTabs: (tabs: IEditorTab[] | ((prevState: IEditorTab[]) => IEditorTab[])) => {},
  activeTab: 0,
  setActiveTab: (index: number | ((prevState: number) => number)) => {},
  output: '',
  setOutput: (text: string) => {},
  currentSection: EEditorSectionType.LESSON,
  setCurrentSection: (section: EEditorSectionType) => {},
  fontSize: 14,
  setFontSize: (size: number) => {},
  courseSlug: undefined,
  activeLessonSlug: undefined,
  setActiveLessonSlug: (slug: string) => {},
  fullscreen: false,
  setFullscreen: (fullscreen: boolean) => {},
};

const EditorContext = createContext<TEditorContext>(initialState);

type TProps = {
  courseSlug: string;
  activeLessonSlug: string | undefined;
  setActiveLessonSlug: (slug: string) => void;
  children: JSX.Element | JSX.Element[];
};

const EditorProvider = ({
  courseSlug,
  activeLessonSlug,
  setActiveLessonSlug,
  children,
}: TProps) => {
  const [files, setFiles] = useState(initialState.files);
  const [tabs, setTabs] = useState(initialState.tabs);
  const [activeTab, setActiveTab] = useState(0);
  const [output, setOutput] = useState(initialState.output);
  const [currentSection, setCurrentSection] = useState(initialState.currentSection);
  const [fontSize, setFontSize] = useState(initialState.fontSize);
  const [fullscreen, setFullscreen] = useState(initialState.fullscreen);

  return (
    <EditorContext.Provider
      value={{
        files,
        setFiles,
        tabs,
        setTabs,
        activeTab,
        setActiveTab,
        output,
        setOutput,
        currentSection,
        setCurrentSection,
        fontSize,
        setFontSize,
        courseSlug,
        activeLessonSlug,
        setActiveLessonSlug,
        fullscreen,
        setFullscreen,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorProvider };
