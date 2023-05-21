import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Markdown } from '@/app/Editor/Markdown/Markdown';
import { EditorContext } from '@/app/context/EditorContext';
import * as S from './SectionLesson.styled';
import { Solution } from '@/app/Editor/Solution/Solution';

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
  const [markdown, setMarkdown] = useState('');
  const [solution, setSolution] = useState('');
  const { activeLessonSlug, activeLesson } = useContext(EditorContext);

  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setLessonTab(newValue);
  };

  // TODO - this is called twice on page load
  useEffect(() => {
    if (activeLesson?.content) {
      // TODO - use SWR, cache, etc. (or load outside of this component)
      fetch(activeLesson.content[0].markdown)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Markdown download failed! status: ${response.status}`);
          }
          return response.text();
        })
        .then(text => {
          setMarkdown(text);
        })
        .catch(err => {
          console.error(err);
        });
    }

    if (activeLesson?.solution) {
      fetch(activeLesson.solution.markdown)
        .then(response => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ${activeLesson.solution?.markdown}, status: ${response.status}`,
            );
          }
          return response.text();
        })
        .then(text => {
          setSolution(text);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [activeLessonSlug]);

  // TODO - add loading state

  return (
    <div style={{ margin: '1.5rem' }}>
      <S.LessonTitle>
        <h2>{activeLesson?.name}</h2>
        {/*<span>1/2</span>*/}
      </S.LessonTitle>
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
                <Markdown>{markdown}</Markdown>
              </TabPanel>
            ))}
          </>
        )}
        {activeLesson?.content && activeLesson?.content.length === 1 && (
          <Markdown>{markdown}</Markdown>
        )}
        {solution && <Solution content={solution} />}
      </Box>
    </div>
  );
};
