'use client';

import {useState, createContext} from 'react';
import type {editor as TMonacoEditor} from 'monaco-editor';
import {EEditorSectionType} from "@/app/constants/editor";
import {TLesson} from "@/app/types/education";

export type TEditorContext = {
  instance: TMonacoEditor.IStandaloneCodeEditor | undefined;
  setInstance: (instance: TMonacoEditor.IStandaloneCodeEditor) => void;
  output: string;
  setOutput: (text: string) => void;
  currentSection: EEditorSectionType;
  setCurrentSection: (section: EEditorSectionType) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  activeLessonSlug: string | undefined
  setActiveLessonSlug: (slug: string) => void;
  activeLesson: TLesson | undefined
  setActiveLesson: (lesson: TLesson) => void;
};

const initialState: TEditorContext = {
  instance: undefined,
  setInstance: (instance: TMonacoEditor.IStandaloneCodeEditor) => {},
  output: "",
  setOutput: (text: string) => {},
  currentSection: EEditorSectionType.LESSON,
  setCurrentSection: (section: EEditorSectionType) => {},
  fontSize: 14,
  setFontSize: (size: number) => {},
  activeLessonSlug: undefined,
  setActiveLessonSlug: (slug: string) => {},
  activeLesson: undefined,
  setActiveLesson: (lesson: TLesson) => {},
};

const EditorContext = createContext<TEditorContext>(initialState);

type TProps = {
  children: JSX.Element | JSX.Element[];
};

const EditorProvider = ({children}: TProps) => {
  const [instance, setInstance] = useState(initialState.instance);
  const [output, setOutput] = useState(initialState.output);
  const [currentSection, setCurrentSection] = useState(initialState.currentSection);
  const [fontSize, setFontSize] = useState(initialState.fontSize);
  const [activeLessonSlug, setActiveLessonSlug] = useState(initialState.activeLessonSlug);
  const [activeLesson, setActiveLesson] = useState(initialState.activeLesson);

  return (
    <EditorContext.Provider
      value={{
        instance,
        setInstance,
        output,
        setOutput,
        currentSection,
        setCurrentSection,
        fontSize,
        setFontSize,
        activeLessonSlug,
        setActiveLessonSlug,
        activeLesson,
        setActiveLesson,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export {EditorContext, EditorProvider};
