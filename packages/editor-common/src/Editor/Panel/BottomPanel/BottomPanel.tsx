import { Pane } from 'split-pane-react';
import React, { useContext, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import * as S from './BottomPanel.styled';
import { SectionOutput } from '../../Section/SectionOutput/SectionOutput';
import { EditorContext } from '../../EditorContext';

export const BottomPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([{ name: 'Output' }]);
  const { output } = useContext(EditorContext);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Pane>
      <Box sx={{ width: '100%', flex: '1 1 auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={changeActiveTab}>
            {tabs.map((tab, index) => (
              <Tab label={tab.name} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
        <S.Content>
          <SectionOutput output={output} />
        </S.Content>
      </Box>
    </Pane>
  );
};
