import React, { useContext } from 'react';
import { Box, Tabs } from '@mui/material';
import { EditorContext } from '../../EditorContext';
import { PanelTab } from '../../../components/PanelTab/PanelTab';
import { FullscreenControl } from '../../../components/FullscreenControl/FullscreenControl';
import { MonacoEditor } from '../../Monaco/MonacoEditor';

export const SectionCode = () => {
  const { tabs, activeTab, setActiveTab } = useContext(EditorContext);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!tabs.length) {
    return <div></div>;
  }

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: '1 1 auto' }}>
          <Tabs value={activeTab} onChange={changeActiveTab}>
            {tabs?.map((tab, index) => (
              <PanelTab label={tab.path} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
        <FullscreenControl />
      </Box>
      <MonacoEditor model={tabs[activeTab]?.model} />
    </>
  );
};
