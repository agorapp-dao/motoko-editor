'use client';

import { useState, createContext } from 'react';
import type { editor as monacoEditor } from 'monaco-editor';
import { EEditorSectionType } from '@/app/constants/editor';
import { TCourse, TLesson } from '@/app/types/education';

export type TEditorContext = {
  course?: TCourse;
  content?: string;

  instance: monacoEditor.IStandaloneCodeEditor | undefined;
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => void;
  output: string;
  setOutput: (text: string) => void;
  currentSection: EEditorSectionType;
  setCurrentSection: (section: EEditorSectionType) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  activeLessonSlug: string | undefined;
  setActiveLessonSlug: (slug: string) => void;
  activeLesson: TLesson | undefined;
  setActiveLesson: (lesson: TLesson) => void;
};

// TODO: revisit why is this needed
const initialState: TEditorContext = {
  instance: undefined,
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => {},
  output: '',
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
  course: TCourse;
  content: string;
  children: JSX.Element | JSX.Element[];
};

const EditorProvider = ({ course, content, children }: TProps) => {
  const [course_] = useState<TCourse>(course);
  const [content_] = useState<string>(content);

  // old props
  const [instance, setInstance] = useState(initialState.instance);
  const [output, setOutput] = useState(initialState.output);
  const [currentSection, setCurrentSection] = useState(initialState.currentSection);
  const [fontSize, setFontSize] = useState(initialState.fontSize);
  const [activeLessonSlug, setActiveLessonSlug] = useState(initialState.activeLessonSlug);
  const [activeLesson, setActiveLesson] = useState(initialState.activeLesson);

  return (
    <EditorContext.Provider
      value={{
        course: course_,
        content: content_,

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

export { EditorContext, EditorProvider };
