import { Box, Icon, IconButton, Tab, Tabs } from '@mui/material';
import React, { useContext, useState } from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { styled } from '@mui/material/styles';
import * as S from './SectionTabs.styled';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CodeIcon from '@mui/icons-material/Code';
import { EEditorSectionType } from '../../constants';
import { AgorAppIcon } from '../../constants/assets';
import { SettingsDialog } from '../SettingsDialog/SettingsDialog';
import { AuthorDialog } from '../../components/AuthorDialog/AuthorDialog';
import { useMobile } from '../../hooks/useMobile';
import { useEditorActions, useEditorCurrentSection } from '../EditorStore';

interface StyledTabProps {
  icon?: string | React.ReactElement;
  value: EEditorSectionType;
}

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  '&:hover': {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  '&.Mui-selected': {
    background: theme.mixins.toolbar.panelHoverBg,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    // backgroundColor: '#d1eaff',
  },
}));

export const SectionTabs = () => {
  const { mobile } = useMobile();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [authorDialogOpen, setAuthorDialogOpen] = useState(false);
  const currentSection = useEditorCurrentSection();
  const actions = useEditorActions();

  const changeSection = (event: React.SyntheticEvent, section: EEditorSectionType) => {
    actions.setCurrentSection(section);
  };

  return (
    <S.Wrapper>
      <AuthorDialog open={authorDialogOpen} handleClose={() => setAuthorDialogOpen(false)} />
      <S.Logo onClick={() => setAuthorDialogOpen(state => !state)}>
        <Icon sx={{ fontSize: 40 }} style={{ width: '100%', lineHeight: 0 }}>
          <img src={AgorAppIcon} height={35} width={35} alt="AgorApp" />
        </Icon>
      </S.Logo>
      <S.Tabs>
        <Box sx={{ flexGrow: 1, display: 'flex', height: 224 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={
              !mobile && currentSection === EEditorSectionType.CODE
                ? EEditorSectionType.LESSON
                : currentSection
            }
            onChange={changeSection}
            aria-label="Navigation menu"
            sx={{ borderRight: 0 }}
          >
            <AntTab icon={<ImportContactsIcon />} value={EEditorSectionType.LESSON} />
            {mobile && <AntTab icon={<CodeIcon />} value={EEditorSectionType.CODE} />}
          </Tabs>
        </Box>
      </S.Tabs>
      <S.Settings>
        <SettingsDialog open={settingsOpen} handleClose={() => setSettingsOpen(false)} />
        <IconButton aria-label="settings" onClick={() => setSettingsOpen(state => !state)}>
          <SettingsRoundedIcon />
        </IconButton>
      </S.Settings>
    </S.Wrapper>
  );
};
