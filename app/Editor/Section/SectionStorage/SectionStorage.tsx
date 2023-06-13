import React, { useContext, useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Box, Tab, Tabs } from '@mui/material';
import { Markdown } from '@/app/Editor/Markdown/Markdown';
import { EditorContext } from '@/app/context/EditorContext';
import { Solution } from '@/app/Editor/Solution/Solution';
import { TabPanelProps } from '@mui/lab';


type TProps = {
  handleSectionStorage: () => Promise<void>;
}

export const SectionStorage = ({handleSectionStorage}:TProps ) => {


  return (
    <div style={{ margin: '1.5rem' }}>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={async () => await handleSectionStorage()}
      >
        save on swarm
      </Button>
    </div>
  );
};
