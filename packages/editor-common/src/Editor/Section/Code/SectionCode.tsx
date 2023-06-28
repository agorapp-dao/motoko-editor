import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Tabs } from '@mui/material';
import { EditorContext } from '../../EditorContext';
import { PanelTab } from '../../../components/PanelTab/PanelTab';
import { FullscreenControl } from '../../../components/FullscreenControl/FullscreenControl';
import { MonacoEditor } from '../../Monaco/MonacoEditor';
import { editorService } from '../../editorService';

export const SectionCode = () => {
  const { files, setFiles, activeFile, setActiveFile } = useContext(EditorContext);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveFile(newValue);
  };

  const handleValueChange = (value: string) => {
    setFiles(files => {
      files[activeFile].content = value;
      return [...files];
    });
  };

  if (!files.length) {
    return <div></div>;
  }

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: '1 1 auto' }}>
          <Tabs value={activeFile} onChange={changeActiveTab}>
            {files?.map((file, index) => (
              <PanelTab label={file.path} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
        <FullscreenControl />
      </Box>
      <MonacoEditor
        language={editorService.getLanguageForFile(files[activeFile]?.path)}
        value={files[activeFile]?.content}
        onValueChange={handleValueChange}
      />
    </>
  );
};
