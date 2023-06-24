import React, { useContext, useState } from 'react';
import { Box, Tabs } from '@mui/material';
import { EditorContext } from '../../EditorContext';
import { courseService } from '../../../services/courseService';
import { PanelTab } from '../../../components/PanelTab/PanelTab';
import { FullscreenControl } from '../../../components/FullscreenControl/FullscreenControl';
import { MonacoEditor } from '../../Monaco/MonacoEditor';

export const SectionCode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { courseSlug, activeLessonSlug } = useContext(EditorContext);
  const course = courseService.useCourse(courseSlug);
  const activeLesson = courseService.findLessonBySlug(course.data, activeLessonSlug);
  const file = courseService.useContent(
    course.data,
    activeLesson?.files && activeLesson.files[activeTab],
  );

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
              <PanelTab label={file.split('/').pop()} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
        <FullscreenControl />
      </Box>
      {/*TODO: get language from extension of activeLesson.files[activeTab] */}
      <MonacoEditor language="motoko" value={file.data} />
    </>
  );
};
