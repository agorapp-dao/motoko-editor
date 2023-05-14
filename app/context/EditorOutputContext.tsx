"use client"

import {useState, createContext} from 'react';

export type TEditorOutputContext = {
  output: string;
  setOutput: (text: string) => void;
};

const initialState: TEditorOutputContext = {
  output: "",
  setOutput: (text: string) => {},
};

const EditorOutputContext = createContext<TEditorOutputContext>(initialState);

type TProps = {
  children: JSX.Element | JSX.Element[];
};

const EditorOutputProvider = ({ children }: TProps) => {
  const [output, setOutput] = useState(initialState.output);
  return (
    <EditorOutputContext.Provider value={{output, setOutput}}>
      {children}
    </EditorOutputContext.Provider>
  );
};

export {EditorOutputContext, EditorOutputProvider};
