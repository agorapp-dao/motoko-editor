import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Markdown } from '@/src/features/editor/components/Editor/Markdown/Markdown';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import * as S from './SectionLesson.styled';
import { Solution } from '@/src/features/editor/components/Editor/Solution/Solution';
import { useText } from '@/src/hooks/useText';
import { useJson } from '@/src/hooks/useJson';
import { TCourse } from '@/src/types/education';
import findLessonRecursively from '@/src/utils/findLesson';
import { courseService } from '@/src/features/editor/services/courseService';

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
  const activeLesson = findLessonRecursively(course.data?.lessons || [], activeLessonSlug || '');
  const markdown = useText(activeLesson?.content && activeLesson.content[lessonTab].markdown);
  const solutionMarkdown = useText(activeLesson?.solution?.markdown);

  console.debug('activeLessonSlug', activeLessonSlug);

  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setLessonTab(newValue);
  };

  return (
    <div style={{ margin: '1.5rem' }}>
      <Box sx={{ width: '100%', flex: '1 1 auto' }}>
        {activeLesson?.content && activeLesson?.content.length > 1 && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={lessonTab} onChange={changeTab} centered>
                {activeLesson.content.map(item => (
                  <Tab key={item.tab} label={item.tab} />
                ))}
              </Tabs>
            </Box>
            {activeLesson.content.map((item, index) => (
              <TabPanel value={lessonTab} index={index} key={index}>
                <Markdown>{markdown.data || ''}</Markdown>
              </TabPanel>
            ))}
          </>
        )}
        {activeLesson?.content && activeLesson?.content.length === 1 && (
          <Markdown>{markdown.data || ''}</Markdown>
        )}
        {solutionMarkdown.data && <Solution content={solutionMarkdown.data} />}
      </Box>
    </div>
  );
};
