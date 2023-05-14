import React, {useContext, useEffect, useRef, useState} from "react";
import {editor as monacoEditor} from "monaco-editor";
import * as S from './SectionCode.styled';
import {Box, Tab, Tabs} from "@mui/material";
import {EditorSettingsContext} from "@/app/context/EditorSettingsContext";
import {EditorInstanceContext} from "@/app/context/EditorInstanceContext";

export const SectionCode = () => {

  const divEl = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const {fontSize} = useContext(EditorSettingsContext);
  const {instance, setInstance} = useContext(EditorInstanceContext);
  const [tabs, setTabs] = useState([
    { name: 'Tab 1', content: '1' },
    { name: 'Tab 2', content: '2' },
    { name: 'Tab 3', content: '3' },
  ]);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    if (instance) {
      handleEditorChange(instance.getValue());
    }
    setActiveTab(newValue);
    if (instance) {
      handleEditorChange(instance.getValue());
    }
  };

  const handleEditorChange = (value: string) => {
    const newTabs = [...tabs];
    newTabs[activeTab].content = value;
    setTabs(newTabs);
  }

  useEffect(() => {
    let editorCreate: monacoEditor.IStandaloneCodeEditor;
    if (divEl.current) {
      editorCreate = monacoEditor.create(divEl.current, {
        value: tabs[activeTab].content,
        language: 'solidity',
        theme: 'editorTheme',
        automaticLayout: true,
        fontSize: fontSize,
      });

      const editorModel = editorCreate.getModel();
      if(editorModel) {
        handleEditorChange(editorCreate.getValue());
      }

      setInstance(editorCreate);
    }

    return () => {
      editorCreate.dispose();
    };
  }, [activeTab]);

  useEffect(() => {
    if (instance && fontSize) {
      instance.updateOptions({
        fontSize: fontSize,
      })
    }
  }, [fontSize]);

  return (
   <>
     <Box sx={{width: '100%', flex: '1 1 auto'}}>
       <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
         <Tabs value={activeTab} onChange={changeActiveTab}>
           {tabs.map((tab, index) => (
             <Tab label={tab.name} key={index} value={index} />
           ))}
         </Tabs>
       </Box>
     </Box>
     <S.Code ref={divEl} />
   </>
  );
};
