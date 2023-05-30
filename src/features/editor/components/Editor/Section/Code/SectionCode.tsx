import React, { useContext, useEffect, useState } from 'react';
import { Box, Tabs } from '@mui/material';
import { MonacoEditor } from '@/src/features/editor/components/Editor/Monaco/MonacoEditor';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import { PanelTab } from '@/src/components/PanelTab/PanelTab';
import { useText } from '@/src/hooks/useText';
import { TCourse, TLesson } from '@/src/types/education';
import useSWR from 'swr';
import { useJson } from '@/src/hooks/useJson';
import findLessonRecursively from '@/src/utils/findLesson';

export const SectionCode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { instance, activeLessonSlug } = useContext(EditorContext);
  const course = useJson<TCourse>('/api/course/motoko-tutorial');
  const activeLesson = findLessonRecursively(course.data?.lessons || [], activeLessonSlug || '');
  const file = useText(activeLesson?.files && activeLesson.files[activeTab].path);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!activeLesson?.files) {
    return <div></div>;
  }

  return (
    <>
      <Box sx={{ width: '100%', flex: '1 1 auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={changeActiveTab}>
            {activeLesson?.files?.map((file, index) => (
              <PanelTab label={file.path.split('/').pop()} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <MonacoEditor language={activeLesson.files[activeTab].language} value={file.data} />
    </>
  );
};
