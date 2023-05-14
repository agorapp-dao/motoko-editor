import * as S from './ControlPanel.styled';
import React, {useContext} from "react";
import {Button, IconButton} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import {EditorOutputContext} from "@/app/context/EditorOutputContext";
import {EditorInstanceContext} from "@/app/context/EditorInstanceContext";
import mo from 'motoko/lib/versions/interpreter';

export const ControlPanel = () => {

  const {setOutput} = useContext(EditorOutputContext);
  const {instance} = useContext(EditorInstanceContext);

  const runCode = () => {
      if (!instance) {
          return;
      }

      mo.write('Main.mo', instance.getValue());
      const res = mo.run('Main.mo');

      setOutput(res.stdout + res.stderr);
  };

  return (
    <S.Wrapper>
      <Button onClick={runCode} variant="contained" startIcon={<PlayArrowRoundedIcon />} sx={{ borderRadius: '1.6rem' }}>
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
