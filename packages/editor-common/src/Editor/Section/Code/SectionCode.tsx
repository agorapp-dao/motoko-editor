import React from 'react';
import { Box, Tabs } from '@mui/material';
import { PanelTab } from '../../../components/PanelTab/PanelTab';
import { FullscreenControl } from '../../../components/FullscreenControl/FullscreenControl';
import { MonacoEditor } from '../../Monaco/MonacoEditor';
import { useEditorActions, useEditorActiveTab, useEditorTabs } from '../../EditorStore';

export const SectionCode = () => {
  const tabs = useEditorTabs();
  const activeTab = useEditorActiveTab();
  const actions = useEditorActions();

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    actions.setActiveTab(newValue);
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
