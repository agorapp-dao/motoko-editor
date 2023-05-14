"use client"

import {useState, createContext} from 'react';
import {EEditorSectionType} from "@/app/constants/editor";

export type TEditorSectionContext = {
  currentSection: EEditorSectionType;
  setCurrentSection: (section: EEditorSectionType) => void;
};

const initialState: TEditorSectionContext = {
  currentSection: EEditorSectionType.LESSON,
  setCurrentSection: (section: EEditorSectionType) => {},
};

const EditorSectionContext = createContext<TEditorSectionContext>(initialState);

type TProps = {
  children: JSX.Element | JSX.Element[];
};

const EditorSectionProvider = ({ children }: TProps) => {
  const [currentSection, setCurrentSection] = useState(initialState.currentSection);
  return (
    <EditorSectionContext.Provider value={{currentSection, setCurrentSection}}>
      {children}
    </EditorSectionContext.Provider>
  );
};

export {EditorSectionContext, EditorSectionProvider};
