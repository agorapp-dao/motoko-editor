'use client';

import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { EEditorSectionType } from '../constants';
import { IEditorFile } from '../types/IEditorFile';

export type TEditorContext = {
  files: IEditorFile[];
  setFiles: Dispatch<SetStateAction<IEditorFile[]>>;
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
  const [output, setOutput] = useState(initialState.output);
  const [currentSection, setCurrentSection] = useState(initialState.currentSection);
  const [fontSize, setFontSize] = useState(initialState.fontSize);
  const [fullscreen, setFullscreen] = useState(initialState.fullscreen);

  return (
    <EditorContext.Provider
      value={{
        files,
        setFiles,
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
