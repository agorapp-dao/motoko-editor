'use client';

import {useState, createContext} from 'react';
import type {editor as monacoEditor} from 'monaco-editor';
import {EEditorSectionType} from "@/app/constants/editor";
import {TLesson, TWalletIdentity} from "@/app/types/education";

export type TEditorContext = {
  instance: monacoEditor.IStandaloneCodeEditor | undefined;
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => void;
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
  walletIdentity: TWalletIdentity,
  setWalletIdentity: (walletIdentity: TWalletIdentity) => void;
};

const initialState: TEditorContext = {
  instance: undefined,
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => {},
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
  walletIdentity: {
    address: undefined,
    chain: undefined
  },
  setWalletIdentity: (walletIdentity: TWalletIdentity) => {},
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
  const [walletIdentity, setWalletIdentity] = useState(initialState.walletIdentity);


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
        walletIdentity,
        setWalletIdentity
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export {EditorContext, EditorProvider};
