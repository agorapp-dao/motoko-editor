import React, { useContext, useEffect, useState } from 'react';
import { Box, Tabs } from '@mui/material';
import { MonacoEditor } from '@/src/app/Editor/Monaco/MonacoEditor';
import { EditorContext } from '@/src/app/context/EditorContext';
import { PanelTab } from '@/src/components/PanelTab/PanelTab';

interface TEditorFile {
  name: string;
  content: string;
  language: string;
}

export const SectionCode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { instance, activeLessonSlug, activeLesson } = useContext(EditorContext);
  const [tabs, setTabs] = useState<TEditorFile[]>([]);

  useEffect(() => {
    if (activeLesson?.files?.length) {
      // TODO - use SWR, cache, etc. (or load outside of this component)
      Promise.all(
        activeLesson.files.map(file =>
          fetch(file.path)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${file.path}, status: ${response.status}`);
              }
              return response.text();
            })
            .then(content => {
              const tabName = file.path.split('/').pop();
              const tab: TEditorFile = {
                name: tabName || '',
                language: file.language,
                content,
              };
              return tab;
            }),
        ),
      )
        .then(tabs => {
          setTabs(tabs);
        })
        .catch(err => console.error(err));
    }
  }, [activeLessonSlug]);

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
              <PanelTab label={tab.name} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <MonacoEditor language={tabs[activeTab]?.language} value={tabs[activeTab]?.content} />
    </>
  );
};
