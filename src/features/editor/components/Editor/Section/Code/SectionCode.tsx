import React, { useContext, useState } from 'react';
import { Box, Tabs } from '@mui/material';
import { MonacoEditor } from '@/src/features/editor/components/Editor/Monaco/MonacoEditor';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import { PanelTab } from '@/src/components/PanelTab/PanelTab';
import { useText } from '@/src/hooks/useText';
import findLessonRecursively from '@/src/utils/findLesson';
import { courseService } from '@/src/features/editor/services/courseService';
import { FullscreenControl } from '@/src/components/FullscreenControl/FullscreenControl';

export const SectionCode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { courseSlug, activeLessonSlug } = useContext(EditorContext);
  const course = courseService.useCourse(courseSlug);
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
      <Box display="flex" flexDirection="row">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: '1 1 auto' }}>
          <Tabs value={activeTab} onChange={changeActiveTab}>
            {activeLesson?.files?.map((file, index) => (
              <PanelTab label={file.path.split('/').pop()} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
        <FullscreenControl />
      </Box>
      <MonacoEditor language={activeLesson.files[activeTab].language} value={file.data} />
    </>
  );
};
