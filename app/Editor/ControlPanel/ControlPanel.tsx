import * as S from './ControlPanel.styled';
import React from "react";
import {Button, IconButton} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export const ControlPanel = () => {

  return (
    <S.Wrapper>
      <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} sx={{ borderRadius: '1.6rem' }}>
        RUN
      </Button>
      <IconButton aria-label="delete">
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <IconButton aria-label="back">
        <NavigateBeforeRoundedIcon />
      </IconButton>
      <Button variant="contained" color="secondary" endIcon={<NavigateNextRoundedIcon />} sx={{ borderRadius: '1.6rem' }}>
        NEXT
      </Button>
    </S.Wrapper>
  );

};
