import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Markdown } from '@/app/Editor/Markdown/Markdown';
import { EditorContext } from '@/app/context/EditorContext';
import * as S from './SectionLesson.styled';
import { Solution } from '@/app/Editor/Solution/Solution';
import Link from 'next/link';

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
  const { content } = useContext(EditorContext);

  return (
    <div style={{ margin: '1.5rem' }}>
      <Box sx={{ width: '100%', flex: '1 1 auto' }}>
        <Markdown>{content}</Markdown>
      </Box>
    </div>
  );
};
