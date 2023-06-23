import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Markdown } from '@/src/features/editor/components/Editor/Markdown/Markdown';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import { Solution } from '@/src/features/editor/components/Editor/Solution/Solution';
import { courseService } from '@agorapp/editor-common';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`lesson-tabpanel-${index}`} {...other}>
      {value === index && <div style={{ padding: '1rem 0' }}>{children}</div>}
    </div>
  );
}

export const SectionLesson = () => {
  const [lessonTab, setLessonTab] = useState(0);
  const { courseSlug, activeLessonSlug } = useContext(EditorContext);
  const course = courseService.useCourse(courseSlug);
  const activeLesson = courseService.findLessonBySlug(course.data, activeLessonSlug);
  const markdown = courseService.useContent(course.data, activeLesson?.content);
  const solutionMarkdown = courseService.useContent(course.data, activeLesson?.solution);

  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setLessonTab(newValue);
  };

  return (
    <div style={{ margin: '1.5rem' }}>
      <Box sx={{ width: '100%', flex: '1 1 auto' }}>
        {/*TODO: multiple content tab support coming later*/}
        {/*{activeLesson?.content && activeLesson?.content.length > 1 && (*/}
        {/*  <>*/}
        {/*    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
        {/*      <Tabs value={lessonTab} onChange={changeTab} centered>*/}
        {/*        {activeLesson.content.map(item => (*/}
        {/*          <Tab key={item.tab} label={item.tab} />*/}
        {/*        ))}*/}
        {/*      </Tabs>*/}
        {/*    </Box>*/}
        {/*    {activeLesson.content.map((item, index) => (*/}
        {/*      <TabPanel value={lessonTab} index={index} key={index}>*/}
        {/*        <Markdown>{markdown.data || ''}</Markdown>*/}
        {/*      </TabPanel>*/}
        {/*    ))}*/}
        {/*  </>*/}
        {/*)}*/}
        {activeLesson?.content && <Markdown>{markdown.data || ''}</Markdown>}
        {solutionMarkdown.data && <Solution content={solutionMarkdown.data} />}
      </Box>
    </div>
  );
};
