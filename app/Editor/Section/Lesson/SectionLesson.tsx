import React, {useContext, useEffect, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {Markdown} from "@/app/Editor/Markdown/Markdown";
import {EditorContext} from "@/app/context/EditorContext";
import * as S from './SectionLesson.styled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{padding: '1rem 0'}}>{children}</div>
      )}
    </div>
  );
}

export const SectionLesson = () => {

  const [lessonTab, setLessonTab] = useState(0);
  const [markdown, setMarkdown] = useState('');
  const {activeLessonSlug, activeLesson} = useContext(EditorContext);

  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setLessonTab(newValue);
  };

  // TODO - this is called twice on page load
  useEffect(() => {
    if (activeLesson?.content) {
      // TODO - use SWR, cache, etc. (or load outside of this component)
      fetch(activeLesson.content[0].markdown).then((response) => {
        if (!response.ok) {
          throw new Error(`Markdown download failed! status: ${response.status}`);
        }
        return response.text();
      }).then((text) => {
        setMarkdown(text);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [activeLessonSlug]);

  // TODO - add loading state

  return (
    <div style={{margin: '1.5rem'}}>
      <S.LessonTitle>
        <h2>{activeLesson?.name}</h2>
        {/*<span>1/2</span>*/}
      </S.LessonTitle>
      <Box sx={{width: '100%', flex: '1 1 auto'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={lessonTab} onChange={changeTab} centered>
            <Tab label="Theory"/>
            <Tab label="Exercise"/>
          </Tabs>
        </Box>
        <TabPanel value={lessonTab} index={0}>
          <Markdown>{markdown}</Markdown>
        </TabPanel>
        <TabPanel value={lessonTab} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  );

};
