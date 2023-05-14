"use client"

import {useState, createContext} from 'react';
import {editor as monacoEditor} from "monaco-editor";

export type TEditorInstanceContext = {
  instance: monacoEditor.IStandaloneCodeEditor | undefined;
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => void;
};

const initialState: TEditorInstanceContext = {
  instance: undefined,
  setInstance: (instance: monacoEditor.IStandaloneCodeEditor) => {},
};

const EditorInstanceContext = createContext<TEditorInstanceContext>(initialState);

type TProps = {
  children: JSX.Element | JSX.Element[];
};

const EditorInstanceProvider = ({ children }: TProps) => {
  const [instance, setInstance] = useState(initialState.instance);
  return (
    <EditorInstanceContext.Provider value={{instance, setInstance}}>
      {children}
    </EditorInstanceContext.Provider>
  );
};

export {EditorInstanceContext, EditorInstanceProvider};
