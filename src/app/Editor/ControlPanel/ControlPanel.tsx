import * as S from './ControlPanel.styled';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import mo from 'motoko/lib/versions/interpreter';
import motokoBasePackage from 'motoko/packages/latest/base.json';
import { EditorContext } from '@/src/app/context/EditorContext';
import { sleep } from '@/src/app/utils/sleep';
import nextLesson from '@/src/app/utils/nextLesson';
import { DEMO_COURSE } from '@/src/app/constants/education';
import { TLesson } from '@/src/app/types/education';

export const ControlPanel = () => {
  const { instance, setOutput, activeLessonSlug, setActiveLessonSlug, setActiveLesson } =
    useContext(EditorContext);
  const [running, setRunning] = useState(false);
  const [nextActive, setNextActive] = useState<TLesson | undefined>(undefined);

  useEffect(() => {
    // TODO - reject running code
    setNextActive(undefined);
  }, [activeLessonSlug]);

  const handleRunCode = async () => {
    if (!instance) {
      return;
    }

    setRunning(true);
    setNextActive(undefined);
    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);
    mo.write('Main.mo', instance.getValue());
    const res = mo.run('Main.mo');

    setRunning(false);

    if (activeLessonSlug) {
      const next = nextLesson(DEMO_COURSE, activeLessonSlug);
      setNextActive(next);
    }
    setOutput(res.stdout + res.stderr);
  };

  const handleGoToNext = () => {
    if (nextActive) {
      setActiveLessonSlug(nextActive.slug);
      // TODO do not do it here
      setActiveLesson(nextActive);
    }
  };

  return (
    <S.Wrapper>
      <Button
        onClick={handleRunCode}
        variant="contained"
        startIcon={
          running ? <CircularProgress color="secondary" size={14} /> : <PlayArrowRoundedIcon />
        }
        sx={{ borderRadius: '1.6rem' }}
      >
        RUN
      </Button>
      <IconButton aria-label="delete">
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <IconButton aria-label="back">
        <NavigateBeforeRoundedIcon />
      </IconButton>
      <Button
        onClick={handleGoToNext}
        variant="contained"
        disabled={!nextActive}
        color={nextActive ? 'primary' : 'secondary'}
        endIcon={<NavigateNextRoundedIcon />}
        sx={{ borderRadius: '1.6rem' }}
      >
        NEXT
      </Button>
    </S.Wrapper>
  );
};
