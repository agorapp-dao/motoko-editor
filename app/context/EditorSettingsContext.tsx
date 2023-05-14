"use client"

import {useState, createContext} from 'react';

export type TEditorSettingsContext = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

const initialState: TEditorSettingsContext = {
  fontSize: 14,
  setFontSize: (size: number) => {},
};

const EditorSettingsContext = createContext<TEditorSettingsContext>(initialState);

type TProps = {
  children: JSX.Element | JSX.Element[];
};

const EditorSettingsProvider = ({ children }: TProps) => {
  const [fontSize, setFontSize] = useState(initialState.fontSize);
  return (
    <EditorSettingsContext.Provider value={{fontSize, setFontSize}}>
      {children}
    </EditorSettingsContext.Provider>
  );
};

export {EditorSettingsContext, EditorSettingsProvider};
