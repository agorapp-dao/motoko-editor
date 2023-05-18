import React, { useContext, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { MonacoEditor } from '@/app/Editor/Monaco/MonacoEditor';
import { EditorContext } from '@/app/context/EditorContext';

const SAMPLE_CODE = `import D "mo:base/Debug";

D.print(debug_show(("hello", 42, "world")));
`;

export const SectionCode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { instance } = useContext(EditorContext);
  const [tabs, setTabs] = useState([
    { name: 'Tab 1', content: SAMPLE_CODE },
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
  };

  return (
    <>
      <Box sx={{ width: '100%', flex: '1 1 auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={changeActiveTab}>
            {tabs.map((tab, index) => (
              <Tab label={tab.name} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <MonacoEditor language="motoko" value={tabs[activeTab].content} />
    </>
  );
};
