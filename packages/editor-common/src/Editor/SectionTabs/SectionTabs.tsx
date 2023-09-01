import { Box, IconButton, Tab, Tabs } from '@mui/material';
import React from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { styled } from '@mui/material/styles';
import * as S from './SectionTabs.styled';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CodeIcon from '@mui/icons-material/Code';
import { EEditorSectionType } from '../../constants';
import { useMobile } from '../../hooks/useMobile';
import { useEditorActions, useEditorStore } from '../EditorStore';
import { FeedbackBtn } from '../../components/Feeback/FeedbackBtn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useSettingsDialog } from '../../hooks/dialog/useSettingsDialog';

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
  const { showSettingsDialog } = useSettingsDialog();
  const store = useEditorStore();
  const actions = useEditorActions();

  const changeSection = (event: React.SyntheticEvent, section: EEditorSectionType) => {
    actions.setCurrentSection(section);
  };

  return (
    <S.Wrapper>
      <S.Tabs>
        <Box sx={{ flexGrow: 1, display: 'flex', height: 224 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={
              !mobile && store.currentSection === EEditorSectionType.CODE
                ? EEditorSectionType.LESSON
                : store.currentSection
            }
            onChange={changeSection}
            aria-label="Navigation menu"
            sx={{ borderRight: 0 }}
          >
            <AntTab
              icon={<FormatListBulletedIcon />}
              value={EEditorSectionType.TABLE_OF_CONTENTS}
            />
            <AntTab icon={<ImportContactsIcon />} value={EEditorSectionType.LESSON} />
            {mobile && <AntTab icon={<CodeIcon />} value={EEditorSectionType.CODE} />}
          </Tabs>
        </Box>
      </S.Tabs>
      {store.courseSlug && store.activeLessonSlug && (
        <FeedbackBtn
          userCode={store.tabs[store.activeTab]?.model.getValue()}
          slug={`${store.courseSlug}/${store.activeLessonSlug}`}
        />
      )}
      <S.Settings>
        <Box sx={{ textAlign: 'center' }}>
          <IconButton aria-label="settings" onClick={() => showSettingsDialog()}>
            <SettingsRoundedIcon />
          </IconButton>
        </Box>
      </S.Settings>
    </S.Wrapper>
  );
};
