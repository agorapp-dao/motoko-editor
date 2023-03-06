"use client"
import React, { useState, useEffect, useRef } from 'react';
import {editor as monacoEditor} from 'monaco-editor/esm/vs/editor/editor.api';


function Home() {
  const [tabs, setTabs] = useState([
    { name: 'Tab 1', content: '' },
    { name: 'Tab 2', content: '' },
    { name: 'Tab 3', content: '' },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let editor: monacoEditor.IStandaloneCodeEditor;
    if (divEl.current) {
      editor = monacoEditor.create(divEl.current, {
        value: tabs[activeTab].content,
        language: 'solidity',
        theme: 'vs-dark',
        automaticLayout: true,
      });
      
      const editorModel = editor.getModel();
      if(editorModel) {
        handleEditorChange(editor.getValue());
      }
    }

    return () => {
      editor.dispose();
    };
  }, [tabs.content, activeTab]);

  function handleEditorChange(value: string) {
    const newTabs = [...tabs];
    newTabs[activeTab].content = value;
    setTabs(newTabs);
  }

  function addTab() {
    const newTabs = [...tabs, { name: `Tab ${tabs.length + 1}`, content: '' }];
    setTabs(newTabs);
    setActiveTab(newTabs.length - 1);
  }

  function handleCloseTab(tabNumber: nu) {
    const newTabs = [...tabs];
    newTabs.splice(tabNumber, 1);
    setTabs(newTabs);
    setActiveTab(Math.min(tabNumber, newTabs.length - 1));
  }

  // i.e.: save it on a github gist
  function saveTabContent(tabNumber: number) {
    // Save the content of the tab with the given index
    const content = tabs[tabNumber].content;
    console.log(`Saved content of tab ${tabNumber}: ${content}`);
  }

  return (
    <div>
      <div>
        {tabs.map((tab, index) => (
          <div style={{display: 'inline'}} role='button' key={index} onClick={() => setActiveTab(index)}>
            {tab.name}
            <button onClick={() => handleCloseTab(index)}>X</button>
            <button onClick={() => saveTabContent(index)}>Save</button>
          </div>
        ))}
        <button onClick={addTab}>+</button>
      </div>
      <div ref={divEl} style={{ height: '400px' }} />
    </div>
  );
}

export default Home;
