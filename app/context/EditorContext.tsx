'use client';

import {useState, createContext} from 'react';
import type {editor as monacoEditor} from 'monaco-editor';
import {EEditorSectionType} from "@/app/constants/editor";

export type TEditorContext = {
  instance: monacoEditor.IStandaloneCodeEditor | undefined;
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => void;
  output: string;
  setOutput: (text: string) => void;
  currentSection: EEditorSectionType;
  setCurrentSection: (section: EEditorSectionType) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
};

const initialState: TEditorContext = {
  instance: undefined,
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => {},
  output: "",
  setOutput: (text: string) => {},
  currentSection: EEditorSectionType.LESSON,
  setCurrentSection: (section: EEditorSectionType) => {},
  fontSize: 14,
  setFontSize: (size: number) => {
  },
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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export {EditorContext, EditorProvider};
