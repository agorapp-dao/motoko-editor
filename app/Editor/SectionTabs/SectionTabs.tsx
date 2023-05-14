import {Box, Icon, IconButton, Tab, Tabs} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import BackupIcon from '@mui/icons-material/Backup';
import {styled} from '@mui/material/styles';
import {EditorSectionContext} from "@/app/context/EditorSectionContext";
import {EEditorSectionType} from "@/app/constants/editor";
import * as S from './SectionTabs.styled';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {SettingsDialog} from "@/app/Editor/SettingsDialog/SettingsDialog";

interface StyledTabProps {
  icon?: string | React.ReactElement;
  value: EEditorSectionType;
}

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({theme}) => ({
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
  }),
);


export const SectionTabs = () => {

  const {currentSection, setCurrentSection} = useContext(EditorSectionContext);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const changeSection = (event: React.SyntheticEvent, section: EEditorSectionType) => {
    setCurrentSection(section)
  };

  const openSettingsDialog = () => {

  };

  return (
    <S.Wrapper>
      <S.Logo>
        <Icon sx={{fontSize: 40}} style={{width: '100%', lineHeight: 0}}>
          <img src="/logoAgorApp.svg" height={35} width={35}/>
        </Icon>
      </S.Logo>
      <S.Tabs>
        <Box sx={{flexGrow: 1, display: 'flex', height: 224}}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentSection}
            onChange={changeSection}
            aria-label="Navigation menu"
            sx={{borderRight: 0}}
          >
            <AntTab icon={<ImportContactsIcon/>} value={EEditorSectionType.LESSON}/>
            <AntTab icon={<FolderOpenIcon/>} value={EEditorSectionType.TREE}/>
            <AntTab icon={<BackupIcon/>} value={EEditorSectionType.SHARE}/>
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
