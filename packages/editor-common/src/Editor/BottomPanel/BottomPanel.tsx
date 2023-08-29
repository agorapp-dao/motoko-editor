import { Pane } from 'split-pane-react';
import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import * as S from './BottomPanel.styled';
import { useEditorStore } from '../EditorStore';
import { SectionOutput } from '../Section/SectionOutput/SectionOutput';
import { courseService } from '../../services/courseService';
import { SectionTests } from '../Section/SectionTests/SectionTests';

export const BottomPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<string[]>([]);
  const store = useEditorStore();
  const course = courseService.useCourse();

  useEffect(() => {
    if (!course.data) {
      return;
    }

    const newTabs = [];
    if (course.data.config.output) {
      newTabs.push('Output');
    }
    if (course.data.config.tests) {
      newTabs.push('Tests');
    }
    setTabs(newTabs);
  }, [course.data]);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    // <Pane style={{ display: 'flex', height: '100%' }}>
    <Box sx={{ width: '100%', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: theme => theme.palette.secondary.main }}>
        <Tabs value={activeTab} onChange={changeActiveTab}>
          {tabs.map((tab, index) => (
            <Tab label={tab} key={index} value={index} />
          ))}
        </Tabs>
      </Box>
      <S.Content>
        {course.data?.config.output && <SectionOutput output={store.output} />}
        {course.data?.config.tests && <SectionTests testResults={store.testResults} />}
      </S.Content>
    </Box>
    // </Pane>
  );
};
